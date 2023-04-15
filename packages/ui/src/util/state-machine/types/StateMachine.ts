export type StateMachine = {
  readonly initial: string;
  readonly current: string;
  readonly history: string[];
  transition(event: string, currentState?: string): string;
};
