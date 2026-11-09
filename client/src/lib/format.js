export const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** "a\n b \n\nc" -> ["a", "b", "c"] */
export const splitLines = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
