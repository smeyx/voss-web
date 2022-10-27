export default async function fetchJSON<T> (url: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = await response.json();
  if(response.ok) {
    return data;
  }

  throw new Error(`Error fetch ${ url }. ${ JSON.stringify(init) }`);
}
