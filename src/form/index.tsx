import React from "react";
import { TGenericObject, TUpdateInput } from "../types";

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
  const updateInput: TUpdateInput = (path, value) => {
    const trimmedPath = path.substring(1);
    setFormData(_.set({ ...formData }, trimmedPath, value));
  };

  return (
    <div>
      <h2>{props.title}</h2>
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
