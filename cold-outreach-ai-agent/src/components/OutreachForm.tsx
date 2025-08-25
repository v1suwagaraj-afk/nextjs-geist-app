import React from 'react';

const OutreachForm: React.FC = () => {
    return (
        <form>
            <h2>Cold Outreach Form</h2>
            <label>
                Name:
                <input type="text" name="name" required />
            </label>
            <label>
                Email:
                <input type="email" name="email" required />
            </label>
            <label>
                Message:
                <textarea name="message" required></textarea>
            </label>
            <button type="submit">Send Outreach</button>
        </form>
    );
};

export default OutreachForm;
