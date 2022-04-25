import styled from "@emotion/styled";
import { Button, Dropdown, Menu, Table, TablePaginationConfig } from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { useCustomSignups } from "service/custom-signup";
import { toNumber } from "utils";
import { useCustomSignupsSearchParams, useCustomSignupModal } from "./util";
import { PlusOutlined } from "@ant-design/icons";
import { CustomSignupModal } from "./components/custom-signup-modal";
import dayjs from "dayjs";

export const CustomSignups = () => {
  const [params, setParams] = useCustomSignupsSearchParams();
  const { data, isLoading, error } = useCustomSignups(params);
  const { startEdit, open } = useCustomSignupModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Main>
        <Header between={true}>
          <h3>自定义活动列表</h3>
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
                            onClick={() => startEdit(signup.id)}
                            key={"start"}
                          >
                            提前开始
                          </Menu.Item>
                        </>
                      ) : (
                        <></>
                      )}
                      {signup.activity_status !== 0 ? (
                        <Menu.Item
                          onClick={() => startEdit(signup.id)}
                          key={"check"}
                        >
                          查看报名列表
                        </Menu.Item>
                      ) : (
                        <></>
                      )}
                      {signup.activity_status === 1 ? (
                        <Menu.Item
                          onClick={() => startEdit(signup.id)}
                          key={"check"}
                        >
                          结束活动
                        </Menu.Item>
                      ) : (
                        <></>
                      )}
                      <Menu.Item
                        onClick={() => startEdit(signup.id)}
                        key={"link"}
                      >
                        获取活动地址
                      </Menu.Item>
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
        <CustomSignupModal customSignups={data?.list || []} />
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
