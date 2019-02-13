export const messageEvents = {
  WAIT: 'WAIT',
  TYPE: 'TYPE',
  SEND: 'SEND',
  FAIL: 'FAIL',
  RETRY: 'RETRY',
  CANCEL: 'CANCEL',
  SUCCESS: 'SUCCESS',
}

export const messageStates = {
  WAIT: 'WAIT',
  TYPE: 'TYPE',
  SEND: 'SEND',
  FAIL: 'FAIL',
  CANCEL: 'CANCEL',
  SUCCESS: 'SUCCESS',
}

export const messageMachine = {
  initial: 'WAIT',
  states: {
    WAIT: {
      on: {
        TYPE: 'TYPE',
      },
    },
    TYPE: {
      on: {
        WAIT: 'WAIT',
        SEND: 'SEND',
      },
    },
    SEND: {
      on: {
        FAIL: 'FAIL',
        SUCCESS: 'SUCCESS',
      },
    },
    FAIL: {
      on: {
        RETRY: 'SEND',
        CANCEL: 'CANCEL'
      }
    },
    CANCEL: {
      on: {}
    },
    SUCCESS: {
      on: {}
    }
  }
};

export const messageTransition = (state, event) => {
  if (!state) return messageMachine.initial;
  return messageMachine.states[state].on[event] || state;
}
