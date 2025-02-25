import styled from "@emotion/styled";
import { Dropdown, Menu, Table, TablePaginationConfig, TableProps } from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
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
            dataIndex: "id",
            width: "8rem",
          },
          {
            title: "姓名",
            dataIndex: "name",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
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
