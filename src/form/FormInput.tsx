import React, { useContext } from "react";
import { FormContext } from "../reducer";
import _ from "lodash";

interface IInputeWrapper {
  fromArray?: boolean;
  children: React.ReactChild;
  label: string;
}

const InputWrapper = (props: IInputeWrapper) => {
  return props.fromArray ? (
    <>
      <label className="display-none" style={{ fontSize: "0.75rem" }}>
        {_.startCase(props.label)}
      </label>
      {props.children}
    </>
  ) : (
    <div className="flex flex-column" style={{ marginBottom: "0.5rem" }}>
      <label style={{ fontSize: "0.75rem" }}>{_.startCase(props.label)}</label>
      {props.children}
    </div>
  );
};

type TFormInput = {
  label: string;
  type: "text";
  path: string;
  value: string;
  fromArray?: boolean;
};

export const FormInput = (props: TFormInput) => {
  const { dispatch } = useContext(FormContext);

  return (
    <InputWrapper fromArray={props.fromArray} label={props.label}>
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
        style={{
          fontSize: "1rem",
          padding: "0.5rem"
        }}
        className="bg-white fz1 p0_5"
      />
    </InputWrapper>
  );
};
