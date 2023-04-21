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
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { ApplicationsItem } from "types/application";
import { SearchPanelProps } from "./search-panel";
import dayjs from "dayjs";
import {
  useDeleteApplication,
  useEditApplicationEvaluation,
  useEditApplicationLevel,
} from "service/application";
import { useApplicationsQueryKey, useApplicationModal } from "../util";
import { useState } from "react";
import { RejectApplicationModal } from "./reject-application-modal";

type DealApplications = (ids: string[]) => void;
type ExportApplications = DealApplications;
interface ListProps extends TableProps<ApplicationsItem>, SearchPanelProps {
  error: Error | unknown;
  setSelectedRowKeys: (selectedRowKeys: []) => void;
  dealApplications: DealApplications;
  exportApplications: ExportApplications;
  editCode: Function;
}

export const List = ({
  error,
  evaluationOptions,
  levelOptions,
  params,
  setParams,
  setSelectedRowKeys,
  dealApplications,
  exportApplications,
  editCode,
  ...restProps
}: ListProps) => {
  const { open } = useApplicationModal();

  const { mutate: editApplicationLevel } = useEditApplicationLevel(
    useApplicationsQueryKey()
  );
  const { mutate: editApplicationEvaluation } = useEditApplicationEvaluation(
    useApplicationsQueryKey()
  );

  const [rejectingApplicationId, setRejectingApplicationId] = useState("");

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
            dataIndex: "id",
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
                trigger={["click"]}
                overlay={
                  <Menu>
                    {levelOptions.map((option) => (
                      <Menu.Item
                        key={option.id}
                        onClick={() =>
                          editApplicationLevel({
                            id: application.id,
                            level_id: `${option.level}`,
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
                  style={{ color: application.level_name ? "#1890ff" : "#999" }}
                  type={"link"}
                  onClick={(e) => e.preventDefault()}
                >
                  {application.level_name || "选择等级名称"}
                  <DownOutlined />
                </ButtonNoPadding>
              </Dropdown>
            ),
            width: "18rem",
          },
          {
            title: "企业评价",
            render: (value, application) => (
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu>
                    {evaluationOptions.map((option) => (
                      <Menu.Item
                        key={option.value}
                        onClick={() =>
                          editApplicationEvaluation({
                            id: application.id,
                            evaluation: `${option.value}`,
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
                  style={{ color: application.evaluation ? "#1890ff" : "#999" }}
                  type={"link"}
                  onClick={(e) => e.preventDefault()}
                >
                  {evaluationOptions.find(
                    (item) => item.value === application.evaluation
                  )?.name || "选择企业评价"}
                  <DownOutlined />
                </ButtonNoPadding>
              </Dropdown>
            ),
            width: "18rem",
          },
          {
            title: "姓名",
            dataIndex: "name",
            width: "12rem",
          },
          {
            title: "工作联系方式",
            dataIndex: "contacter_mobile",
            width: "20rem",
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
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "无"}
              </span>
            ),
            width: "18rem",
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
          {
            title: "编号",
            dataIndex: "number",
            width: "6rem",
          },
          {
            title: "会员证图片",
            render: (value, application) =>
              application.url ? (
                <Image
                  style={{ width: "8.8rem", height: "12rem" }}
                  src={application.url}
                  alt=""
                />
              ) : null,
            width: "11rem",
          },
          {
            title: "操作",
            render(value, application) {
              return (
                <More
                  editCode={editCode}
                  application={application}
                  dealApplications={dealApplications}
                  exportApplications={exportApplications}
                  setRejectingApplicationId={setRejectingApplicationId}
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
      <RejectApplicationModal
        rejectingApplicationId={rejectingApplicationId}
        onCancel={() => setRejectingApplicationId("")}
      />
    </Container>
  );
};

const More = ({
  application,
  dealApplications,
  exportApplications,
  setRejectingApplicationId,
  editCode,
}: {
  application: ApplicationsItem;
  dealApplications: DealApplications;
  exportApplications: ExportApplications;
  setRejectingApplicationId: (id: string) => void;
  editCode: Function;
}) => {
  const { mutate: deleteApplication } = useDeleteApplication(
    useApplicationsQueryKey()
  );

  const { startEdit } = useApplicationModal();

  const confirmDeleteProject = (id: string) => {
    Modal.confirm({
      title: "确定删除该会员管理吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteApplication(id),
    });
  };

  const codeCreate = (id: string, number: string, company_name: string) => {
    if (number === "") {
      Modal.info({
        title: "此企业暂无编号",
        content: "此企业暂无编号,请输入编号后重新生成",
        onOk() {
          startEdit(id);
        },
      });
      return false;
    }
    editCode({ id, number, company_name, certificate_status: "1" });
  };

  const codeUpdate = (id: string, number: string, company_name: string) => {
    editCode({ id, number, company_name, certificate_status: "1" });
  };

  const codeDelete = (id: string) => {
    editCode({ id, number: "", company_name: "", certificate_status: "-1" });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          {application.is_deal === "0" ? (
            <Menu.Item
              onClick={() => dealApplications([application.id])}
              key={"deal"}
            >
              处理
            </Menu.Item>
          ) : null}
          {application.is_deal === "0" ? (
            <Menu.Item
              onClick={() => setRejectingApplicationId(application.id)}
              key={"reject"}
            >
              驳回
            </Menu.Item>
          ) : null}
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
          {application.certificate_status === "0" ||
          application.certificate_status === "-1" ? (
            <Menu.Item
              onClick={() =>
                codeCreate(
                  application.id,
                  application.number,
                  application.company_name
                )
              }
              key={"code_create"}
            >
              生成会员证
            </Menu.Item>
          ) : null}
          {application.number !== "" &&
          application.certificate_status === "1" ? (
            <Menu.Item
              onClick={() =>
                codeUpdate(
                  application.id,
                  application.number,
                  application.company_name
                )
              }
              key={"code_update"}
            >
              更新会员证
            </Menu.Item>
          ) : null}
          {application.number !== "" &&
          application.certificate_status === "1" ? (
            <Menu.Item
              onClick={() => codeDelete(application.id)}
              key={"code_delete"}
            >
              取消会员证
            </Menu.Item>
          ) : null}
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
