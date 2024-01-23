export function parseReactRequest(id) {
  const [filename, rawQuery] = id.split(`?`, 2);
  const query = Object.fromEntries(new URLSearchParams(rawQuery));
  if (query.react != null) {
    query.react = true;
  }
  if (query.index != null) {
    query.index = Number(query.index);
  }
  if (query.raw != null) {
    query.raw = true;
  }
  if (query.url != null) {
    query.url = true;
  }
  if (query.scoped != null) {
    query.scoped = true;
  }
  return {
    filename,
    query,
  };
}
