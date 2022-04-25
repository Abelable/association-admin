import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import { CustomSignupUsersItem } from "types/custom-signup";
import { SearchPanelProps } from "./search-panel";
import dayjs from "dayjs";
import { useCustomSignupUserModal } from "../util";
import { CustomSignupUserModal } from "./application-modal";

type DealCustomSignupUsers = (ids: string[]) => void;
type ExportCustomSignupUsers = DealCustomSignupUsers;
interface ListProps
  extends TableProps<CustomSignupUsersItem>,
    SearchPanelProps {
  error: Error | unknown;
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  exportCustomSignupUsers: ExportCustomSignupUsers;
}

export const List = ({
  error,
  params,
  setParams,
  setSelectedRowKeys,
  exportCustomSignupUsers,
  ...restProps
}: ListProps) => {
  const { open } = useCustomSignupUserModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>报名列表</h3>
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
            title: "姓名",
            dataIndex: "name",
            width: "12rem",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
            width: "20rem",
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
                  exportCustomSignupUsers={exportCustomSignupUsers}
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
      <CustomSignupUserModal />
    </Container>
  );
};

const More = ({
  application,
  exportCustomSignupUsers,
}: {
  application: CustomSignupUsersItem;
  exportCustomSignupUsers: ExportCustomSignupUsers;
}) => {
  const { startEdit } = useCustomSignupUserModal();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item
            onClick={() => exportCustomSignupUsers([application.id])}
            key={"export"}
          >
            导出
          </Menu.Item>
          <Menu.Item onClick={() => startEdit(application.id)} key={"edit"}>
            编辑
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
