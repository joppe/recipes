export const states = {
  LIST: 'LIST',
  NEW: 'NEW',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  REFRESH: 'REFRESH',
};

export const events = {
  CREATE: 'CREATE',
  MODIFY: 'MODIFY',
  REMOVE: 'REMOVE',
  SUCCESS: 'SUCCESS',
  CANCEL: 'CANCEL',
};

export const config = {
  initial: states.LIST,
  states: {
    [states.LIST]: {
      on: {
        [events.CREATE]: states.NEW,
        [events.MODIFY]: states.EDIT,
        [events.REMOVE]: states.DELETE,
      },
    },
    [states.NEW]: {
      on: {
        [events.SUCCESS]: states.REFRESH,
        [events.CANCEL]: states.LIST,
      },
    },
    [states.EDIT]: {
      on: {
        [events.SUCCESS]: states.REFRESH,
        [events.CANCEL]: states.LIST,
      },
    },
    [states.DELETE]: {
      on: {
        [events.SUCCESS]: states.REFRESH,
        [events.CANCEL]: states.LIST,
      },
    },
    [states.REFRESH]: {
      on: {
        [events.SUCCESS]: states.LIST,
      },
    },
  },
};
