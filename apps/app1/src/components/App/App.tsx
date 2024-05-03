import classNames from 'classnames';
import * as util from '@try-micro-frontends/util';
import { Films } from '../Films/Films';

import './App.css';

export const App = function (): JSX.Element {
  // TODO: use central redux state to control which section is active
  // TODO: use route to render active section
  return (
    <div className="app">
      <header>
        <h1>App1 - Star Wars Stats</h1>
        <nav>
          <ul>
            <li
              className={classNames(true && 'app__header__nav__item--active')}
            >
              <a href="#" onClick={(event) => event.preventDefault()}>
                🎬 Films
              </a>
            </li>
            <li
              className={classNames(false && 'app__header__nav__item--active')}
            >
              <a href="#" onClick={(event) => event.preventDefault()}>
                👨‍🚀 People
              </a>
            </li>
            <li
              className={classNames(false && 'app__header__nav__item--active')}
            >
              <a href="#" onClick={(event) => event.preventDefault()}>
                🛸 Starships
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section>
        <Films />
      </section>
      <footer>
        <p>
          {util.date.getToday()} | Data from{' '}
          <a href="https://swapi.dev/" target="_blank" rel="noreferrer">
            SWAPI.dev
          </a>
        </p>
      </footer>
    </div>
  );
};
