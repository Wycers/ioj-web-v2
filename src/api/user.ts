import http from '@/utils/http';

export function signin(
  username: string,
  password: string
): Record<string, any> {
  return http.post('/session/principal', {
    username,
    password,
  });
}

export function recover(): Record<string, any> {
  return http.get('/session/principal');
}

export function signup(
  username: string,
  password: string,
  email: string
): Record<string, any> {
  return http.post('/account/application', {
    username,
    password,
    email,
  });
}

export function signout() {
  return http.delete('/session/principal');
}

export function getRole(): Record<string, any> {
  return http.get('/role');
}
