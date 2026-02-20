"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import SnackbarProvider from "@/components/common/SnackbarProvider";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
    </Provider>
  );
}
