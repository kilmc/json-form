import React, { useReducer } from "react";
import { FormDisplay } from "./form";
import { FormEditor } from "./form-editor";

import { reducer, FormContext } from "./reducer";
import { getCurrentForm } from "./utils/getCurrentForm";
import { load } from "./utils/localStorage";
import { Header } from "./Header";

const App = () => {
  const [state, dispatch] = useReducer(reducer, load());
  const { title, schema, formData, id } = getCurrentForm(state);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <Header formData={formData} />
      <div
        key={JSON.stringify(state.editing)}
        className="layout p2 bg-grey-200"
      >
        {state.editing ? (
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
