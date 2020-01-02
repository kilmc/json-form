import { TFormEntry } from "../types";
import { TReducerState, initialForm } from "../reducer";

export const getCurrentForm = (state: TReducerState): TFormEntry => {
  return state.forms.find(form => form.id === state.currentForm) || initialForm;
};

export const getCurrentFormIndex = (state: TReducerState): number => {
  return state.forms.findIndex(form => form.id === state.currentForm);
};
