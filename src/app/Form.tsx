'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createDataAction } from './action';
import { useEffect, useRef } from 'react';
import SubmitButton from './SubmitButton';

function Form() {
  const [state, action] = useFormState(createDataAction, { errors: {} });
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.success) {
      ref.current?.reset();
    }
  }, [state]);

  return (
    <div className="p-5 rounded-md border border-slate-300">
      <h1 className="font-bold text-2xl text-center">Form</h1>
      <form
        action={action}
        ref={ref}
        className="flex flex-col items-center justify-center space-y-2"
      >
        <input placeholder="Name" className="input" type="text" name="name" />
        <p className="text-sm text-red-500">{state.errors?.name}</p>
        <input placeholder="Email" className="input" type="text" name="email" />
        <p className="text-sm text-red-500">{state.errors?.email}</p>
        <input
          placeholder="Country"
          className="input"
          type="text"
          name="country"
        />
        <p className="text-sm text-red-500">{state.errors?.country}</p>
        <SubmitButton />
      </form>
    </div>
  );
}

export default Form;
