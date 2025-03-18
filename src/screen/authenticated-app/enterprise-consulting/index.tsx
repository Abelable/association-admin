import { Table, TablePaginationConfig } from "antd";
import { ErrorBox, Row } from "components/lib";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { toNumber } from "utils";
import { useEnterpriseConsultingList } from "service/enterprise-consulting";
import { useEnterpriseConsultingListSearchParams } from "./util";

export const EnterpriseConsulting = () => {
  const [params, setParams] = useEnterpriseConsultingListSearchParams();
  const { data, isLoading, error } = useEnterpriseConsultingList(params);
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
          <h3>企业咨询列表（{params.enterprise_name}）</h3>
        </Header>
        <ErrorBox error={error} />
        <Table
          rowKey={"id"}
          dataSource={data?.list}
          loading={isLoading}
          columns={[
            {
              title: "id",
              dataIndex: "id",
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
              title: "单位名称",
              dataIndex: "company_name",
            },
            {
              title: "咨询问题",
              dataIndex: "content",
            },
            {
              title: "提交时间",
              dataIndex: "created_at",
              render: (value) => (
                <span>
                  {value
                    ? dayjs(Number(value) * 1000).format("YYYY-MM-DD HH:mm")
                    : "无"}
                </span>
              ),
              sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
            },
          ]}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
          onChange={setPagination}
        />
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
