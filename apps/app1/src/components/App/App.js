import { useState } from 'react';
import { Checkbox } from '@try-micro-frontends/design';
import * as util from '@try-micro-frontends/util';

import './App.css';

export const App = function () {
  const [checked, setChecked] = useState(false);

  return (
    <div className="app">
      <h1>React App 1</h1>
      <Checkbox
        label="Show today's date"
        value={checked}
        onChange={(event, { newValue }) => setChecked(newValue)}
      />
      {checked ? <p>{util.date.getToday()}</p> : null}
    </div>
  );
};
