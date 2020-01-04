import React from "react";
import { TFormEntry, TGenericObject } from "./types";
import { getCurrentForm, getCurrentFormIndex } from "./utils/getCurrentForm";
import _ from "lodash";
import { save } from "./utils/localStorage";
import { updateFormDataSchema } from "./actions/updateFormDataSchema";
import { deepCopy } from "./utils/deepCopy";

const eoyInit: TFormEntry = {
  id: "form-2",
  title: "End of Year",
  schema: {
    bestAlbums: [
      {
        title: "",
        artist: "",
        releaseDate: "",
        __releaseDateType: "date",
        label: ""
      }
    ],
    bestSongs: [
      {
        title: "",
        artists: ""
      }
    ]
  },
  formData: {
    bestAlbums: [
      {
        title: "",
        artist: "",
        releaseDate: "",
        __releaseDateType: "date",
        label: ""
      }
    ],
    bestSongs: [
      {
        title: "",
        artists: ""
      }
    ]
  }
};

export type TReducerState = {
  currentForm: string;
  editing: boolean;
  forms: TFormEntry[];
};

export const initialForm = {
  id: "form-1",
  title: "Todo List",
  schema: { todos: [""] },
  formData: { todos: ["Milk", "Bread", "Cheese"] }
};

export const initialState: TReducerState = {
  editing: false,
  currentForm: "form-1",
  forms: [initialForm, eoyInit]
};

interface IFormContext {
  state: TReducerState;
  dispatch: React.Dispatch<TReducerAction>;
}

export const FormContext = React.createContext<IFormContext>({
  state: initialState,
  dispatch: () => {}
});

type TReducerAction =
  | {
      type: "ADD_FORM";
    }
  | {
      type: "UPDATE_FORM_SCHEMA";
      value: TGenericObject;
    }
  | {
      type: "UPDATE_FORM_TITLE";
      value: string;
    }
  | {
      type: "CHANGE_FORM";
      id: string;
    }
  | {
      type: "UPDATE_INPUT";
      path: string;
      value: string;
    }
  | { type: "ADD_ITEM"; path: string }
  | { type: "DELETE_ITEM"; path: string; index: number }
  | { type: "VIEW_SCHEMA_EDITOR" }
  | { type: "VIEW_FORM" };

export function reducer(
  state: TReducerState,
  action: TReducerAction
): TReducerState {
  const formIndex = getCurrentFormIndex(state);
  const { schema } = getCurrentForm(state);

  const update = (state: TReducerState) => {
    save(state);
    return state;
  };

  switch (action.type) {
    case "CHANGE_FORM":
      return update({ ...state, currentForm: action.id });
    case "VIEW_FORM":
      return update({
        ...state,
        editing: false
      });
    case "VIEW_SCHEMA_EDITOR":
      return update({
        ...state,
        editing: true
      });
    case "ADD_FORM":
      const newFormId = `form-${state.forms.length + 1}`;
      const newForm: TFormEntry = {
        title: "",
        id: newFormId,
        schema: {},
        formData: {}
      };

      return update({
        ...state,
        editing: true,
        currentForm: newFormId,
        forms: state.forms.concat(newForm)
      });
    case "UPDATE_FORM_TITLE":
      state.forms[formIndex].title = action.value;
      return update({ ...state });
    case "UPDATE_FORM_SCHEMA":
      return update({ ...updateFormDataSchema(state, action.value) });
    case "UPDATE_INPUT":
      _.set(
        state.forms[formIndex].formData,
        action.path.substring(1),
        action.value
      );
      return update({ ...state });
    case "ADD_ITEM":
      const addItemPath = action.path.substring(1);
      const initialValue = deepCopy(_.get(schema, addItemPath)[0]);
      const arrayLength = _.get(state.forms[formIndex].formData, addItemPath)
        .length;
      const newItemPath = `${addItemPath}[${arrayLength}]`;

      _.set(state.forms[formIndex].formData, newItemPath, initialValue);

      return update({ ...state });
    case "DELETE_ITEM":
      const deleteItemPath = action.path.substring(1);
      const arr: any[] = _.get(state.forms[formIndex].formData, deleteItemPath);

      arr.splice(action.index, 1);
      _.set(state.forms[formIndex].formData, deleteItemPath, arr);

      return update({ ...state });
    default:
      throw new Error();
  }
}
