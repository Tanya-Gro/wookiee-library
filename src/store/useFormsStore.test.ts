import { renderHook, act } from '@testing-library/react';
import { COUNTRIES, useFormsStore } from './useFormsStore';

import type { Data } from '@/schemas/types';

describe('useFormsStore', () => {
  it('should add forms', () => {
    const { result } = renderHook(() => useFormsStore());

    expect(result.current.forms).toEqual([]);
    expect(result.current.countries).toEqual(COUNTRIES);

    const mockForm: Data = {
      name: 'Anna',
      age: 15,
      email: 'anna@ex.ru',
      password: '***',
      gender: 'female',
      country: 'Russia',
      picture: 'base64img',
    };

    act(() => {
      result.current.addForm(mockForm);
    });
    expect(result.current.forms).toHaveLength(1);
    expect(result.current.forms[0].name).toBe('Anna');

    act(() => {
      result.current.addForm({
        ...mockForm,
        name: 'Ivan',
        email: 'ivan@ex.ru',
      });
    });
    expect(result.current.forms).toHaveLength(2);
    expect(result.current.forms[1].name).toBe('Ivan');
  });
});
