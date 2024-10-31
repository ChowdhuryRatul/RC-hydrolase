import { Avatar, Divider, Flex, Layout } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import RCHydrolaseLogo from "../../assets/RCHydrolase_logo.png";

import "./styles.css";

const { Header, Content, Footer } = Layout;

const items2 = ["data filter 1", "data filter 2", "data filter 3"].map(
  (key) => ({
    key,
    label: `Sider ${key}`,
  })
);

const RootLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 48px",
          boxShadow: " 0px 1px 2px rgb(0,0,0,0.5)",
        }}
      >
        <Link to={"/"}>
          <Flex
            style={{ color: "black" }}
            gap={10}
            justify="center"
            align="center"
            className="topnav--brand"
          >
            <Avatar shape="square" size={64}  src={RCHydrolaseLogo} />
            <div className="topnav--brand-text">RC-Hydrolase</div>
          </Flex>
        </Link>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "12px 48px",
            maxWidth: "1260px",
            flex: 1,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        {/* <Divider /> */}
        RC-Hydrolase ©{new Date().getFullYear()} Created and developed by{" "}
        <a
          href="https://chowdhurylab.github.io/"
          target="_blank"
          rel="noopener"
        >
          Chowdhury Lab
        </a>
      </Footer>
    </Layout>
  );
};

export default RootLayout;
