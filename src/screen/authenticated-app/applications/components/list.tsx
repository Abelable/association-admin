import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { ApplicationsItem } from "types/application";
import { SearchPanelProps } from "./search-panel";
import dayjs from "dayjs";

export interface ListProps
  extends TableProps<ApplicationsItem>,
    SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  error,
  levelOptions,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>申请列表</h3>
        <Button type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowSelection={{ type: "checkbox" }}
        rowKey={"id"}
        scroll={{ x: 1500 }}
        columns={[
          {
            title: "编号",
            render: (value, application, index) =>
              `${
                index + 1 + ((params.page || 1) - 1) * (params.page_size || 10)
              }`,
            fixed: "left",
            width: "8rem",
          },
          {
            title: "公司",
            dataIndex: "company_name",
          },
          {
            title: "等级名称",
            render: (value, application) => (
              <Dropdown
                overlay={
                  <Menu>
                    {levelOptions.map((option) => (
                      <Menu.Item>{option.name}</Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <ButtonNoPadding
                  type={"link"}
                  onClick={(e) => e.preventDefault()}
                >
                  {
                    levelOptions.find(
                      (option) => option.level === Number(application.level_id)
                    )?.name
                  }{" "}
                  <DownOutlined />
                </ButtonNoPadding>
              </Dropdown>
            ),
            width: "16rem",
          },
          {
            title: "姓名",
            dataIndex: "name",
            width: "12rem",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
            width: "18rem",
          },
          {
            title: "邮箱",
            dataIndex: "email",
            width: "24rem",
          },
          {
            title: "状态",
            render: (value, application) => (
              <span>
                {application.is_deal === "0"
                  ? "未处理"
                  : application.is_deal === "1"
                  ? "已处理"
                  : "已驳回"}
              </span>
            ),
            width: "10rem",
          },
          {
            title: "报名时间",
            render: (value, application) => (
              <span>
                {application.created_at
                  ? dayjs(Number(application.created_at) * 1000).format(
                      "YYYY-MM-DD HH:mm"
                    )
                  : "无"}
              </span>
            ),
            width: "20rem",
          },
          {
            title: "操作",
            render(value, application) {
              return <More id={application.id} />;
            },
            fixed: "right",
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: string }) => {
  const confirmDeleteProject = (id: string) => {
    Modal.confirm({
      title: "确定删除该入会申请吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {},
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => {}} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={() => {}} key={"edit"}>
            导出
          </Menu.Item>
          <Menu.Item onClick={() => confirmDeleteProject(id)} key={"delete"}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
