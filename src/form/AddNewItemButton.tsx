import React, { useContext } from "react";
import { FormContext } from "../reducer";

type TAddNewItemButton = {
  path: string;
  data: any[];
  onChange: (path: string, value: string | {}) => void;
};

export const AddNewItemButton = (props: TAddNewItemButton) => {
  const { dispatch } = useContext(FormContext);

  return (
    <button
      onClick={e => {
        e.preventDefault();
        dispatch({
          type: "ADD_ITEM",
          path: props.path
        });
      }}
    >
      Add new item
    </button>
  );
};
