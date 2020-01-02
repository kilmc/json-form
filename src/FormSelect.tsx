import React, { useContext } from "react";
import { FormContext, TReducerState } from "./reducer";
import { getCurrentForm } from "./utils/getCurrentForm";

type TFormSelect = {
  state: TReducerState;
};

export const FormSelect = (props: TFormSelect) => {
  const { dispatch } = useContext(FormContext);
  const { id } = getCurrentForm(props.state);

  return (
    <select
      onChange={e => {
        dispatch({ type: "CHANGE_FORM", id: e.target.value });
      }}
      value={id}
    >
      {props.state.forms.map((option, id) => {
        return (
          <option value={option.id} key={`option-${id}`}>
            {option.title}
          </option>
        );
      })}
    </select>
  );
};
