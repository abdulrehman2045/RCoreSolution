import { useState } from 'react';

/** Runs an async action (delete, toggle...) and keeps its error message for display. */
export function useActionRunner() {
  const [error, setError] = useState('');

  const run = async (action) => {
    setError('');
    try {
      await action();
    } catch (actionError) {
      setError(actionError.message);
    }
  };

  return { error, run };
}
