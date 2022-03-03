import { Button, Dropdown, Layout, Menu } from "antd";
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
import { useAuth } from "context/auth-context";

const { Header, Sider, Content } = Layout;

export const AuthenticatedApp = () => {
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
          <div onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Unfold /> : <Fold />}
          </div>
          <User />
        </ContentHeader>
        <ContentWrap>Content</ContentWrap>
      </Layout>
    </Layout>
  );
};

const User = () => {
  const { logout } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Logo size={3.6} src={logoImg} />
    </Dropdown>
  );
};

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.6rem;
  cursor: pointer;
`;

const Logo = styled.img<{ size?: number }>`
  width: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  height: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  border-radius: 50%;
  cursor: pointer;
`;

const Name = styled.div`
  margin-left: 1rem;
  color: #fff;
  font-size: 1.4rem;
  white-space: nowrap;
`;

const ContentHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  padding-right: 2.4rem;
  background: #fff;
`;

const Unfold = styled(MenuUnfoldOutlined)`
  padding: 0 2.4rem;
  font-size: 1.8rem;
  line-height: 6.4rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
const Fold = Unfold.withComponent(MenuFoldOutlined);

const ContentWrap = styled(Content)`
  margin: 2.4rem 1.6rem;
  padding: 2.4rem;
  background: #fff;
`;
