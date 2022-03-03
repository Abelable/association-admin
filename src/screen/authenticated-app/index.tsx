import { Button, Dropdown, Layout, Menu } from "antd";
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
import { useState } from "react";
import styled from "@emotion/styled";

import logoImg from "assets/logo.jpeg";
import { useAuth } from "context/auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Users } from "./users";
import { ArticleCategory } from "./article/category";
import { ArticleList } from "./article/list";
import { ArticleBanner } from "./article/banner";
import { Applications } from "./applications";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LogoWrap>
            <Logo src={logoImg} />
            {collapsed ? null : <Name>浙江省网商协会</Name>}
          </LogoWrap>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["users"]}>
            <Menu.Item key="users" icon={<TeamOutlined />}>
              <Link to={"users"}>用户数据</Link>
            </Menu.Item>
            <SubMenu key={"article"} icon={<ReadOutlined />} title={"文章管理"}>
              <Menu.Item key="article_category" icon={<PartitionOutlined />}>
                <Link to={"article_category"}>分类管理</Link>
              </Menu.Item>
              <Menu.Item key="article_list" icon={<BarsOutlined />}>
                <Link to={"article_list"}>文章列表</Link>
              </Menu.Item>
              <Menu.Item key="article_banner" icon={<PictureOutlined />}>
                <Link to={"article_banner"}>头图管理</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="applications" icon={<UsergroupAddOutlined />}>
              <Link to={"applications"}>入会申请</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <ContentHeader>
            <div onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <Unfold /> : <Fold />}
            </div>
            <User />
          </ContentHeader>
          <ContentWrap>
            <Routes>
              <Route path="users" element={<Users />} />
              <Route path="article_category" element={<ArticleCategory />} />
              <Route path="article_list" element={<ArticleList />} />
              <Route path="article_banner" element={<ArticleBanner />} />
              <Route path="applications" element={<Applications />} />
            </Routes>
          </ContentWrap>
        </Layout>
      </Layout>
    </Router>
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
