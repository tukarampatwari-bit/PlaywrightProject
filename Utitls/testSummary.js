const fs = require('fs');

const summary = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: [],
};

function recordResult(testInfo) {
  summary.total++;

  if (testInfo.status === 'passed') {
    summary.passed++;
  } else {
    summary.failed++;
    summary.errors.push(testInfo.title);
  }

  fs.writeFileSync('test-summary.json', JSON.stringify(summary, null, 2));
}

module.exports = { recordResult };
