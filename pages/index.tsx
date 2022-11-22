import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import { getUserViaToken } from '../utils/getUserViaToken';

function Home() {
  const route = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('app-token') || '';
    if (!token) {
      route.replace('/login');
    } else {
      getUserViaToken(token).then((user) => {
        if (!user) {
          route.replace('/login');
        }
      });
    }
  }, [route]);

  const signOut = () => {
    if (localStorage.getItem('app-token')) {
      localStorage.removeItem('app-token');
      route.replace('/login');
    }
  };

  return (
    <div>
      <h3>Home Page</h3>
      <Button onClick={signOut}>Sign out</Button>
    </div>
  );
}

export default Home;
