import https from 'https';

export default class GoogleChatReporter {
  constructor() {
    this.orgStats = {};
    this.errorMessages = {};
  }

  onTestEnd(test, result) {
    const org = 'DefaultOrg'; // or extract from test.title

    if (!this.orgStats[org]) {
      this.orgStats[org] = { pass: 0, fail: 0, total: 0 };
      this.errorMessages[org] = [];
    }

    this.orgStats[org].total++;

    if (result.status === 'passed') {
      this.orgStats[org].pass++;
    } else {
      this.orgStats[org].fail++;
      this.errorMessages[org].push(
        `${test.title} → ${result.error?.message || 'Unknown error'}`
      );
    }
  }

  async onEnd() {
    const message = this.buildMessage();
    await this.sendToGoogleChat(message);
  }

  buildMessage() {
    let msg = `🤖 AI Agent Test Summary\n\n`;
    msg += `Org        Pass   Fail   Total\n`;
    msg += `--------------------------------\n`;

    for (const org in this.orgStats) {
      const s = this.orgStats[org];
      msg += `${org.padEnd(10)} ${s.pass}      ${s.fail}      ${s.total}\n`;
    }

    msg += `\n⚠️ Error Details:\n`;

    for (const org in this.errorMessages) {
      if (this.errorMessages[org].length > 0) {
        msg += `\n[${org}]\n`;
        this.errorMessages[org].forEach(err => {
          msg += `- ${err}\n`;
        });
      }
    }

    return msg;
  }

  sendToGoogleChat(message) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ text: message });

      const options = {
        hostname: 'chat.googleapis.com',
        path: '/v1/spaces/AAQASfHctLU/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=fXqUj16pTjBfU0Xiv3si0FVGuzpCUk2KBxXc3A4hhR0',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = https.request(options, res => {
        console.log('Google Chat status:', res.statusCode);
        resolve();
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }
}
