export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const token = localStorage.getItem('techquest_token');
  const headers = new Headers(init?.headers);
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(input, {
    ...init,
    headers
  });

  if (response.status === 401) {
    localStorage.removeItem('techquest_user');
    localStorage.removeItem('techquest_token');
    window.location.reload(); // Redireciona violentamente limpando a memória do React
  }

  return response;
}
