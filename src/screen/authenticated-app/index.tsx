import { useState } from "react";
import { useRouteType } from "utils/url";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";

import { BrowserRouter as Router, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Button, Dropdown, Layout, Menu } from "antd";
import { Users } from "./users";
import { Banners } from "./banners";
import { Wisdoms } from "./wisdoms";
import { LegalCategories } from "./legal-categories/index";
import { Legals } from "./legals";
import { CourseAuthors } from "./course-authors/index";
import { Courses } from "./courses";
import { Applications } from "./applications";
import { Talents } from "./talents";
import { CustomSignups } from "./custom-signups";
import { CustomSignupUsers } from "./custom-signup-users";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  PictureOutlined,
  PartitionOutlined,
  BarsOutlined,
  AuditOutlined,
  SolutionOutlined,
  BulbOutlined,
  HighlightOutlined,
  PlayCircleOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";
import logo from "assets/logo.jpeg";
import { NavigationBar } from "components/navigation-bar";

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
          <NavigationBar />
          <Content>
            <Routes>
              <Route path="users" element={<Users />} />
              <Route path="banners" element={<Banners />} />
              <Route path="course/author" element={<CourseAuthors />} />
              <Route path="course/list" element={<Courses />} />
              <Route path="legal/categories" element={<LegalCategories />} />
              <Route path="legal/legal_list" element={<Legals />} />
              <Route path="wisdoms" element={<Wisdoms />} />
              <Route path="applications" element={<Applications />} />
              <Route path="talents" element={<Talents />} />
              <Route path="custom_signups" element={<CustomSignups />} />
              <Route
                path="custom_signups/enlist"
                element={<CustomSignupUsers />}
              />
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
        <Menu.Item key="banners" icon={<PictureOutlined />}>
          <Link to={"banners"}>头图管理</Link>
        </Menu.Item>
        <Menu.SubMenu
          key={"course"}
          icon={<PlayCircleOutlined />}
          title={"网商课堂"}
        >
          <Menu.Item key="author" icon={<UserOutlined />}>
            <Link to={"course/author"}>作者管理</Link>
          </Menu.Item>
          <Menu.Item key="list" icon={<BarsOutlined />}>
            <Link to={"course/list"}>课堂列表</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key={"legal"}
          icon={<HighlightOutlined />}
          title={"法律汇编"}
        >
          <Menu.Item key="categories" icon={<PartitionOutlined />}>
            <Link to={"legal/categories"}>分类管理</Link>
          </Menu.Item>
          <Menu.Item key="legal_list" icon={<BarsOutlined />}>
            <Link to={"legal/legal_list"}>文章列表</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="wisdoms" icon={<BulbOutlined />}>
          <Link to={"wisdoms"}>网商智库</Link>
        </Menu.Item>
        <Menu.Item key="applications" icon={<AuditOutlined />}>
          <Link to={"applications"}>入会申请</Link>
        </Menu.Item>
        <Menu.Item key="talents" icon={<SolutionOutlined />}>
          <Link to={"talents"}>人才管理</Link>
        </Menu.Item>
        <Menu.Item key="custom_signups" icon={<StarOutlined />}>
          <Link to={"custom_signups"}>自定义活动报名</Link>
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
