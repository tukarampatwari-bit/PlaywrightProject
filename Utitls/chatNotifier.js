import fetch from 'node-fetch';

const GOOGLE_CHAT_WEBHOOK =
  'https://chat.googleapis.com/v1/spaces/AAQASfHctLU/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=fXqUj16pTjBfU0Xiv3si0FVGuzpCUk2KBxXc3A4hhR0';

export async function sendToGoogleChat(message) {
  try {
    const response = await fetch(GOOGLE_CHAT_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });

    console.log('Google Chat response:', response.status);
  } catch (error) {
    console.error('Error sending Google Chat message:', error.message);
  }
}
