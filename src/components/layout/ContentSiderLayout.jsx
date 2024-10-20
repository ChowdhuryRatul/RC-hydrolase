import React from "react";
import { Layout, Menu } from "antd";

const { Content, Sider } = Layout;

const ContentSiderLayout = ({
  items,
  defaultSelectedKeys,
  children,
  onClick,
}) => {
  return (
    <Layout
      style={{
        padding: "24px 0",
        minHeight: "320px",
      }}
    >
      {items && (
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKeys]}
            // defaultOpenKeys={["sub1"]} // <-- this is for menu with dropdown
            style={{
              height: "100%",
            }}
            items={items}
            onClick={onClick}
          />
        </Sider>
      )}
      <Content
        style={{
          padding: "0 24px",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default ContentSiderLayout;
