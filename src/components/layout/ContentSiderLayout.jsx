import { Layout, Menu } from "antd";
import React from "react";

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
        // position: "relative",
        // minHeight: "100%",
      }}
    >
      {items && (
        <Sider width={200}
        style={{
          borderRight: "1px solid rgb(0,0,0,0.3)"
        }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKeys]}
            // defaultOpenKeys={["sub1"]} // <-- this is for menu with dropdown
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
