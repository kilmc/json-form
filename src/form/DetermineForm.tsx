import React, { useContext } from "react";
import { TUpdateInput } from "../types";
import { AddNewItemButton } from "./AddNewItemButton";
import { FormInput } from "./FormInput";
import _ from "lodash";
import { FormContext } from "../reducer";
import { deepCopy } from "../utils/deepCopy";

type TObjectSection = {
  legend: string;
  data: { [k: string]: any };
  path: string;
  onChange: TUpdateInput;
  fromArray?: boolean;
};

const ObjectSection = (props: TObjectSection) => {
  return (
    <fieldset>
      {!props.fromArray && <legend>{_.startCase(props.legend)}</legend>}

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
      <ol>
        {props.data.map((data, index) => {
          return (
            <li key={index} className="p1 relative">
              <button
                onClick={e => {
                  e.preventDefault();
                  dispatch({ type: "DELETE_ITEM", path: props.path, index });
                }}
                className="absolute r1"
              >
                [ X ] Delete
              </button>
              <DetermineForm
                key={`${props.path}-${index}`}
                title={`${index + 1}`}
                data={data}
                path={`${props.path}[${index}]`}
                onChange={props.onChange}
                fromArray={true}
              />
            </li>
          );
        })}
      </ol>
      <AddNewItemButton
        onChange={props.onChange}
        data={deepCopy(props.data)}
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
  fromArray?: boolean;
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
        fromArray={props.fromArray}
      />
    );
  } else if (_.isString(props.data)) {
    return (
      <FormInput
        label={props.title}
        type="text"
        path={`${props.path}`}
        value={props.data}
        fromArray={props.fromArray}
      />
    );
  } else {
    return null;
  }
};
