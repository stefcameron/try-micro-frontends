import { render, screen, a11yTest } from 'testingUtility';
import fetchMock from 'jest-fetch-mock';
import { fixtures } from '@try-micro-frontends/api';
import { App } from '../App';

describe('/apps/app1/App', () => {
  beforeEach(() => {
    fetchMock.doMock();
    fetchMock.once(JSON.stringify(fixtures.mkMockData()));
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('App1 - Star Wars Stats')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    await a11yTest(<App />);
  });
});
