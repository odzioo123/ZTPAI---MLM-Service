'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/pages/auth/login');
    }
  }, [router]);

  // Optionally, you can render a loading state or null while the redirect is happening
  return <p>Redirecting...</p>;
};

export default Page;
