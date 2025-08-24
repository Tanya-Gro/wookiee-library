import { formDataSchema } from './schemas';

describe('formDataSchema', () => {
  const validFile = new File(['dummy'], 'test.png', { type: 'image/png' });

  it('should pass with valid data', () => {
    const result = formDataSchema.safeParse({
      name: 'John',
      age: 25,
      email: 'john@example.com',
      password: '123456',
      gender: 'male',
      country: 'USA',
      picture: validFile,
    });

    expect(result.success).toBe(true);
  });

  it('should fail if name is lowercase', () => {
    const result = formDataSchema.safeParse({
      name: 'john',
      age: 25,
      email: 'john@example.com',
      password: '123456',
      gender: 'male',
      country: 'USA',
      picture: validFile,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'First letter must be uppercase'
    );
  });
});
