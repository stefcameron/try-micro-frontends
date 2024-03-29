import { render, screen, a11yTest } from 'testingUtility';
import { App } from '../App';

describe('/apps/app2/App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('React App 2')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    await a11yTest(<App />);
  });
});
