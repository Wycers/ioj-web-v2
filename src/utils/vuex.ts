export const set = (property: string) => (state: any, payload: any) =>
  (state[property] = payload);

export const toggle = (property: string) => (state: any) =>
  (state[property] = !state[property]);
