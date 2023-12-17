
import './App.css';
import { useCallback, useState } from 'react';

import validator from '@rjsf/validator-ajv8';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/core';
//import Form from '@rjsf/material-ui';

const schema: RJSFSchema = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

const log = (type) => console.log.bind(console, type);

/*
const formData = {
  title: 'First taskeee',
  done: true,
};
*/


function App() {

  const [value, setValue] = useState({});
  const onChange = useCallback((e) => {
    setValue(e.formData);
  }, []);
  const onSubmit = useCallback(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="App">

      <Form
        schema={schema}
        validator={validator}
        formData={value}
        onChange={onChange} // 追加
        onSubmit={onSubmit} // 追加
        onError={log('errors')}
      />
      <hr />


      <textarea cols="50" rows="4" value={JSON.stringify(value)} />

    </div>
  );
}

export default App;
