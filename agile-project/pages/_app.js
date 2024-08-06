// pages/_app.js
import '../app/globals.css';
import { Provider } from 'react-redux';
import store from '../app/store/store';
import Layout from '@/app/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
