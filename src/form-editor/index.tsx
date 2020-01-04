import React, { useContext, useState } from "react";
import { TGenericObject } from "../types";
import { FormContext } from "../reducer";
import { isJson } from "../utils/isJson";

type TFormEditor = {
  title: string;
  schema: TGenericObject;
};

export const FormEditor = (props: TFormEditor) => {
  const { dispatch } = useContext(FormContext);
  const [isDirty, setDirty] = useState(false);
  const [newSchema, setNewSchema] = useState(JSON.stringify(props.schema));

  const canSave = (json: string) => {
    return isDirty && isJson(json);
  };

  return (
    <div>
      <h2>Schema</h2>
      <form className="flex flex-column">
        <input
          type="text"
          value={props.title}
          onChange={e =>
            dispatch({ type: "UPDATE_FORM_TITLE", value: e.target.value })
          }
        />
        <textarea
          className="h60vh"
          onChange={e => {
            setDirty(true);
            setNewSchema(e.target.value);
          }}
          defaultValue={JSON.stringify(props.schema, null, 4)}
        />

        <button
          onClick={e => {
            e.preventDefault();
            dispatch({
              type: "UPDATE_FORM_SCHEMA",
              value: JSON.parse(newSchema)
            });
          }}
          disabled={!canSave(newSchema)}
        >
          Update schema
        </button>
      </form>
    </div>
  );
};
