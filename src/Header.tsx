import React, { useContext } from "react";
import { FormSelect } from "./FormSelect";
import { TGenericObject } from "./types";
import { makeTextFile } from "./utils/makeTextFile";
import { FormContext } from "./reducer";
import { ToggleSchemaView } from "./ToggleSchemaView";

interface TProps {
  formData: TGenericObject;
}

export const Header = (props: TProps) => {
  const [generatedFile, setGeneratedFile] = React.useState("");
  const { dispatch, state } = useContext(FormContext);

  return (
    <header>
      <button
        onClick={e => {
          e.preventDefault();
          setGeneratedFile(
            makeTextFile(JSON.stringify(props.formData, null, 2))
          );
        }}
      >
        Generate link to file
      </button>
      {generatedFile && (
        <a href={generatedFile} download="data.json">
          Download JSON
        </a>
      )}
      <button onClick={_ => window.localStorage.removeItem("forms")}>
        Clear Cache
      </button>
      <ToggleSchemaView />
      <FormSelect state={state} />
      <button onClick={e => dispatch({ type: "ADD_FORM" })}>New form</button>
    </header>
  );
};
