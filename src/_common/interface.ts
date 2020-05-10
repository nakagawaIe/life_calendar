export type ActionTypeCreator<T> = {
  [P in keyof T]: { type: P } & T[P];
}[keyof T];