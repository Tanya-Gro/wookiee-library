import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFormsStore } from './useFormsStore';
import type { Data } from '@/schemas/types';

describe('useFormsStore', () => {
  it('should add forms', () => {
    const { result } = renderHook(() => useFormsStore());

    expect(result.current.forms).toEqual([]);
    expect(result.current.countries).toEqual([]);

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
      result.current.addUncontrolledForm(mockForm);
    });
    expect(result.current.forms).toHaveLength(1);
    expect(result.current.forms[0].name).toBe('Anna');

    act(() => {
      result.current.addHookForm({
        ...mockForm,
        name: 'Ivan',
        email: 'ivan@ex.ru',
      });
    });
    expect(result.current.forms).toHaveLength(2);
    expect(result.current.forms[1].name).toBe('Ivan');
  });
});
