export type TUpdateInput = (path: string, value: string | {}) => void;

export type TGenericObject = {
  [k: string]: any;
};

export type TFormEntry = {
  id: string;
  title: string;
  schema: TGenericObject;
  formData: TGenericObject;
};
