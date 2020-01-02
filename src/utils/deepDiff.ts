import _ from "lodash";
import { TGenericObject } from "../types";

const VALUE_CREATED = "created";
const VALUE_UPDATED = "updated";
const VALUE_DELETED = "deleted";
const VALUE_UNCHANGED = "unchanged";

const isValue = (x: any) => {
  return !_.isObject(x) && !_.isArray(x);
};

const compareValues = (value1: any, value2: any) => {
  console.log("COMPARATIVE V1", typeof value1);
  console.log("COMPARATIVE V2", typeof value2);
  if (value1 === value2) {
    console.log("SAME");
    return VALUE_UNCHANGED;
  }
  if (
    _.isDate(value1) &&
    _.isDate(value2) &&
    value1.getTime() === value2.getTime()
  ) {
    return VALUE_UNCHANGED;
  }
  if (value1 === undefined) {
    return VALUE_CREATED;
  }
  if (value2 === undefined) {
    return VALUE_DELETED;
  }
  return VALUE_UPDATED;
};

export const deepDiff = (
  obj1: TGenericObject | undefined,
  obj2: TGenericObject | undefined
): TGenericObject => {
  if (_.isFunction(obj1) || _.isFunction(obj2)) {
    throw new Error("Invalid argument. Function given, object expected.");
  }

  if (_.isArray(obj1) || _.isArray(obj2)) {
    const isArrayObj1 = _.isArray(obj1);
    const isArrayObj2 = _.isArray(obj2);
    console.log("IS ARR1", isArrayObj1);
    console.log("IS ARR2", isArrayObj2);
    const cleanedObj1 = _.isArray(obj1) ? obj1[0] : obj1;
    const cleanedObj2 = _.isArray(obj2) ? obj2[0] : obj1;
    console.log("cleaned 1", typeof cleanedObj1);
    console.log("cleaned 2", typeof cleanedObj2);
    let finalData;
    console.log("still here");
    if (isArrayObj1 && isArrayObj2) {
      console.log("ARRAYS");
      finalData = deepDiff(cleanedObj1, cleanedObj2);
    } else {
      finalData = obj2;
    }
    console.log("GONNA COMPARE");
    console.log("cleaned 1", typeof cleanedObj1);
    console.log("cleaned 2", typeof cleanedObj2);
    compareValues(cleanedObj1, cleanedObj1);
    console.log("BEFORE RETURN");
    return {
      type: compareValues(cleanedObj1, cleanedObj1),
      data: finalData
    };
  }

  if (isValue(obj1) || isValue(obj2)) {
    console.log("COMPARE VALUES");
    return {
      type: compareValues(obj1, obj2),
      data: obj1 === undefined ? obj2 : obj1
    };
  }

  let diff: TGenericObject = {};
  for (let key in obj1) {
    if (_.isFunction(obj1[key])) {
      continue;
    }

    let value2 = undefined;
    if (obj2 && obj2[key] !== undefined) {
      value2 = obj2[key];
    }

    diff[key] = deepDiff(obj1[key], value2);
  }
  for (let key in obj2) {
    if (_.isFunction(obj2[key]) || diff[key] !== undefined) {
      continue;
    }

    diff[key] = deepDiff(undefined, obj2[key]);
  }
  console.log("=================== FINISHED");
  return diff;
};
