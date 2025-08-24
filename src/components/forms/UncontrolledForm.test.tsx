import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UncontrolledForm from './UncontrolledForm';
import type { Data } from '@/schemas/types';

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

describe('UncontrolledForm', () => {
  it('submits valid data', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    render(<UncontrolledForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/Name/i), mockData.name);
    await user.type(screen.getByLabelText(/Age/i), mockData.age.toString());
    await user.type(screen.getByLabelText(/Email/i), mockData.email);
    await user.type(screen.getByLabelText(/Password/i), mockData.password);
    await user.selectOptions(screen.getByLabelText(/Gender/i), mockData.gender);
    await user.type(screen.getByLabelText(/Country/i), mockData.country);

    const file = new File([mockData.picture], 'avatar.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText(/Picture/i);
    await user.upload(input, file);

    await user.click(screen.getByRole('button', ROLE_OPTION));

    expect(onSuccess).toHaveBeenCalled();
  });
});
