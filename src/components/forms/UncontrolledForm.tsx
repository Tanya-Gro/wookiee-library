import { useState } from 'react';
import { ZodError } from 'zod';

import { useFormsStore } from '@/store/useFormsStore';
import { formDataSchema, type FormValues } from '@/schemas/schemas';
import { toBase64 } from '@/helpers/toBase64';

import styles from './Forms.module.css';

type Props = {
  onSuccess: () => void;
};

export default function UncontrolledForm({ onSuccess }: Props) {
  const { addForm, countries, addCountry } = useFormsStore((s) => s);
  const [errors, setErrors] = useState<ZodError['issues'] | undefined>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = (
      e.currentTarget.elements.namedItem('picture') as HTMLInputElement
    ).files?.[0];

    const data: FormValues = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      gender: formData.get('gender') as 'male' | 'female',
      country: formData.get('country') as string,
      picture: file as File,
    };

    const result = formDataSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.issues);
      return;
    }

    if (!file) {
      return;
    }

    let base64: string;
    try {
      base64 = await toBase64(file);
    } catch {
      setErrors([
        {
          code: 'custom',
          message: 'Failed to process file. Please select another one.',
          path: ['picture'],
        },
      ]);
      return;
    }

    setErrors(undefined);

    data.country = data.country[0].toUpperCase() + data.country.slice(1);
    addForm({ ...data, picture: base64 });

    if (!countries.includes(data.country)) {
      addCountry([...countries, data.country]);
    }

    onSuccess();
  };

  const getError = (field: string) =>
    errors?.find((issue) => issue.path[0] === field)?.message || '';

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-testid="form">
      <div>
        <div className={styles.row}>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" />
        </div>
        <p className={styles.error}>{getError('name')}</p>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="age">Age:</label>
          <input id="age" name="age" type="number" />
        </div>
        <p className={styles.error}>{getError('age')}</p>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" />
        </div>
        <p className={styles.error}>{getError('email')}</p>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" />
        </div>
        <p className={styles.error}>{getError('password')}</p>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <p className={styles.error}>{getError('gender')}</p>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="country">Country:</label>
          <input
            id="country"
            name="country"
            type="text"
            list="countries"
            autoComplete="on"
          />
          <datalist id="countries">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <p className={styles.error}>{getError('country')}</p>
      </div>

      <div className={styles.row}>
        <label htmlFor="picture">Picture:</label>
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/png,image/jpeg"
        />
        <p className={styles.error}>{getError('picture')}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
