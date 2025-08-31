import type { Data } from '@/schemas/types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HookForm from './HookForm';

const mockData: Data = {
  name: 'Anna Ivanova',
  age: 18,
  email: 'ann@ex.ru',
  password: '*******',
  gender: 'female',
  country: 'Russia',
  picture: 'dummy',
};

const ROLE_OPTION = { name: /submit/i };

vi.mock('@/store/useFormsStore', () => ({
  useFormsStore: () => ({
    addForm: vi.fn(),
    countries: ['Russia', 'Moldova'],
    addCountry: vi.fn(),
  }),
}));

vi.mock('@/helpers/toBase64', () => ({
  toBase64: vi.fn().mockResolvedValue('fakeBase64'),
}));

describe('ControlledForm', () => {
  it('submits valid data', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    render(<HookForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/name/i), mockData.name);
    await user.type(screen.getByLabelText(/age/i), mockData.age.toString());
    await user.type(screen.getByLabelText(/email/i), mockData.email);
    await user.type(screen.getByLabelText(/password/i), mockData.password);
    await user.selectOptions(screen.getByLabelText(/gender/i), mockData.gender);
    await user.type(screen.getByLabelText(/country/i), mockData.country);

    const file = new File([mockData.picture], 'avatar.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText(/picture/i);
    await user.upload(input, file);

    await user.click(screen.getByRole('button', ROLE_OPTION));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
