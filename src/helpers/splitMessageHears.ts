export function splitMessageHears(m: string) {
  const sepIndex = m.indexOf(':');
  return m.slice(sepIndex + 1).trim();
}
