'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token)
    {
      fetch(`http://localhost:8080/istoken-expired?token=${token}`)
          .then(response => {
            if (response.ok)
            {
              router.push('/dashboard');
            }
            else
            {
              localStorage.removeItem('token');
              router.push('/pages/auth/login');
            }
          });
          // .catch(() => {
          //   localStorage.removeItem('token');
          //   router.push('/pages/auth/login');
          // });
    }
    else
    {
      router.push('/pages/auth/login');
    }
  }, [router]);

  return <p>Redirecting...</p>;
};

export default Page;
