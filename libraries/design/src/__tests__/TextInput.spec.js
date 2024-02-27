import { render, screen, a11yTest } from 'testingUtility';
import { TextInput } from '../TextInput';

describe('/libraries/design/TextInput', () => {
  it('renders', () => {
    const label = 'foo';
    render(<TextInput label={label} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole('textbox').parentNode).toHaveAttribute(
      'data-component',
      TextInput.displayName
    );
  });

  it('can have a value', () => {
    const value = 'bar';
    render(<TextInput label="foo" value={value} />);
    expect(screen.getByRole('textbox')).toHaveValue(value);
  });

  it('is accessible', async () => {
    await a11yTest(<TextInput label="foo" />);
  });
});
