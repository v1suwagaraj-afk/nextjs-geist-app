import axios, { AxiosError } from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface AIPersonalizationRequest {
  contactName: string;
  contactEmail: string;
  companyName?: string;
  industry?: string;
  messageTemplate: string;
  outreachType: 'email' | 'call' | 'message' | 'linkedin';
}

export interface AIPersonalizationResponse {
  personalizedMessage: string;
  subject?: string;
  callScript?: string;
  confidence: number;
}

export class AIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async personalizeMessage(request: AIPersonalizationRequest): Promise<AIPersonalizationResponse> {
    try {
      const systemPrompt = this.getSystemPrompt(request.outreachType);
      const userPrompt = this.buildUserPrompt(request);

      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000',
            'X-Title': 'Cold Outreach AI Agent'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      return this.parseAIResponse(aiResponse, request.outreachType);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`AI personalization failed: ${error.message}`);
      }
      throw new Error(`AI personalization failed: ${String(error)}`);
    }
  }

  async generateFollowUp(originalMessage: string, responseReceived: string): Promise<string> {
    try {
      const systemPrompt = `You are an expert sales follow-up specialist. Generate a professional and engaging follow-up message based on the original outreach and the response received.`;
      
      const userPrompt = `
Original message: ${originalMessage}
Response received: ${responseReceived}

Generate a thoughtful follow-up message that:
1. Acknowledges their response
2. Provides additional value
3. Moves the conversation forward
4. Maintains a professional tone
`;

      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000',
            'X-Title': 'Cold Outreach AI Agent'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`Follow-up generation failed: ${error.message}`);
      }
      throw new Error(`Follow-up generation failed: ${String(error)}`);
    }
  }

  async analyzeResponse(responseText: string): Promise<{
    sentiment: 'positive' | 'neutral' | 'negative';
    intent: 'interested' | 'not_interested' | 'needs_more_info' | 'objection';
    suggestedAction: string;
  }> {
    try {
      const systemPrompt = `You are an expert at analyzing sales responses. Analyze the sentiment, intent, and suggest the best next action.`;
      
      const userPrompt = `
Analyze this response: "${responseText}"

Provide analysis in this JSON format:
{
  "sentiment": "positive|neutral|negative",
  "intent": "interested|not_interested|needs_more_info|objection",
  "suggestedAction": "specific action recommendation"
}
`;

      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 300
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8000',
            'X-Title': 'Cold Outreach AI Agent'
          }
        }
      );

      const analysis = JSON.parse(response.data.choices[0].message.content);
      return analysis;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`Response analysis failed: ${error.message}`);
      }
      throw new Error(`Response analysis failed: ${String(error)}`);
    }
  }

  private getSystemPrompt(outreachType: string): string {
    const basePrompt = `You are an expert cold outreach specialist with years of experience in sales and marketing. Your goal is to create highly personalized, engaging messages that get responses.`;

    switch (outreachType) {
      case 'email':
        return `${basePrompt} You specialize in crafting compelling cold emails that stand out in crowded inboxes. Focus on personalization, value proposition, and clear call-to-action.`;
      case 'call':
        return `${basePrompt} You specialize in creating cold call scripts that are conversational, engaging, and handle objections gracefully. Focus on building rapport quickly.`;
      case 'linkedin':
        return `${basePrompt} You specialize in LinkedIn outreach that feels natural and professional. Focus on connection requests and follow-up messages that leverage mutual connections or shared interests.`;
      case 'message':
        return `${basePrompt} You specialize in direct messages across various platforms. Focus on being concise, personal, and respectful of the platform's communication style.`;
      default:
        return basePrompt;
    }
  }

  private buildUserPrompt(request: AIPersonalizationRequest): string {
    return `
Personalize this message template for cold outreach:

Contact Details:
- Name: ${request.contactName}
- Email: ${request.contactEmail}
- Company: ${request.companyName || 'Unknown'}
- Industry: ${request.industry || 'Unknown'}

Message Template:
${request.messageTemplate}

Outreach Type: ${request.outreachType}

Requirements:
1. Personalize the message using the contact details
2. Make it engaging and professional
3. Include a clear value proposition
4. Add a compelling call-to-action
5. Keep it concise but impactful
${request.outreachType === 'email' ? '6. Provide a compelling subject line' : ''}
${request.outreachType === 'call' ? '6. Structure as a conversational script with natural transitions' : ''}

Provide the response in JSON format:
{
  "personalizedMessage": "the personalized message",
  ${request.outreachType === 'email' ? '"subject": "email subject line",' : ''}
  ${request.outreachType === 'call' ? '"callScript": "structured call script",' : ''}
  "confidence": 0.95
}
`;
  }

  private parseAIResponse(aiResponse: string, outreachType: string): AIPersonalizationResponse {
    try {
      const parsed = JSON.parse(aiResponse);
      return {
        personalizedMessage: parsed.personalizedMessage,
        subject: parsed.subject,
        callScript: parsed.callScript,
        confidence: parsed.confidence || 0.8
      };
    } catch (error) {
      // Fallback if JSON parsing fails
      return {
        personalizedMessage: aiResponse,
        confidence: 0.7
      };
    }
  }
}

// Singleton instance
let aiServiceInstance: AIService | null = null;

export const getAIService = (apiKey?: string): AIService => {
  if (!aiServiceInstance && apiKey) {
    aiServiceInstance = new AIService(apiKey);
  }
  if (!aiServiceInstance) {
    throw new Error('AI Service not initialized. Please provide an API key.');
  }
  return aiServiceInstance;
};
