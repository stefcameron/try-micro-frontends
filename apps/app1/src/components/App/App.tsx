import { ChangeEvent, useState } from 'react';
import { Checkbox } from '@try-micro-frontends/design';
import * as util from '@try-micro-frontends/util';

import './App.css';

interface CheckboxChangeHandler {
  (event: ChangeEvent<HTMLInputElement>, info: { newValue: boolean }): void;
}

export const App = function (): JSX.Element {
  const [checked, setChecked] = useState(false);

  const handleChange: CheckboxChangeHandler = (event, { newValue }) =>
    setChecked(newValue);

  return (
    <div className="app">
      <h1>React App 1</h1>
      <section className="app__today-date">
        <Checkbox
          label="Show today's date"
          value={checked}
          onChange={handleChange}
        />
        {checked ? <p>{util.date.getToday()}</p> : null}
      </section>
    </div>
  );
};
