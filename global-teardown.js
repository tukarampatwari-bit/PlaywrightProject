const { sendChatNotification } = require('./Utitls/chatNotifier');

module.exports = async () => {
  await sendChatNotification();
};
