import { TGenericObject } from "../types";
import _ from "lodash";
import { deepDiff } from "../utils/deepDiff";
import { deepCopy } from "../utils/deepCopy";
import { TReducerState } from "../reducer";
import { getCurrentForm, getCurrentFormIndex } from "../utils/getCurrentForm";

const updateFormData = (diff: TGenericObject, data: TGenericObject) => {
  const entries = Object.entries(diff);

  entries
    .filter(([_, value]) => {
      return ["unchanged"].includes(value.type);
    })
    .forEach(([key, value]) => {
      if (!value.type) {
        return;
      }
      updateFormData(value.data, data[key]);
    });

  const created = entries
    .filter(([_, value]) => {
      return ["created"].includes(value.type);
    })
    .map(([key, value]) => {
      if (_.isArray(data)) {
        data
          .map((subItem: TGenericObject) => {
            return _.set({ ...subItem }, key, value.data);
          })
          .reduce((xs, x) => xs.concat(x), []);
      } else {
        return _.set({ ...data }, key, value.data);
      }
    })[0];

  const updated = entries
    .filter(([_, value]) => {
      return ["updated"].includes(value.type);
    })
    .map(([key, value]) => {
      if (_.isArray(data)) {
        return data
          .map((subItem: TGenericObject) => {
            const newValue = _.isEmpty(value.data) ? subItem[key] : value.data;
            return _.set({ ...subItem }, key, newValue);
          })
          .reduce((xs, x) => xs.concat(x), []);
      } else {
        let newValue;
        if (_.isEmpty(value.data)) {
          newValue = data[key];
        } else if (_.isArray(value.data)) {
          newValue = value.data;
        } else if (_.isObject(value.data)) {
          updateFormData(value.data, data[key]);
        } else {
          newValue = value.data;
        }

        return _.set({ ...data }, key, newValue);
      }
    })[0];

  const deleted = entries
    .filter(([_, value]) => {
      return value.type === "deleted";
    })
    .map(([key, value]) => {
      if (_.isArray(data)) {
        return data.map((subArray: TGenericObject) => {
          delete subArray[key];
          return subArray;
        });
      } else {
        delete data[key];
        return data;
      }
    })[0];

  return _.merge(data, created, deleted, updated);
};

export const updateFormDataSchema = (
  state: TReducerState,
  newSchema: TGenericObject
): TReducerState => {
  const updatedState = deepCopy(state);

  const formEntry = getCurrentForm(updatedState);
  const formIndex = getCurrentFormIndex(updatedState);
  const { formData, schema } = formEntry;

  const diff = deepDiff(schema, newSchema);
  const updatedFormData = updateFormData(diff, { ...formData });

  updatedState.forms[formIndex].schema = newSchema;
  updatedState.forms[formIndex].formData = updatedFormData;

  return updatedState;
};
