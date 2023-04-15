import { Config } from './types/Config';
import { StateMachine } from './types/StateMachine';

export function factory(config: Config, debug = false): StateMachine {
  const history: string[] = [];
  let current = config.initial;

  function transition(event: string): string {
    const next = config.states[current].on[event];

    if (next === undefined) {
      console.error(
        `No transition defined for event '${event}' in state '${current}'`,
      );
      return current;
    }

    if (debug) {
      console.log(`Transitioned from '${current}' to '${next}'`);
    }

    history.push(next);
    current = next;

    return next;
  }

  return {
    get initial(): string {
      return config.initial;
    },
    get current(): string {
      return current;
    },
    get history(): string[] {
      return history;
    },
    transition,
  };
}
