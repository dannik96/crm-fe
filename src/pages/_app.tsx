import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@/styles/calendar.css';


export default function App({ Component, pageProps }: AppProps) {
  console.log("App");
  console.log(`${process.env.NEXT_PUBLIC_API_URL}`);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
