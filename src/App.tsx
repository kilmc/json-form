import React, { useReducer } from "react";
import { FormDisplay } from "./form";
import { FormEditor } from "./form-editor";
import { FormSelect } from "./FormSelect";
import { reducer, FormContext } from "./reducer";
import { getCurrentForm } from "./utils/getCurrentForm";
import { load } from "./utils/localStorage";

const App = () => {
  const [state, dispatch] = useReducer(reducer, load());
  const { title, schema, formData, id } = getCurrentForm(state);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <header>
        <button onClick={_ => window.localStorage.removeItem("forms")}>
          Clear Cache
        </button>
        <FormSelect state={state} />
        <button onClick={e => dispatch({ type: "ADD_FORM" })}>New form</button>
      </header>
      <div className="layout">
        <FormDisplay
          title={title}
          data={formData}
          key={id + JSON.stringify(schema)}
        />
        <FormEditor
          title={title}
          schema={schema}
          key={JSON.stringify(schema)}
        />
      </div>
    </FormContext.Provider>
  );
};

export default App;
