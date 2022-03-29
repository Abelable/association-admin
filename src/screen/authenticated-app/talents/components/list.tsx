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
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";
import dayjs from "dayjs";
import { useApplicationModal } from "../util";
import { TalentModal } from "./talent-modal";
import { TalentItem } from "types/talents";

type DealApplications = (ids: string[]) => void;
type ExportApplications = DealApplications;
interface ListProps extends TableProps<TalentItem>, SearchPanelProps {
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
            title: "姓名",
            dataIndex: "name",
            width: "16rem",
          },
          {
            title: "性别",
            dataIndex: "sex",
            width: "8rem",
          },
          {
            title: "工作单位",
            dataIndex: "employer",
          },
          {
            title: "具体工作部门或所",
            dataIndex: "department",
          },
          {
            title: "总评分",
            dataIndex: "score",
          },
          {
            title: "报名时间",
            render: (value, talent) => (
              <span>
                {talent.created_at
                  ? dayjs(Number(talent.created_at) * 1000).format(
                      "YYYY-MM-DD HH:mm"
                    )
                  : "无"}
              </span>
            ),
            width: "18rem",
          },
          {
            title: "操作",
            render(value, talent) {
              return (
                <More talent={talent} exportApplications={exportApplications} />
              );
            },
            fixed: "right",
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
      <TalentModal expertOptions={expertOptions} />
    </Container>
  );
};

const More = ({
  talent,
  exportApplications,
}: {
  talent: TalentItem;
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
            onClick={() => exportApplications([talent.id])}
            key={"export"}
          >
            导出
          </Menu.Item>
          <Menu.Item onClick={() => startEdit(talent.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(talent.id)}
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
