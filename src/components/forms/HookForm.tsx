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
  const { addHookForm, countries } = useFormsStore((s) => s);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
    defaultValues: { picture: undefined },
  });

  const onSubmit = async (data: FormValues) => {
    const base64 = await toBase64(data.picture);

    addHookForm({ ...data, picture: base64 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <div className="row">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            id="name"
            {...register('name')}
            className={styles.input}
            autoComplete="given-name"
          />
        </div>
        <p className="red">{errors.name?.message || ''}</p>
      </div>

      <div>
        <div className="row">
          <label htmlFor="age" className="label">
            Age:
          </label>
          <input
            id="age"
            type="number"
            {...register('age', { valueAsNumber: true })}
            className={styles.input}
            autoComplete="given-age"
          />
        </div>
        <p className="red">{errors.age?.message || ''}</p>
      </div>

      <div>
        <div className="row">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={styles.input}
            autoComplete="given-email"
          />
        </div>
        <p className="red">{errors.email?.message || ''}</p>
      </div>

      <div>
        <div className="row">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={styles.input}
            autoComplete="given-password"
          />
        </div>
        <p className="red">{errors.password?.message || ''}</p>
      </div>

      <div className="row">
        <label htmlFor="gender" className="label">
          Gender:
        </label>
        <select id="gender" {...register('gender')} className={styles.input}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <div className="row">
          <label htmlFor="country" className="label">
            Country:
          </label>
          <input
            id="country"
            list="countries"
            {...register('country')}
            className={styles.input}
            autoComplete="given-country"
          />
          <datalist id="countries">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <p className="red">{errors.country?.message || ''}</p>
      </div>

      <div className="row">
        <label htmlFor="picture" className="label">
          Picture:
        </label>
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
                accept="image/png, image/jpeg"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
              {fieldState.error && (
                <p className="red">{fieldState.error.message}</p>
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
