export const orgStats = {};
export const errorMessages = {};

export function recordResult(org, status, error = null) {
  if (!orgStats[org]) {
    orgStats[org] = { pass: 0, fail: 0, total: 0 };
    errorMessages[org] = [];
  }

  orgStats[org].total++;

  if (status === 'passed') {
    orgStats[org].pass++;
  } else {
    orgStats[org].fail++;
    if (error) {
      errorMessages[org].push(error);
    }
  }
}

export function buildSummaryMessage() {
  let message = `🤖 *AI Agent Test Summary*\n\n`;
  message += `Org        Pass   Fail   Total\n`;
  message += `--------------------------------\n`;

  for (const org in orgStats) {
    const s = orgStats[org];
    message += `${org.padEnd(10)} ${String(s.pass).padEnd(6)} ${String(s.fail).padEnd(6)} ${s.total}\n`;
  }

  message += `\n⚠️ *Error Details:*\n`;

  for (const org in errorMessages) {
    if (errorMessages[org].length > 0) {
      message += `\n[${org}]\n`;
      errorMessages[org].forEach(err => {
        message += `- ${err}\n`;
      });
    }
  }

  return message;
}
