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
import { OpenInfo } from "./open-info";
import { LegalCategories } from "./legal-categories/index";
import { LegalSubCategories } from "./legal-sub-categories";
import { Legals } from "./legals";
import { CourseAuthors } from "./course-authors/index";
import { Courses } from "./courses";
import { EnterpriseCategories } from "./enterprise-categories";
import { Applications } from "./applications";
import { EnterpriseConsulting } from "./enterprise-consulting";
import { Talents } from "./talents";
import { Services } from "./member-services/index";
import { Tests } from "./industry-test";
import { Trends } from "./secretary-trends";
import { Portraits } from "./credit-portrait";
import { Financials } from "./financial-data";
import { ActivityCategories } from "./activity-categories";
import { CustomSignups } from "./custom-signups";
import { CustomSignupUsers } from "./custom-signup-users";
import { Album } from "./album";
import { Industry } from "./industry";
import { Lives } from "./lives";
import { Datav } from "./datav-data";

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
  PlayCircleOutlined,
  UserOutlined,
  StarOutlined,
  HeartOutlined,
  MonitorOutlined,
  PieChartOutlined,
  AccountBookOutlined,
  RiseOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
  ReadOutlined,
  StockOutlined,
  LinkOutlined,
  EyeOutlined,
  AreaChartOutlined,
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
            <NavigationBar />
            <User />
          </Header>
          <Content>
            <Routes>
              <Route path="users" element={<Users />} />
              <Route path="banners" element={<Banners />} />
              <Route path="course/author" element={<CourseAuthors />} />
              <Route path="course/list" element={<Courses />} />
              <Route path="legal/categories" element={<LegalCategories />} />
              <Route
                path="legal/categories/sub_categories"
                element={<LegalSubCategories />}
              />
              <Route path="legal/legal_list" element={<Legals />} />
              <Route path="wisdoms" element={<Wisdoms />} />
              <Route path="open_info" element={<OpenInfo />} />
              <Route path="credit_portrait" element={<Portraits />} />
              <Route path="member_service" element={<Services />} />
              <Route path="industry_test" element={<Tests />} />
              <Route path="secretary_trends" element={<Trends />} />
              <Route path="financial_data" element={<Financials />} />
              <Route
                path="application/application_categories"
                element={<EnterpriseCategories />}
              />
              <Route
                path="application/application_list"
                element={<Applications />}
              />
              <Route
                path="application/enterprise_consulting"
                element={<EnterpriseConsulting />}
              />
              <Route path="talents" element={<Talents />} />
              <Route path="lives" element={<Lives />} />
              <Route
                path="custom_signup/custom_signup_categories"
                element={<ActivityCategories />}
              />
              <Route
                path="custom_signup/custom_signup_list"
                element={<CustomSignups />}
              />
              <Route
                path="custom_signups/enlist"
                element={<CustomSignupUsers />}
              />
              <Route path="album" element={<Album />} />
              <Route path="industry" element={<Industry />} />
              <Route path="view/data" element={<Datav />} />
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
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ overflowY: "scroll" }}
    >
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
        <Menu.SubMenu key={"legal"} icon={<ReadOutlined />} title={"政策指南"}>
          <Menu.Item key="categories" icon={<PartitionOutlined />}>
            <Link to={"legal/categories"}>分类管理</Link>
          </Menu.Item>
          <Menu.Item key="legal_list" icon={<BarsOutlined />}>
            <Link to={"legal/legal_list"}>政策列表</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="wisdoms" icon={<BulbOutlined />}>
          <Link to={"wisdoms"}>网商智库</Link>
        </Menu.Item>
        <Menu.Item key="open_info" icon={<EyeOutlined />}>
          <Link to={"open_info"}>公开信息</Link>
        </Menu.Item>
        <Menu.Item key="credit_portrait" icon={<PieChartOutlined />}>
          <Link to={"credit_portrait"}>会员信用</Link>
        </Menu.Item>
        <Menu.Item key="member_service" icon={<HeartOutlined />}>
          <Link to={"member_service"}>会员服务</Link>
        </Menu.Item>
        <Menu.Item key="industry_test" icon={<MonitorOutlined />}>
          <Link to={"industry_test"}>行业监测</Link>
        </Menu.Item>
        <Menu.Item key="secretary_trends" icon={<RiseOutlined />}>
          <Link to={"secretary_trends"}>秘书处动态</Link>
        </Menu.Item>
        <Menu.Item key="financial_data" icon={<AccountBookOutlined />}>
          <Link to={"financial_data"}>财务数据</Link>
        </Menu.Item>
        <Menu.SubMenu
          key={"application"}
          icon={<AuditOutlined />}
          title={"会员管理"}
        >
          <Menu.Item key="application_categories" icon={<PartitionOutlined />}>
            <Link to={"application/application_categories"}>会员分类</Link>
          </Menu.Item>
          <Menu.Item key="application_list" icon={<BarsOutlined />}>
            <Link to={"application/application_list"}>会员列表</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="talents" icon={<SolutionOutlined />}>
          <Link to={"talents"}>人才管理</Link>
        </Menu.Item>
        <Menu.SubMenu
          key={"custom_signup"}
          icon={<StarOutlined />}
          title={"活动报名"}
        >
          <Menu.Item
            key="custom_signup_categories"
            icon={<PartitionOutlined />}
          >
            <Link to={"custom_signup/custom_signup_categories"}>活动分类</Link>
          </Menu.Item>
          <Menu.Item key="custom_signup_list" icon={<BarsOutlined />}>
            <Link to={"custom_signup/custom_signup_list"}>活动列表</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="album" icon={<PictureOutlined />}>
          <Link to={"album"}>协会相册</Link>
        </Menu.Item>
        <Menu.Item key="industry" icon={<AreaChartOutlined />}>
          <Link to={"industry"}>浙江产业带</Link>
        </Menu.Item>
        <Menu.Item key="lives" icon={<VideoCameraOutlined />}>
          <Link to={"lives"}>绿色直播</Link>
        </Menu.Item>
        <Menu.SubMenu
          key={"view"}
          icon={<DashboardOutlined />}
          title={"数据大屏"}
        >
          <Menu.Item key="data" icon={<StockOutlined />}>
            <Link to={"view/data"}>大屏数据</Link>
          </Menu.Item>
          <Menu.Item key="view_link" icon={<LinkOutlined />}>
            <div
              onClick={() =>
                window.open(
                  "https://datav.aliyuncs.com/share/e89ac1b2ce4441ccc543fb59de29c04e"
                )
              }
            >
              网商协会大屏
            </div>
          </Menu.Item>
          <Menu.Item key="view_link_new" icon={<LinkOutlined />}>
            <div
              onClick={() =>
                window.open(
                  "https://datav.aliyun.com/share/page/1c15c09877751e38666f7b19f9480374"
                )
              }
            >
              数据可视化大屏
            </div>
          </Menu.Item>
        </Menu.SubMenu>
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
    <div
      onClick={() => setCollapsed(!collapsed)}
      style={{ marginTop: "0.3rem" }}
    >
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
