import React from "react";
import AppProvider from "./AppProvider";
import AppRouter from "./AppRouter";
import ScrollToTop from "../components/navigation/ScrollToTop";

const App = () => {
  return (
    <AppProvider>
      <ScrollToTop />
      <AppRouter />
    </AppProvider>
  );
};

export default App;
