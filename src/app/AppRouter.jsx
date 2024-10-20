import React from "react";
import { Route, Routes } from "react-router-dom";

// import 3 pages
import DatabasePage from "./pages/DatabasePage";
import ProteinIdPage from "./pages/ProteinIdPage";
import ClusterDataPage from "./pages/ClusterDataPage";

// we also want to create a basic not found page for
// and redirect it so unknown url.
// or pdbid that does not exist.
import NotFoundPage from "./pages/NotFoundPage";

// Top nav bar layout (same top nav for all pages)
import RootLayout from "../components/layout/RootLayout";

const AppRouter = () => {
  return (
    <Routes>
      {/* initial landing page, which is the database page */}

      <Route element={<RootLayout />}>
        <Route path="/" element={<DatabasePage />} />

        {/* The Protein ID and it's cluster page */}
        <Route path="/:pdbId">
          <Route index element={<ProteinIdPage />} />
          <Route path=":clusterId" element={<ClusterDataPage />} />
        </Route>

        {/* Not Found Page*/}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
