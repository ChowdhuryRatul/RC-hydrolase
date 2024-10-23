import React from "react";
import ReactDOM from "react-dom/client";

// import main App jsx
import App from "./app/App";

// Set up Routing for React SPA Application
import { BrowserRouter } from "react-router-dom";

// we always do npm install --save normalize.css
// this is to reset the CSS,
// we need this because all browser have different default css.
import "normalize.css";

// we set out own global css
import "./global.css";

// Set up antdesign configuration (if a theme color change is needed)
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
          },

          components: {
            Layout: {
              colorBgLayout: "white",
              siderBg: "white",
              headerBg: "white",
              footerBg: "#fafafa"
            },
            Menu: {
            //   itemBg: '#fafafa', // colorBgBase -3% lightness
            // subItemBg: '#121A21' // colorBgBase -6% lightness
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
