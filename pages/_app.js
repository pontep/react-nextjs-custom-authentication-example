import Layout from "../layouts/layout";
import UserProvider from "../libs/user-context";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../libs/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
