import { TFormEntry } from "../types";

export const getForm = (id: string) => {
  const forms: TFormEntry[] = JSON.parse(
    window.localStorage.getItem("forms") || "[]"
  );

  return forms.find(form => form.id === id);
};
