import Layout from "../layouts/layout";
import UserProvider from "../libs/user-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
