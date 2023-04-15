export type Config = {
  initial: string;
  states: {
    [state: string]: {
      on: {
        [event: string]: string;
      };
    };
  };
};
