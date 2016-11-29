export function constructUrl(route) {
  const { path, query } = route;
  let result = path.join('/');
  let queryArr = [];
  if (query && typeof query === 'object') {
    queryArr = Object.keys(query).sort()
      .filter(key => query[key] !== null)
      .map(key => `${key}=${query[key]}`);
  }                                               //basically combining the key with the arr[key] as one element in queryArr

  if (queryArr.length > 0) {
    result += `?${queryArr.join('&')}`;           //the length will always be 1 since we are not sending time, just the genre
  }

  return result;
}

export function parseUrl(windowHash) {
  let path = [];
  const query = {};
  const hashArr = windowHash.replace('#/', '').split('?');
  path = hashArr[0].split('/');

  if (hashArr.length > 1) {
    hashArr[1].split('&').forEach(str => {
      const arr = str.split('=');
      const key = arr[0];
      const value = arr[1];
      if (isNaN(value)) {
        query[key] = value;
      } else {
        query[key] = Number(value);
      }
    });
  }

  return { path, query };
}
