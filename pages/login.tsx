import { useEffect } from 'react';

import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import Script from 'next/script';

import LoginForm from '../component/pages/login/login-form';
import Title from '../component/pages/login/title';
import { getUserViaToken } from '../utils/getUserViaToken';

export default function LoginPage() {
  const route = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('app-token') || '';

    if (token) {
      getUserViaToken(token).then((user) => {
        if (user) {
          route.replace('/');
        }
      });
    }
  }, [route]);

  return (
    <>
      <Script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js" id="import" />
      <Script id="config">
        {`
          window.fbAsyncInit = function() {
            FB.init({
              appId      : '1037347360995841',
              cookie     : true,
              xfbml      : true,
              version    : 'v15.0'
            });
              
            FB.AppEvents.logPageView();   
              
          };
        
          (function(d, s, id){
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>
      <Container maxWidth="xs">
        <Stack direction="column" justifyContent="space-between" alignItems="center">
          <Title />
          <LoginForm />
        </Stack>
      </Container>
    </>
  );
}

export function getInitialProps() {
  localStorage.getItem('app-token') || '';
  return {
    props: '',
  };
}
