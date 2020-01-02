import { TGenericObject } from "../types";
import _ from "lodash";
import { deepDiff } from "../utils/deepDiff";
import { TReducerState } from "../reducer";
import { getCurrentForm, getCurrentFormIndex } from "../utils/getCurrentForm";

const updateFormData = (diff: TGenericObject, data: TGenericObject) => {
  console.log("diff", diff);
  console.log("data", data);
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

  // const updated = entries
  //   .filter(([_, value]) => {
  //     return ["updated"].includes(value.type);
  //   })
  //   .map(([key, value]) => {
  //     if (_.isArray(data)) {
  //       return data
  //         .map((subItem: TGenericObject) => {
  //           const newValue = _.isEmpty(value.data) ? subItem[key] : value.data;
  //           return _.set({ ...subItem }, key, newValue);
  //         })
  //         .reduce((xs, x) => xs.concat(x), []);
  //     } else {
  //       const newValue = _.isEmpty(value.data) ? data[key] : value.data;
  //       return _.set({ ...data }, key, newValue);
  //     }
  //   })[0];

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

  return _.merge(data, created, deleted);
};

function deep<T extends object>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}

export const updateFormDataSchema = (
  state: TReducerState,
  newSchema: TGenericObject
): TReducerState => {
  const updatedState = deep(state);

  const formEntry = getCurrentForm(updatedState);
  const formIndex = getCurrentFormIndex(updatedState);
  const { formData, schema } = formEntry;

  const diff = deepDiff(schema, newSchema);
  console.log("OUTER DIFF", diff);
  console.log("OUTER DATA", formData);
  const updatedFormData = updateFormData(diff, { ...formData });

  updatedState.forms[formIndex].schema = newSchema;
  updatedState.forms[formIndex].formData = updatedFormData;

  return updatedState;
};
