import { useState } from 'react';
import { useFormsStore } from '@/store/useFormsStore';
import { formDataSchema, type FormValues } from '@/schemas/schemas';
import { toBase64 } from '@/helpers/toBase64';
import { ZodError } from 'zod';
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

    if (!file) {
      setErrors([
        { code: 'custom', message: 'File is required', path: ['picture'] },
      ]);
      return;
    }

    const data: FormValues = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      gender: formData.get('gender') as 'male' | 'female',
      country: formData.get('country') as string,
      picture: file,
    };

    const result = formDataSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.issues);
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
    errors?.find((issue) => issue.path[0] === field)?.message;

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-testid="form">
      <div>
        <div className="row">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input id="name" name="name" type="text" className={styles.input} />
        </div>
        <p className="red">{getError('name') || ''}</p>
      </div>

      <div>
        <div className="row">
          <label htmlFor="age" className="label">
            Age:
          </label>
          <input id="age" name="age" type="number" className={styles.input} />
        </div>
        <p className="red">{getError('age') || ''}</p>
      </div>

      <div>
        <div className="row">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
          />
        </div>
        <p className="red">{getError('email') || ''}</p>
      </div>

      <div>
        <div className="row">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
          />
        </div>
        <p className="red">{getError('password') || ''}</p>
      </div>

      <div>
        <div className="row">
          <label htmlFor="gender" className="label">
            Gender:
          </label>
          <select id="gender" name="gender" className={styles.input}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <p className="red">{getError('gender') || ''}</p>
      </div>

      <div>
        <div className="row">
          <label htmlFor="country" className="label">
            Country:
          </label>
          <input
            id="country"
            name="country"
            type="text"
            list="countries"
            className={styles.input}
            autoComplete="on"
          />
          <datalist id="countries">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <p className="red">{getError('country') || ''}</p>
      </div>

      <div className="row">
        <label htmlFor="picture" className="label">
          Picture:
        </label>
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/png,image/jpeg"
        />
        <p className="red">{getError('picture') || ''}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
