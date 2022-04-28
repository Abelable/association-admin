import styled from "@emotion/styled";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/users": "用户数据",
  "/banners": "头图管理",
  "/course": "网商课堂",
  "/course/author": "作者管理",
  "/course/list": "课堂列表",
  "/legal": "法律汇编",
  "/legal/categories": "分类管理",
  "/legal/legal_list": "文章列表",
  "/wisdoms": "网商智库",
  "/applications": "入会申请",
  "/talents": "人才管理",
  "/custom_signups": "自定义活动报名",
  "/custom_signups/enlist": "报名列表",
};

export const NavigationBar = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Wrap>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 2.4rem;
  background: #fff;
`;
