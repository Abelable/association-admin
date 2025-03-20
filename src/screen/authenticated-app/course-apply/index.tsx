import { Table, TablePaginationConfig } from "antd";
import { ErrorBox, Row } from "components/lib";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { toNumber } from "utils";
import { useCourseApplyList } from "service/course-apply";
import { useCourseApplyListSearchParams } from "./util";

export const CourseApply = () => {
  const [params, setParams] = useCourseApplyListSearchParams();
  const { data, isLoading, error } = useCourseApplyList(params);
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
          <h3>课程申请列表</h3>
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
              title: "课程内容",
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
