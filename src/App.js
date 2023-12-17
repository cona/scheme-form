import './App.css';
import { useCallback, useState } from 'react';

import validator from '@rjsf/validator-ajv8';
import { RJSFSchema } from '@rjsf/utils';
import Form from '@rjsf/core';

//import openApiJson from "./oas/api.json";

var { openapiSchemaToJsonSchema: toJsonSchema } = require("@openapi-contrib/openapi-schema-to-json-schema");

/*
const response = await fetch("./oas/api.json");
const openApiJson = JSON.parse(await response.text());
*/
const schema: RJSFSchema = {
  title: 'Todo',
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "minimum": 18
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "address": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string",
          "maxLength": 2
        },
        "zip": {
          "type": "string",
          "pattern": "\\d{5}"
        }
      },
      "required": ["street", "city", "state", "zip"]
    },
    "phoneNumbers": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "\\d{3}-\\d{3}-\\d{4}"
      }
    }
  },
  "required": ["name","age", "email", "address", "phoneNumbers"]
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
