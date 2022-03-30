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
import { useTalentModal } from "../util";
import { TalentModal } from "./talent-modal";
import { TalentItem } from "types/talent";

type ExportTalents = (ids: string[]) => void;
interface ListProps extends TableProps<TalentItem>, SearchPanelProps {
  error: Error | unknown;
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  exportTalents: ExportTalents;
}

export const List = ({
  error,
  expertOptions,
  params,
  setParams,
  setSelectedRowKeys,
  exportTalents,
  ...restProps
}: ListProps) => {
  const genderOptions = [
    { value: "0", desc: "未知" },
    { value: "1", desc: "男" },
    { value: "2", desc: "女" },
  ];

  const { open } = useTalentModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>人才申报列表</h3>
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
            render: (value, talent, index) =>
              `${
                index + 1 + ((params.page || 1) - 1) * (params.page_size || 10)
              }`,
            width: "8rem",
          },
          {
            title: "姓名",
            dataIndex: "name",
            width: "12rem",
          },
          {
            title: "性别",
            dataIndex: "sex",
            width: "8rem",
            render: (value, talent) =>
              genderOptions.find((item) => item.value === talent.sex)?.desc,
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
            width: "10rem",
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
              return <More talent={talent} exportTalents={exportTalents} />;
            },
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
      <TalentModal
        genderOptions={genderOptions}
        expertOptions={expertOptions}
      />
    </Container>
  );
};

const More = ({
  talent,
  exportTalents,
}: {
  talent: TalentItem;
  exportTalents: ExportTalents;
}) => {
  const { startEdit } = useTalentModal();

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
          <Menu.Item onClick={() => exportTalents([talent.id])} key={"export"}>
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
