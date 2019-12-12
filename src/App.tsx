import React from "react";
import _ from "lodash";

const schema = {
  bestAlbums: [
    {
      title: "",
      artist: "",
      releaseDate: "",
      label: ""
    }
  ],
  bestSongs: [
    {
      title: "",
      artists: ""
    }
  ]
};

// let textFile: null | string = null;
// const makeTextFile = text => {
//   var data = new Blob([text], { type: "application/json" });

//   // If we are replacing a previously generated file we need to
//   // manually revoke the object URL to avoid memory leaks.
//   if (textFile !== null) {
//     window.URL.revokeObjectURL(textFile);
//   }

//   textFile = window.URL.createObjectURL(data);

//   // returns a URL you can use as a href
//   return textFile;
// };

type TUpdateInput = (path: string, value: string | {}) => void;

type TGenericObject = {
  [k: string]: any;
};

type TFormInput = {
  label: string;
  type: "text";
  path: string;
  value: string;
  onChange: TUpdateInput;
};

const FormInput = (props: TFormInput) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type={props.type}
        value={props.value}
        onChange={e => {
          console.log("Update path:", props.path);
          props.onChange(props.path, e.target.value);
        }}
      />
    </div>
  );
};

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

type TAddNewItemButton = {
  path: string;
  data: any[];
  onChange: (path: string, value: string | {}) => void;
};

const AddNewItemButton = (props: TAddNewItemButton) => {
  const setNewItem = (data: any[]) => {
    const previousItem = data[data.length - 1];
    if (_.isString(previousItem)) {
      return previousItem;
    } else if (_.isArray(previousItem)) {
      return [...previousItem];
    } else if (_.isObject(previousItem)) {
      return { ...previousItem };
    } else {
      return "";
    }
  };

  return (
    <button
      onClick={e => {
        e.preventDefault();
        props.onChange(
          `${props.path}[${props.data.length}]`,
          setNewItem(props.data)
        );
      }}
      role={"button"}
    >
      Add new item
    </button>
  );
};

type TArraySection = {
  legend: string;
  data: any[];
  path: string;
  onChange: (path: string, value: string | {}) => void;
};

const ArraySection = (props: TArraySection) => {
  return (
    <fieldset>
      <legend>{props.legend}</legend>
      {props.data.map((data, index) => {
        return (
          <DetermineForm
            key={`${props.path}-${index}`}
            title={`${index + 1}`}
            data={data}
            path={`${props.path}[${index}]`}
            onChange={props.onChange}
          />
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

const DetermineForm = (props: TDetermineForm) => {
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
        onChange={props.onChange}
        value={props.data}
      />
    );
  } else {
    return null;
  }
};

const App = () => {
  const [formData, setFormData] = React.useState<TGenericObject>({
    toDoList: [""]
  });
  // const [generatedFile, setGeneratedFile] = React.useState("");

  const updateInput: TUpdateInput = (path, value) => {
    const trimmedPath = path.substring(1);
    setFormData(_.set({ ...formData }, trimmedPath, value));
  };

  return (
    <div>
      {/* <button
        onClick={e => {
          e.preventDefault();
        }}
      >
        Generate link to file
      </button> */}
      <pre>{JSON.stringify(formData, null, 4)}</pre>
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

export default App;
