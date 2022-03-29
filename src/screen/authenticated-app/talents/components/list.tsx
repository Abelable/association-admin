import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import { ApplicationsItem } from "types/application";
import { SearchPanelProps } from "./search-panel";
import dayjs from "dayjs";
import { useApplicationModal } from "../util";
import { ApplicationModal } from "./application-modal";

type DealApplications = (ids: string[]) => void;
type ExportApplications = DealApplications;
interface ListProps extends TableProps<ApplicationsItem>, SearchPanelProps {
  error: Error | unknown;
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  exportApplications: ExportApplications;
}

export const List = ({
  error,
  expertOptions,
  params,
  setParams,
  setSelectedRowKeys,
  exportApplications,
  ...restProps
}: ListProps) => {
  const { open } = useApplicationModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>申报列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) =>
            setSelectedRowKeys(selectedRowKeys as []),
        }}
        rowKey={"id"}
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
            title: "姓名",
            dataIndex: "name",
            width: "12rem",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
            width: "16rem",
          },
          {
            title: "邮箱",
            dataIndex: "email",
          },
          {
            title: "状态",
            render: (value, application) => (
              <span>
                {application.is_deal === "0" ? (
                  <span style={{ color: "#52c41a" }}>待处理</span>
                ) : application.is_deal === "1" ? (
                  <span style={{ color: "#d9d9d9" }}>已处理</span>
                ) : (
                  <Tooltip title={`驳回理由：${application.reject_mark}`}>
                    <ButtonNoPadding type={"link"} danger>
                      已驳回
                    </ButtonNoPadding>
                  </Tooltip>
                )}
              </span>
            ),
            width: "9rem",
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
            width: "18rem",
          },
          {
            title: "操作",
            render(value, application) {
              return (
                <More
                  application={application}
                  exportApplications={exportApplications}
                />
              );
            },
            fixed: "right",
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
      <ApplicationModal expertOptions={expertOptions} />
    </Container>
  );
};

const More = ({
  application,
  exportApplications,
}: {
  application: ApplicationsItem;
  exportApplications: ExportApplications;
}) => {
  const { startEdit } = useApplicationModal();

  const confirmDeleteProject = (id: string) => {
    Modal.confirm({
      title: "确定删除该入会申请吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {},
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item
            onClick={() => exportApplications([application.id])}
            key={"export"}
          >
            导出
          </Menu.Item>
          <Menu.Item onClick={() => startEdit(application.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(application.id)}
            key={"delete"}
          >
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
