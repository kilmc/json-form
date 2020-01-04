import React, { useContext } from "react";
import { FormContext } from "./reducer";

export const ToggleSchemaView = () => {
  const { dispatch, state } = useContext(FormContext);
  return state.editing ? (
    <button onClick={() => dispatch({ type: "VIEW_FORM" })}>View Form</button>
  ) : (
    <button onClick={() => dispatch({ type: "VIEW_SCHEMA_EDITOR" })}>
      Edit Schema
    </button>
  );
};
