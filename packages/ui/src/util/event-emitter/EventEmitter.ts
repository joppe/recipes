type Listener<T> = (event: string, payload: T) => void;

export class EventEmitter<T> {
  private readonly _listeners: Record<string, Listener<T>[]> = {};

  public on(event: string, listener: Listener<T>) {
    if (this._listeners[event] === undefined) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(listener);

    return () => {
      this.off(event, listener);
    };
  }

  public off(event: string, listener: Listener<T>): void {
    if (this._listeners[event] === undefined) {
      return;
    }

    this._listeners[event] = this._listeners[event].filter(
      (registeredListener) => registeredListener !== listener,
    );
  }

  public emit(event: string, payload: T): void {
    if (this._listeners[event] === undefined) {
      return;
    }

    this._listeners[event].forEach((listener) => listener(event, payload));
  }
}
