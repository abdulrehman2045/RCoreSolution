import { useCallback, useEffect, useState } from 'react';

/**
 * Loads a list from an API function that returns `{ items }`.
 * `fetchList` must be a stable reference (e.g. `usersApi.list`).
 */
export function useRemoteList(fetchList) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    try {
      const data = await fetchList();
      setItems(data.items);
      setError('');
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [fetchList]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { items, loading, error, reload };
}
