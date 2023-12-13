import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Header from "@component/components/Header";
import { LoginCarga } from "@component/components/LoginCarga";
import ModalUsers from "@component/components/ModalUsers";
import { AppProvider } from "@component/context/Context";
import { useGetDashboard } from "@component/hooks/dashboard";
import { store } from "@component/store";
import { useAuthStore } from "@component/stores/auth";
import NiceModal from "@ebay/nice-modal-react";
import type { AppProps } from "next/app";
import { Kanit } from "next/font/google";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
const roboto = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
})
//Modals Globals
NiceModal.register("users-modal", ModalUsers);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      cacheTime: 0,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    fonts: {
      heading: roboto.style.fontFamily,
      body: roboto.style.fontFamily,
    },
    colors: {
      gray: {
        700: "#1f2733",
      },
      muni: {
        verde: "#95c840",
        celeste: "#4283d3",
      },
      afip: {
        600: "#4283d3",
      },
      verde: {
        500: "#95c840"
      }
    },
  });

  return (
    <AppProvider>
      <QueryClientProvider client={queryClient} contextSharing>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <NiceModal.Provider>
              <Component {...pageProps} />
            </NiceModal.Provider>
          </Provider>
        </ChakraProvider>
      </QueryClientProvider></AppProvider>
  );
}
