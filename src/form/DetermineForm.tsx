import React, { useContext } from "react";
import { TUpdateInput } from "../types";
import { AddNewItemButton } from "./AddNewItemButton";
import { FormInput } from "./FormInput";
import _ from "lodash";
import { FormContext } from "../reducer";

type TObjectSection = {
  legend: string;
  data: { [k: string]: any };
  path: string;
  onChange: TUpdateInput;
};

const ObjectSection = (props: TObjectSection) => {
  return (
    <fieldset>
      <legend>{props.legend}</legend>
      {Object.entries(props.data).map(([key, data], index) => {
        return (
          <DetermineForm
            key={`${props.path}-${index}`}
            title={key}
            data={data}
            path={`${props.path}.${key}`}
            onChange={props.onChange}
          />
        );
      })}
    </fieldset>
  );
};

type TArraySection = {
  legend: string;
  data: any[];
  path: string;
  onChange: (path: string, value: string | {}) => void;
};

const ArraySection = (props: TArraySection) => {
  const { dispatch } = useContext(FormContext);

  return (
    <fieldset>
      <legend>{props.legend}</legend>
      {props.data.map((data, index) => {
        return (
          <React.Fragment key={index}>
            <button
              onClick={e => {
                e.preventDefault();
                dispatch({ type: "DELETE_ITEM", path: props.path, index });
              }}
            >
              [ X ] Delete
            </button>
            <DetermineForm
              key={`${props.path}-${index}`}
              title={`${index + 1}`}
              data={data}
              path={`${props.path}[${index}]`}
              onChange={props.onChange}
            />
          </React.Fragment>
        );
      })}
      <AddNewItemButton
        onChange={props.onChange}
        data={props.data}
        path={props.path}
      />
    </fieldset>
  );
};

type TDetermineForm = {
  title: string;
  data: [] | {} | string;
  path: string;
  onChange: TUpdateInput;
};

export const DetermineForm = (props: TDetermineForm) => {
  if (_.isArray(props.data)) {
    return (
      <ArraySection
        legend={props.title}
        data={props.data}
        path={`${props.path}`}
        onChange={props.onChange}
      />
    );
  } else if (_.isObject(props.data)) {
    return (
      <ObjectSection
        legend={props.title}
        data={props.data}
        path={`${props.path}`}
        onChange={props.onChange}
      />
    );
  } else if (_.isString(props.data)) {
    return (
      <FormInput
        label={props.title}
        type="text"
        path={`${props.path}`}
        value={props.data}
      />
    );
  } else {
    return null;
  }
};
