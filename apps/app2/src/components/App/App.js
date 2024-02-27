import { useState } from 'react';
import { TextInput, Button } from '@try-micro-frontends/design';

import './App.css';

export const App = function () {
  const [text, setText] = useState('');

  return (
    <div className="app">
      <h1>React App 2</h1>
      <TextInput
        label="Enter something"
        value={text}
        onChange={(event, { newValue }) => setText(newValue)}
      />
      <Button label="Reset" onClick={() => setText('')} />
    </div>
  );
};
