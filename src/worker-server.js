let dbMessages = [];

const workerEvents = {
  MESSAGE: 'MESSAGE',
  TYPE: 'TYPE',
  WAIT: 'WAIT',
  IMAGE: 'IMAGE',
  RESET: 'RESET',
}

const announcements = {
  MESSAGES: 'messages',
  RESET: 'RESET',
}

function announce(type, data) {
  postMessage({
    cmd: type,
    messages: data
  })
}

const processMessageData = message => {
  return message.reduce((acc, data) => {
    if (data[0] === 'imageBase64') return acc;
    acc[data[0]] = data[1];
    return acc;
  }, {
    ts: Date.now(),
    type: 'message'
  });
}

const messageActions = {
  [workerEvents.WAIT]: _ => {
    announce(announcements.MESSAGES, dbMessages);
  },
  [workerEvents.TYPE]: data => {
    let messages = [...dbMessages, {user: data.user, message: '...is typing.', type: 'announcement'}]
    announce(announcements.MESSAGES, messages);
  },
  [workerEvents.MESSAGE]: data => {
    dbMessages.push(processMessageData(data.message));
    announce(announcements.MESSAGES, dbMessages);
  },
  [workerEvents.IMAGE]: data => {
    let message = {
      ...data.message,
      ts: Date.now(),
      type: 'image'
    }
    dbMessages.push(message);
    announce(announcements.MESSAGES, dbMessages);
  },
  [workerEvents.RESET]: _ => {
    dbMessages = [];
    announce(announcements.RESET, dbMessages);
  }
}

onmessage = function(e) {
  messageActions[e.data.data.cmd](e.data.data);
}
