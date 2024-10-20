import React from "react";
import { useGlobalAppContext } from "../AppProvider";

import DatabaseContent from "../../pages/database-main/DatabaseContent";
import DatabaseProvider from "../../pages/database-main/DatabaseProvider";

const DatabasePage = () => {
  return (
    <DatabaseProvider>
      <DatabaseContent />
    </DatabaseProvider>
  );
};

export default DatabasePage;
