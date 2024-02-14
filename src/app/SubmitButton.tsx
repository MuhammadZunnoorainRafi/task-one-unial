'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="px-5 disabled:opacity-60 py-1 rounded-md text-white bg-blue-500 hover:opacity-80"
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export default SubmitButton;
