import React from "react";
import { TGenericObject, TUpdateInput } from "../types";
import { makeTextFile } from "../utils/makeTextFile";
import _ from "lodash";
import { DetermineForm } from "./DetermineForm";

type TFormDisplay = {
  title: string;
  data: TGenericObject;
};

export const FormDisplay = (props: TFormDisplay) => {
  const [formData, setFormData] = React.useState<TGenericObject>({
    ...props.data
  });
  const [generatedFile, setGeneratedFile] = React.useState("");

  const updateInput: TUpdateInput = (path, value) => {
    const trimmedPath = path.substring(1);
    setFormData(_.set({ ...formData }, trimmedPath, value));
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <button
        onClick={e => {
          e.preventDefault();
          setGeneratedFile(makeTextFile(JSON.stringify(formData, null, 2)));
        }}
      >
        Generate link to file
      </button>
      {generatedFile && (
        <a href={generatedFile} download="data.json">
          Download JSON
        </a>
      )}

      <form>
        <DetermineForm
          title=""
          data={formData}
          path=""
          onChange={updateInput}
        />
      </form>
    </div>
  );
};
