const fetch = require('node-fetch');
const fs = require('fs');

const GOOGLE_CHAT_WEBHOOK =
  'https://chat.googleapis.com/v1/spaces/AAQASfHctLU/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=fXqUj16pTjBfU0Xiv3si0FVGuzpCUk2KBxXc3A4hhR0';

async function sendChatNotification() {
  const data = JSON.parse(fs.readFileSync('test-summary.json'));

  const status = data.failed === 0 ? '✅ PASSED' : '❌ FAILED';

  let message = `*Playwright Test Execution ${status}*\n\n`;
  message += `Total: ${data.total}\n`;
  message += `Passed: ${data.passed}\n`;
  message += `Failed: ${data.failed}\n`;

  if (data.errors.length > 0) {
    message += `\n⚠️ Failed Tests: this is fail test cases \n`;
    data.errors.forEach(e => {
      message += `- ${e}\n`;
    });
  }

  await fetch(GOOGLE_CHAT_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message }),
  });
}

module.exports = { sendChatNotification };
