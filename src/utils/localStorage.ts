import { TReducerState, initialState } from "../reducer";

const localStorageKey = "forms";

export const save = (state: TReducerState) => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(state));
};

export const load = () => {
  if (!window.localStorage.getItem(localStorageKey)) {
    save(initialState);
  }

  return JSON.parse(window.localStorage.getItem(localStorageKey) || "");
};
