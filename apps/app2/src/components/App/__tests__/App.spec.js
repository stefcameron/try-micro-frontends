import { render, screen, a11yTest } from 'testingUtility';
import fetchMock from 'jest-fetch-mock';
import { fixtures } from '@try-micro-frontends/api';
import { App } from '../App';

describe('/apps/app2/App', () => {
  beforeEach(() => {
    fetchMock.doMock();
    fetchMock.once(JSON.stringify(fixtures.mkMockData()));
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('App2 - Star Wars Films')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    await a11yTest(<App />);
  });
});
