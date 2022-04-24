import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";
import dayjs from "dayjs";
import { useTalentModal, useTalentsQueryKey } from "../util";
import { TalentModal } from "./talent-modal";
import { TalentListItem } from "types/talent";
import { useDeleteTalent, useEditTalentCategory } from "service/talents";
import { ColumnsSelect } from "./columns-select";

type ExportTalents = (ids: string[]) => void;
interface ListProps extends TableProps<TalentListItem>, SearchPanelProps {
  error: Error | unknown;
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  exportTalents: ExportTalents;
}

export const List = ({
  error,
  expertOptions,
  categoryOptions,
  params,
  setParams,
  setSelectedRowKeys,
  exportTalents,
  ...restProps
}: ListProps) => {
  const genderOptions = [
    { value: 0, desc: "未知" },
    { value: 1, desc: "男" },
    { value: 2, desc: "女" },
  ];

  const { open } = useTalentModal();
  const { mutate: editTalentCategory } = useEditTalentCategory(
    useTalentsQueryKey()
  );

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
        <Row gap>
          <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
            新增
          </Button>
          <ColumnsSelect />
        </Row>
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
            render: (value, talent, index) =>
              `${
                index + 1 + ((params.page || 1) - 1) * (params.page_size || 10)
              }`,
            fixed: "left",
            width: "8rem",
          },
          {
            title: "照片",
            render: (value, talent) => (
              <Avatar src={talent.image} icon={<UserOutlined />} />
            ),
            width: "8rem",
          },
          {
            title: "姓名",
            dataIndex: "name",
            width: "12rem",
          },
          {
            title: "性别",
            render: (value, talent) => (
              <span>
                {genderOptions.find((item) => item.value === talent.sex)?.desc}
              </span>
            ),
            width: "8rem",
          },
          {
            title: "身份证号",
            dataIndex: "id_number",
            width: "24rem",
          },
          {
            title: "政治面貌",
            dataIndex: "political_status",
            width: "12rem",
          },
          {
            title: "毕业院校",
            dataIndex: "graduated_school",
            width: "24rem",
          },
          {
            title: "学历及专业",
            dataIndex: "profession",
            width: "24rem",
          },
          {
            title: "专家库意向",
            render: (value, talent) =>
              talent.expert_intent_id.map((item) => (
                <Tag key={item}>
                  {expertOptions.find((_item) => _item.id === item)?.title}
                </Tag>
              )),
            width: "22rem",
          },
          {
            title: "工作单位",
            dataIndex: "employer",
            width: "30rem",
          },
          {
            title: "具体工作部门或所",
            dataIndex: "department",
            width: "20rem",
          },
          {
            title: "现任职务",
            dataIndex: "position",
            width: "20rem",
          },
          {
            title: "参加工作日期",
            dataIndex: "work_time",
            width: "20rem",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
            width: "20rem",
          },
          {
            title: "固话",
            dataIndex: "telephone",
            width: "20rem",
          },
          {
            title: "电子邮箱",
            dataIndex: "email",
            width: "24rem",
          },
          {
            title: "传真",
            dataIndex: "fax",
            width: "20rem",
          },
          {
            title: "微信号",
            dataIndex: "wechat",
            width: "20rem",
          },
          {
            title: "QQ",
            dataIndex: "QQ",
            width: "20rem",
          },
          {
            title: "人才分类",
            render: (value, talent) => (
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu>
                    {categoryOptions.map((option) => (
                      <Menu.Item
                        key={option.id}
                        onClick={() =>
                          editTalentCategory({
                            id: talent.id,
                            talent_classification: `${option.id}`,
                          })
                        }
                      >
                        {option.name}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <ButtonNoPadding
                  style={{
                    color: talent.talent_classification ? "#1890ff" : "#999",
                  }}
                  type={"link"}
                  onClick={(e) => e.preventDefault()}
                >
                  {categoryOptions.find(
                    (item) => item.id === Number(talent.talent_classification)
                  )?.name || "选择人才分类"}
                  <DownOutlined />
                </ButtonNoPadding>
              </Dropdown>
            ),
            width: "14rem",
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
            fixed: "right",
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
      <TalentModal
        genderOptions={genderOptions}
        expertOptions={expertOptions}
        categoryOptions={categoryOptions}
      />
    </Container>
  );
};

const More = ({
  talent,
  exportTalents,
}: {
  talent: TalentListItem;
  exportTalents: ExportTalents;
}) => {
  const { startEdit } = useTalentModal();
  const { mutate: deleteTalent } = useDeleteTalent(useTalentsQueryKey());

  const confirmDeleteProject = (id: string) => {
    Modal.confirm({
      title: "确定删除该人才申报吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteTalent(id),
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
