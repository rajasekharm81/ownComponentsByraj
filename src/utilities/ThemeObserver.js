class ThemeObserver {
  constructor() {
    this.subscribers = [];
  }

  subscriber(func) {
    this.subscribers.push(func);
  }

  unsubscribe(func) {
    this.subscribers.filter((f) => {
      return f !== func;
    });
  }

  notify(value) {
    this.subscribers.forEach((e) => {
      e(value);
    });
  }
}

export default new ThemeObserver();
