import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import {
  useCustomSignups,
  useDeleteCustomSignup,
  useEditCustomSignupStatus,
} from "service/custom-signup";
import { toNumber } from "utils";
import {
  useCustomSignupsSearchParams,
  useCustomSignupModal,
  useCustomSignupsQueryKey,
} from "./util";
import { PlusOutlined } from "@ant-design/icons";
import { CustomSignupModal } from "./components/custom-signup-modal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { CustomSignup } from "types/custom-signup";

export const CustomSignups = () => {
  const navigate = useNavigate();
  const [params, setParams] = useCustomSignupsSearchParams();
  const { data, isLoading, error } = useCustomSignups(params);
  const { startEdit, open } = useCustomSignupModal();
  const { mutate: editCustomSignupStatus } = useEditCustomSignupStatus(
    useCustomSignupsQueryKey()
  );
  const { mutate: deleteCustomSignup } = useDeleteCustomSignup(
    useCustomSignupsQueryKey()
  );
  const [linkUrl, setLinkUrl] = useState("");

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  const check = (custom_event_id: string) =>
    navigate("/custom_signups/enlist", { state: { custom_event_id } });

  const checkLink = (id: string) => {
    setLinkUrl(`http://wskt.zjseca.com/index.html?id=${id}#/custom_activity`);
  };
  const copyUrl = () => {
    copy(linkUrl);
    setLinkUrl("");
  };
  const confirmCustomSignup = (signup: CustomSignup) => {
    Modal.confirm({
      title: "确定删除该活动吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteCustomSignup(signup),
    });
  };

  return (
    <Container>
      <Main>
        <Header between={true}>
          <h3>活动列表</h3>
          <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
            新增
          </Button>
        </Header>
        <ErrorBox error={error} />
        <Table
          rowKey={"id"}
          dataSource={data?.list}
          loading={isLoading}
          columns={[
            {
              title: "编号",
              render: (value, signup, index) =>
                `${
                  index +
                  1 +
                  ((params.page || 1) - 1) * (params.page_size || 10)
                }`,
              width: "10rem",
            },
            {
              title: "活动名称",
              dataIndex: "title",
            },
            {
              title: "已报名人数",
              render: (value, signup) => (
                <span>{`${signup.registered_num}/${signup.enter_num}`}</span>
              ),
            },
            {
              title: "活动创建时间",
              render: (value, signup) => (
                <span>
                  {dayjs(Number(signup.created_at) * 1000).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </span>
              ),
            },
            {
              title: "状态",
              render: (value, signup) => (
                <span>
                  {["未开始", "进行中", "已结束"][signup.activity_status]}
                </span>
              ),
            },
            {
              title: "操作",
              render: (value, signup) => (
                <Dropdown
                  overlay={
                    <Menu>
                      {signup.activity_status === 0 ? (
                        <>
                          <Menu.Item
                            onClick={() => startEdit(signup.id)}
                            key={"edit"}
                          >
                            编辑
                          </Menu.Item>
                          <Menu.Item
                            onClick={() =>
                              editCustomSignupStatus({
                                id: signup.id,
                                activity_status: 1,
                              })
                            }
                            key={"start"}
                          >
                            提前开始
                          </Menu.Item>
                        </>
                      ) : (
                        <></>
                      )}
                      {signup.activity_status === 1 ? (
                        <Menu.Item
                          onClick={() =>
                            editCustomSignupStatus({
                              id: signup.id,
                              activity_status: 2,
                            })
                          }
                          key={"stop"}
                        >
                          结束活动
                        </Menu.Item>
                      ) : (
                        <></>
                      )}
                      {signup.activity_status !== 0 ? (
                        <Menu.Item
                          onClick={() => check(signup.id)}
                          key={"check"}
                        >
                          查看报名列表
                        </Menu.Item>
                      ) : (
                        <></>
                      )}
                      <Menu.Item
                        onClick={() => checkLink(signup.id)}
                        key={"link"}
                      >
                        获取活动地址
                      </Menu.Item>
                      {signup.activity_status === 2 ? (
                        <Menu.Item
                          onClick={() => confirmCustomSignup(signup)}
                          key={"delete"}
                        >
                          删除活动
                        </Menu.Item>
                      ) : (
                        <></>
                      )}
                    </Menu>
                  }
                >
                  <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
                </Dropdown>
              ),
              width: "10rem",
            },
          ]}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
          onChange={setPagination}
        />
        <CustomSignupModal />
        <Modal
          title="活动地址"
          visible={!!linkUrl}
          okText={"复制"}
          cancelText={"关闭"}
          onOk={() => copyUrl()}
          onCancel={() => setLinkUrl("")}
        >
          <p>{linkUrl}</p>
        </Modal>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;

const Main = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
