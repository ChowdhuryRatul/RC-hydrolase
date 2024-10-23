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
          padding: "0px 72px",
        }}
      >
        <Link to={"/"}>
          <Flex
            style={{ color: "white" }}
            gap={10}
            justify="center"
            align="center"
            className="topnav--brand"
          >
            <Avatar src={RCHydrolaseLogo} />
            <div className="topnav--brand-text">RC-Hydrolase</div>
          </Flex>
        </Link>
      </Header>
      <Content
        style={{
          padding: "24px 72px",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <Divider style={{ borderColor: "lightgray" }}></Divider>
        RC-Hydrolase ©{new Date().getFullYear()} Developed by{" "}
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
