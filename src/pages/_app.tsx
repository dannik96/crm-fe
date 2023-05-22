import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@/styles/calendar.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("prevPath", router.asPath)
    if (localStorage.getItem('token') === undefined) {
      router.push('/login')
    }
  }, [])
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
