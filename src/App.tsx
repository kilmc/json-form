import React from "react";
import _ from "lodash";

const schema = {
  // sectionTitle: Form
  // sectionTitle: bestAlbums
  bestAlbums: [
    // list
    {
      // sectionTitle: #1
      title: "All Mirrors", // input
      artist: "Angel Olsen", // input
      releaseDate: "1/1/19" // input
    },
    {
      // index 2
      title: "Of Schlagenheim",
      artist: "black midi",
      releaseDate: "1/2/19"
    }
  ],
  bestSongs: [
    // list
    {
      title: "Janet",
      artists: "M. T. Hadley"
    }
  ]
};

const toDoList = ["Item"];

type TGenericObject = {
  [k: string]: any;
};

type TFormInput = {
  label: string;
  type: "text";
  path: string;
  value: string;
  onChange: (path: string, value: string) => void;
};

const FormInput = (props: TFormInput) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type={props.type}
        onChange={e => props.onChange(props.path, e.target.value)}
      />
    </div>
  );
};

type TObjectSection = {
  legend: string;
  data: { [k: string]: any };
  path: string;
  onChange: (path: string, value: string) => void;
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
  onChange: (path: string, value: string) => void;
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
      <button>Add new item</button>
    </fieldset>
  );
};

type TDetermineForm = {
  title: string;
  data: [] | {} | string;
  path: string;
  onChange: (path: string, value: string) => void;
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
  const [formData, setFormData] = React.useState<TGenericObject>(schema);

  const updateInput = (path: string, value: string) => {
    const trimmedPath = path.substring(1);
    setFormData(_.set(formData, trimmedPath, value));
  };

  return (
    <div>
      <input
        type="text"
        onChange={e => setFormData({ ...formData, newField: e.target.value })}
      />
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
