import React from "react";
import { Divider, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

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
        }}
      >
        <div style={{ color: "white" }}>RC-Hydrolase</div>
      </Header>
      <Content
        style={{
          padding: '24px 48px',
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <Divider style={{borderColor: "lightgray", }}>
          
        </Divider>
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
