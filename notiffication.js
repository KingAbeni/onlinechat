function setupNotifications(chatRoom) {
    
  chatRoom.on('userJoined', (username) => {
    console.log(`🔔 Notification: ${username} has joined the chatroom.`);
  });

  chatRoom.on('message', (msg) => {
    console.log(`📩 New message from ${msg.sender}: "${msg.text}" at ${msg.timestamp}`);
  });

  chatRoom.on('error', (errMsg) => {
    console.error(`❗ Error: ${errMsg}`);
  });
}

module.exports = setupNotifications;
