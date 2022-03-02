import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "@emotion/styled";

import logoImg from "assets/logo.jpeg";

const { Header, Sider, Content } = Layout;

export const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <LogoWrap>
          <Logo src={logoImg} />
          {collapsed ? null : <Name>浙江省网商协会</Name>}
        </LogoWrap>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <ContentHeader>
          <Trigger onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Unfold /> : <Fold />}
          </Trigger>
        </ContentHeader>
        <ContentWrap>Content</ContentWrap>
      </Layout>
    </Layout>
  );
};

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
`;

const Logo = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const Name = styled.div`
  margin-left: 10px;
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
`;

const ContentHeader = styled(Header)`
  padding: 0;
  background: #fff;
`;

const Trigger = styled.div`
  width: fit-content;
`;

const Unfold = styled(MenuUnfoldOutlined)`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
const Fold = Unfold.withComponent(MenuFoldOutlined);

const ContentWrap = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
`;
