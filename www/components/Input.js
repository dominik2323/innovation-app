import React from 'react';
import { useField } from 'formik';

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
  return (
    <div className={`input ${hasError ? `has-error` : ``}`}>
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        {required && `\u00a0*`}
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
