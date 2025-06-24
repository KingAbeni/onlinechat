const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
  constructor(type = 'public') {
    super();
    if (!['public', 'private'].includes(type)) {
      throw new Error('ChatRoom type must be "public" or "private"');
    }

    this.type = type;
    this.users = [];
    this.messages = [];
  }

  addUser(username) {
    if (this.type === 'private' && this.users.length >= 2) {
      this.emit('error', 'Cannot add user. Private chatrooms can only have 2 users.');
      return;
    }

    if (this.users.includes(username)) {
      this.emit('error',' User' + "${username}" +'already exists in the chatroom.');
      return;
    }

    this.users.push(username);
    this.emit('userJoined', username);
  }

  sendMessage(username, message) {
    if (!this.users.includes(username)) {
      this.emit('error', 'User'+ "${username}"+' is not in the chatroom.');
      return;
    }

    const msg = {
      sender: username,
      text: message,
      timestamp: new Date(),
    };
    this.messages.push(msg);
    this.emit('messageSent', msg);
  }

  getMessages() {
    return this.messages;
  }

  getUsers() {
    return this.users;
  }
}

module.exports = ChatRoom