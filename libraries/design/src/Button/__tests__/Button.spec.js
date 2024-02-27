import { render, screen, a11yTest } from 'testingUtility';
import { Button } from '../Button';

describe('/libraries/design/Button', () => {
  it('renders', () => {
    const label = 'foo';
    render(<Button label={label} />);
    expect(screen.getByRole('button')).toHaveTextContent(label);
    expect(screen.getByRole('button').parentNode).toHaveAttribute(
      'data-component',
      Button.displayName
    );
  });

  it('is accessible', async () => {
    await a11yTest(<Button label="foo" />);
  });
});
