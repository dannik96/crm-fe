import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@/styles/calendar.css';


export default function App({ Component, pageProps }: AppProps) {
  console.log("App");
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
