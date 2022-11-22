import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { loginFacebookReponseInterface } from '../../../models/loginResponse';
import { getUserViaToken } from '../../../utils/getUserViaToken';

function LoginForm() {
  const route = useRouter();

  const handleLogin = () => {
    FB.login(
      (response: loginFacebookReponseInterface) => {
        if (response.status == 'connected' && response.authResponse) {
          const access_token = response.authResponse.accessToken;
          if (access_token) {
            getUserViaToken(access_token).then((data) => {
              if (data) {
                if (!localStorage.getItem('app-token')) {
                  localStorage.setItem('app-token', access_token);
                  route.replace('/');
                }
              }
            });
          }
        }
      },
      { scope: 'email' }
    );
  };

  return (
    <Stack direction="column" sx={{ position: 'absolute', bottom: '50px' }} spacing={2}>
      <Button variant="outlined" onClick={handleLogin}>
        Get Started with Facebook
      </Button>
      <Button variant="outlined">Get Started with Gmail</Button>
    </Stack>
  );
}

export default LoginForm;
