import React, { useReducer, useState } from "react";
import { FormDisplay } from "./form";
import { FormEditor } from "./form-editor";
import { FormSelect } from "./FormSelect";
import { reducer, FormContext } from "./reducer";
import { getCurrentForm } from "./utils/getCurrentForm";
import { load } from "./utils/localStorage";

const App = () => {
  const [state, dispatch] = useReducer(reducer, load());
  const { title, schema, formData, id } = getCurrentForm(state);
  const [editing, setEditing] = useState(false);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <header>
        <button onClick={_ => window.localStorage.removeItem("forms")}>
          Clear Cache
        </button>
        <button onClick={() => setEditing(!editing)}>
          {editing ? "View Form" : "Edit Schema"}
        </button>
        <FormSelect state={state} />
        <button onClick={e => dispatch({ type: "ADD_FORM" })}>New form</button>
      </header>
      <div className="layout" style={{ padding: "2rem" }}>
        {editing ? (
          <FormEditor
            title={title}
            schema={schema}
            key={JSON.stringify(schema)}
          />
        ) : (
          <FormDisplay
            title={title}
            data={formData}
            key={id + JSON.stringify(schema)}
          />
        )}
      </div>
    </FormContext.Provider>
  );
};

export default App;
