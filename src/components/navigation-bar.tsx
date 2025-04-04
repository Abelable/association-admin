import styled from "@emotion/styled";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/users": "用户数据",
  "/banners": "头图管理",
  "/course": "网商课堂",
  "/course/course_categories": "课堂分类",
  "/course/author": "作者管理",
  "/course/list": "课堂列表",
  "/course/apply_list": "课程申请",
  "/legal": "政策指南",
  "/legal/categories": "分类管理",
  "/legal/categories/sub_categories": "二级分类管理",
  "/legal/legal_list": "政策列表",
  "/wisdoms": "网商智库",
  "/open_info": "公开信息",
  "/credit_portrait": "会员信用",
  "/member_service": "会员服务",
  "/industry_test": "行业监测",
  "/secretary_trends": "秘书处动态",
  "/financial_data": "财务数据",
  "/application": "会员管理",
  "/application/application_categories": "会员分类",
  "/application/application_list": "会员列表",
  "/application/enterprise_consulting": "企业咨询",
  "/talents": "人才管理",
  "/custom_signup": "活动报名",
  "/custom_signup/custom_signup_categories": "活动分类",
  "/custom_signup/custom_signup_list": "活动列表",
  "/custom_signups/enlist": "报名列表",
  "/album": "协会相册",
  "/industry": "浙江产业带",
  "/lives": "绿色直播",
  "/view": "数据大屏",
  "/view/data": "大屏数据",
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
      <div>当前位置：</div>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
