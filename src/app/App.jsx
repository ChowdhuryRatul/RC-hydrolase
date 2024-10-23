import React from "react";
import ScrollToTop from "../components/navigation/ScrollToTop";
import AppProvider from "./AppProvider";
import AppRouter from "./AppRouter";

const App = () => {
  return (
    <AppProvider>
      <ScrollToTop />
      <AppRouter />
    </AppProvider>
  );
};

export default App;
