const baseUrl = import.meta.env.VITE_API_URL;

export function http(url: string, init?: RequestInit) {
  return fetch(baseUrl + url, init).then((response) => response.json());
}
