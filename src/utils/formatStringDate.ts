export default function formatStringDate(date: string) {
  const dateObj = new Date(date);

  return `${dateObj.getUTCDate()}.${dateObj.getUTCMonth() + 1}.${dateObj.getUTCFullYear()}`;
}
