import { updateFormDataSchema } from "./updateFormDataSchema";
import { TFormEntry } from "../types";
import { TReducerState } from "../reducer";

const formEntry: TFormEntry = {
  title: "New Form",
  id: "form-1",
  formData: {},
  schema: {}
};

const initialState: TReducerState = {
  editing: false,
  currentForm: "form-1",
  forms: [formEntry]
};

describe("updateFormDataSchema", () => {
  describe("when adding new items", () => {
    it("should add an array of strings", () => {
      const newSchema = { todos: [""] };
      const updated = updateFormDataSchema(initialState, newSchema).forms[0];

      expect(updated.schema).toBe(newSchema);
      expect(updated.formData).toStrictEqual({
        todos: [""]
      });
    });

    it("should add an array of objects", () => {
      const newSchema = { albums: [{ title: "", artist: "" }] };
      const updated = updateFormDataSchema(initialState, newSchema).forms[0];

      expect(updated.schema).toBe(newSchema);
      expect(updated.formData).toStrictEqual({
        albums: [{ title: "", artist: "" }]
      });
    });

    it("should add an array of objects", () => {
      const currentState: TReducerState = {
        currentForm: "form-1",
        editing: false,
        forms: [
          {
            ...formEntry,
            schema: { todos: "" },
            formData: { todos: "" }
          }
        ]
      };
      const newSchema = { todos: [""] };
      const updated = updateFormDataSchema(currentState, newSchema).forms[0];

      expect(updated.schema).toBe(newSchema);
      expect(updated.formData).toStrictEqual({
        todos: [""]
      });
    });
  });

  describe("when deleting items", () => {
    it("should remove a key and value", () => {
      const currentState: TReducerState = {
        currentForm: "form-1",
        editing: false,
        forms: [
          {
            ...formEntry,
            schema: { title: "", artist: "" },
            formData: { title: "", artist: "" }
          }
        ]
      };
      const newSchema = { title: "" };
      const updated = updateFormDataSchema(currentState, newSchema).forms[0];

      expect(updated.schema).toBe(newSchema);
      expect(updated.formData).toStrictEqual({ title: "" });
    });
  });

  describe("when deleting nested items", () => {
    it("should remove a key and value", () => {
      const currentState: TReducerState = {
        currentForm: "form-1",
        editing: false,
        forms: [
          {
            ...formEntry,
            schema: { albums: [{ title: "", artist: "", label: "" }] },
            formData: {
              albums: [
                { title: "Empty", artist: "M. T. Hadley", label: "4AD" },
                { title: "Be On Fire", artist: "Chrome Sparks", label: "4AD" }
              ]
            }
          }
        ]
      };
      const newSchema = { albums: [{ title: "", artist: "" }] };
      const updated = updateFormDataSchema(currentState, newSchema).forms[0];

      expect(updated.schema).toBe(newSchema);
      expect(updated.formData).toStrictEqual({
        albums: [
          { title: "Empty", artist: "M. T. Hadley" },
          { title: "Be On Fire", artist: "Chrome Sparks" }
        ]
      });
    });
  });

  describe("when deleting a root key and value", () => {
    it("should remove the root key and value", () => {
      const currentState: TReducerState = {
        currentForm: "form-1",
        editing: false,
        forms: [
          {
            ...formEntry,
            schema: { todos: [""], todones: [""] },
            formData: {
              todos: ["Milk", "Bread", "Cheese"],
              todones: ["Coffee", "Tea"]
            }
          }
        ]
      };
      const newSchema = { todos: [""] };
      const updated = updateFormDataSchema(currentState, newSchema).forms[0];

      expect(updated.schema).toBe(newSchema);
      expect(updated.formData).toStrictEqual({
        todos: ["Milk", "Bread", "Cheese"]
      });
    });
  });
});
