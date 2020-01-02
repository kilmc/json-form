import React, { useContext } from "react";
import { FormContext } from "../reducer";

type TFormInput = {
  label: string;
  type: "text";
  path: string;
  value: string;
};

export const FormInput = (props: TFormInput) => {
  const { dispatch } = useContext(FormContext);

  return (
    <div>
      <label>{props.label}</label>
      <input
        type={props.type}
        value={props.value}
        onChange={e => {
          dispatch({
            type: "UPDATE_INPUT",
            path: props.path,
            value: e.target.value
          });
        }}
      />
    </div>
  );
};
