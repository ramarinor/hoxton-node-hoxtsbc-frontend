import { RequestBody } from './types';

// FINISH-ME: set to your server's endpoint
export const host = `http://localhost:4000`;

export const sendRequest = async (
  endpoint: string,
  method: string,
  bodyParam?: RequestBody,
  token?: string
) => {
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  if (token) headers.authorization = token;

  const body = bodyParam ? JSON.stringify(bodyParam) : undefined;

  const result = await fetch(`${host}/${endpoint}`, {
    method,
    headers,
    body
  });

  return result.json();
};

export const handleLogout = async () => {
  //FINISH-ME: remove token from local storage

  localStorage.removeItem('token');
  window.location.href = '/';
};

export const handleSignUp = async (body: RequestBody) => {
  await sendRequest('signup', 'POST', body);
  window.location.href = '/';
};

export const handleLogin = async (body: RequestBody) => {
  const result = await sendRequest('login', 'POST', body);

  const { token, error } = result;
  // FINISH-ME: set token in local storage
  localStorage.setItem('token', token);
  return { data: result.user, error };
};

export const signInWithJWT = async (token: string) => {
  const result = await sendRequest('banking-info', 'POST', undefined, token);
  return { data: result };
};
