const { sendChatNotification } = require('./utils/chatNotifier');

module.exports = async () => {
  await sendChatNotification();
};
