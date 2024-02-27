import { render, screen, a11yTest } from 'testingUtility';
import { Checkbox } from '../Checkbox';

describe('/libraries/design/Checkbox', () => {
  it('renders', () => {
    const label = 'foo';
    render(<Checkbox label={label} />);
    expect(
      screen.getByRole('checkbox', { checked: false })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole('checkbox').parentNode).toHaveAttribute(
      'data-component',
      Checkbox.displayName
    );
  });

  it('can be checked', () => {
    render(<Checkbox label="foo" value={true} />);
    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
  });

  it('is accessible', async () => {
    await a11yTest(<Checkbox label="foo" />);
  });
});
