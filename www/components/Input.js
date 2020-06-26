import React from 'react';
import { useField } from 'formik';
import strings from '../../globals/strings';
import { useRouter } from 'next/router';

const Input = ({
  // field,
  form,
  error,
  hint: Hint,
  required = true,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.error && meta.touched;
  const router = useRouter();
  const { lang } = router.query;

  return (
    <div className={`input ${hasError ? `has-error` : ``}`}>
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        <span className={`required`}>
          {required && `\u00a0*${strings[lang].auth_field_label_required}`}
        </span>
        {Hint && (
          <span className={`hint`}>
            <Hint />
          </span>
        )}
      </label>

      <input {...props} />

      {hasError && (
        <span className={`error`}>
          {/* 
            handle multiple errors in one field based on that bitch's opinion. 
            Basicaly it's here only for super strong passwords 
          */}
          {Object.keys(meta.error).map((errKey) => (
            <>
              {meta.error[errKey]}
              <br />
            </>
          ))}
        </span>
      )}
    </div>
  );
};
export default Input;
