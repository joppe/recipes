import { ReactNode, createContext, useMemo, useRef } from 'react';

import { config, events, states } from './config';

import {
  EventEmitter,
  Listener,
  Unregister,
} from '@recipes/ui/util/event-emitter';
import { factory } from '@recipes/ui/util/state-machine/factory';
import { StateMachine } from '@recipes/ui/util/state-machine/types/StateMachine';

export type StateContextValue = {
  readonly selected: string | null;
  create(): void;
  edit(id: string): void;
  remove(id: string): void;
  cancel(): void;
  success(): void;
  getState(): string;
  listen(listener: Listener<string>): Unregister;
};

export const StateContext = createContext<StateContextValue | null>(null);

export type StateProviderProps = {
  children: ReactNode;
};

export function StateProvider({ children }: StateProviderProps) {
  const stateMachine = useRef<StateMachine>(factory(config));
  const selected = useRef<string | null>(null);
  const emitter = useRef(new EventEmitter<string>());

  const value = useMemo(() => {
    function change(
      event: string,
      expectedState: string | undefined,
      id: string | null,
    ): void {
      const state = stateMachine.current.transition(event);

      if (expectedState !== undefined && state !== expectedState) {
        return;
      }

      selected.current = id;
      emitter.current.emit('change', state);
    }

    return {
      get selected(): string | null {
        return selected.current;
      },
      create(): void {
        change(events.CREATE, states.NEW, null);
      },
      edit(id: string): void {
        change(events.MODIFY, states.EDIT, id);
      },
      remove(id: string): void {
        change(events.REMOVE, states.DELETE, id);
      },
      cancel(): void {
        change(events.CANCEL, undefined, null);
      },
      success(): void {
        change(events.SUCCESS, undefined, null);
      },
      getState(): string {
        return stateMachine.current.current;
      },
      listen(listener: Listener<string>): Unregister {
        return emitter.current.on('change', listener);
      },
    };
  }, []);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}
