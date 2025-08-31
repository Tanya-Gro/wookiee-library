import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import { useFormsStore } from '@/store/useFormsStore';
import { formDataSchema, type FormValues } from '@/schemas/schemas';
import { toBase64 } from '@/helpers/toBase64';

import styles from './Forms.module.css';

type Props = {
  onSuccess: () => void;
};

export default function HookForm({ onSuccess }: Props) {
  const { addForm, countries, addCountry } = useFormsStore((s) => s);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
    defaultValues: { picture: undefined },
  });

  const onSubmit = async (data: FormValues) => {
    let base64: string;

    try {
      base64 = await toBase64(data.picture);
    } catch {
      setError('picture', {
        type: 'manual',
        message: 'Failed to process file. Please select another one.',
      });
      return;
    }

    data.country = data.country[0].toUpperCase() + data.country.slice(1);

    if (!countries.includes(data.country)) {
      addCountry([...countries, data.country]);
    }

    addForm({ ...data, picture: base64 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <div className={styles.row}>
          <label htmlFor="name">Name:</label>
          <input id="name" {...register('name')} autoComplete="given-name" />
        </div>
        <p className={styles.error}>{errors.name?.message || ''}</p>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            {...register('age', { valueAsNumber: true })}
            autoComplete="given-age"
          />
        </div>
        <p className={styles.error}>{errors.age?.message || ''}</p>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            autoComplete="given-email"
          />
        </div>
        <p className={styles.error}>{errors.email?.message || ''}</p>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            autoComplete="given-password"
          />
        </div>
        <p className={styles.error}>{errors.password?.message || ''}</p>
      </div>

      <div className={styles.row}>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <div className={styles.row}>
          <label htmlFor="country">Country:</label>
          <input
            id="country"
            list="countries"
            {...register('country')}
            autoComplete="given-country"
          />
          <datalist id="countries">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <p className={styles.error}>{errors.country?.message || ''}</p>
      </div>

      <div className={styles.row}>
        <label htmlFor="picture">Picture:</label>
        <Controller
          control={control}
          name="picture"
          rules={{
            required: 'Picture is required',
          }}
          render={({ field, fieldState }) => (
            <>
              <input
                type="file"
                id="picture"
                accept="image/png, image/jpeg"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
              {fieldState.error && (
                <p className={styles.error}>{fieldState.error.message}</p>
              )}
            </>
          )}
        />
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
