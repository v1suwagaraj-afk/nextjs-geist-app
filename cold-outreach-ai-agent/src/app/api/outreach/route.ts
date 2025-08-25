import { NextRequest, NextResponse } from 'next/server';
import { getAIService } from '@/services/aiService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, type, companyName, industry } = body;

    // Validate required fields
    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message, type' },
        { status: 400 }
      );
    }

    // Get API key from environment variables
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured. Please set OPENROUTER_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Initialize AI service and personalize message
    const aiService = getAIService(apiKey);
    const personalizedResult = await aiService.personalizeMessage({
      contactName: name,
      contactEmail: email,
      companyName,
      industry,
      messageTemplate: message,
      outreachType: type
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Send the actual outreach (email, LinkedIn message, etc.)
    // 3. Schedule follow-ups
    
    // For now, we'll return the personalized message
    return NextResponse.json({
      success: true,
      data: {
        originalMessage: message,
        personalizedMessage: personalizedResult.personalizedMessage,
        subject: personalizedResult.subject,
        callScript: personalizedResult.callScript,
        confidence: personalizedResult.confidence,
        outreachType: type,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Outreach API error:', error);
    return NextResponse.json(
      { error: 'Failed to process outreach request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // This would typically fetch outreach history from database
    // For now, return mock data
    const mockHistory = [
      {
        id: 1,
        contactName: 'John Doe',
        contactEmail: 'john@example.com',
        outreachType: 'email',
        status: 'sent',
        sentAt: '2024-01-15T10:30:00Z',
        response: null
      },
      {
        id: 2,
        contactName: 'Jane Smith',
        contactEmail: 'jane@company.com',
        outreachType: 'linkedin',
        status: 'responded',
        sentAt: '2024-01-14T14:20:00Z',
        response: 'Thanks for reaching out! I\'d be interested to learn more.'
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockHistory
    });

  } catch (error) {
    console.error('Get outreach history error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch outreach history' },
      { status: 500 }
    );
  }
}
