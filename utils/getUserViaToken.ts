import { loginServerReponseInterface } from '../models/loginResponse';

export async function getUserViaToken(access_token: string) {
  try {
    const response = await fetch('http://localhost:8081/api/v1/login', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify({
        loginType: 'FB',
        token: access_token,
      }),
    });
    const data: loginServerReponseInterface = await response.json();
    return data.user;
  } catch (error) {
    throw new Error('Network error');
  }
}
