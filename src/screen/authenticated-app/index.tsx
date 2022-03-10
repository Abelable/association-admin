import { useState } from "react";
import { useRouteType } from "utils/url";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";

import { HashRouter as Router, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Button, Dropdown, Layout, Menu } from "antd";
import { Users } from "./users";
import { ArticleCategories } from "./article-categories/index";
import { ArticleList } from "./article/list";
import { ArticleBanner } from "./article/banner";
import { Applications } from "./applications";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  ReadOutlined,
  PartitionOutlined,
  BarsOutlined,
  PictureOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import logo from "assets/logo.jpeg";

export const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <MenuSider collapsed={collapsed} />
        <Layout>
          <Header>
            <Trigger collapsed={collapsed} setCollapsed={setCollapsed} />
            <User />
          </Header>
          <Content>
            <Routes>
              <Route path="users" element={<Users />} />
              <Route
                path="article_categories"
                element={<ArticleCategories />}
              />
              <Route path="article_list" element={<ArticleList />} />
              <Route path="article_banner" element={<ArticleBanner />} />
              <Route path="applications" element={<Applications />} />
              <Route
                path={"*"}
                element={<Navigate to={"users"} replace={true} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const MenuSider = ({ collapsed }: { collapsed: boolean }) => {
  const routeType = useRouteType();

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Link to={"/"}>
        <Logo collapsed={collapsed}>
          <LogoImg src={logo} />
          <div>浙江省网商协会</div>
        </Logo>
      </Link>
      <Menu theme="dark" mode="inline" selectedKeys={[routeType]}>
        <Menu.Item key="users" icon={<TeamOutlined />}>
          <Link to={"users"}>用户数据</Link>
        </Menu.Item>
        <Menu.SubMenu
          key={"article"}
          icon={<ReadOutlined />}
          title={"文章管理"}
        >
          <Menu.Item key="article_categories" icon={<PartitionOutlined />}>
            <Link to={"article_categories"}>分类管理</Link>
          </Menu.Item>
          <Menu.Item key="article_list" icon={<BarsOutlined />}>
            <Link to={"article_list"}>文章列表</Link>
          </Menu.Item>
          <Menu.Item key="article_banner" icon={<PictureOutlined />}>
            <Link to={"article_banner"}>头图管理</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="applications" icon={<UsergroupAddOutlined />}>
          <Link to={"applications"}>入会申请</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};
interface Collapsed {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Trigger = ({ collapsed, setCollapsed }: Collapsed) => {
  return (
    <div onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <Unfold /> : <Fold />}
    </div>
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
      <LogoImg size={3.6} src={logo} />
    </Dropdown>
  );
};

const Logo = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  padding-left: ${(props) => (props.collapsed ? "2.6rem" : "1.6rem")};
  transition: padding-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  > div {
    margin-left: 1rem;
    flex: 1;
    height: 2.2rem;
    color: #fff;
    overflow: hidden;
    opacity: ${(props) => (props.collapsed ? 0 : 1)};
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

const LogoImg = styled.img<{ size?: number }>`
  width: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  height: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  border-radius: 50%;
  cursor: pointer;
`;

const Header = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 2.4rem;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 21 41 / 8%);
  z-index: 10;
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

const Content = styled(Layout.Content)`
  height: 100%;
`;
