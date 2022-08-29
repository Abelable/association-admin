import styled from "@emotion/styled";
import { useTrends } from "service/secretary-trends";
import { toNumber } from "utils";
import { TrendModal } from "./components/trend-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useTrendsSearchParams } from "./util";

export const Trends = () => {
  const [params, setParams] = useTrendsSearchParams();
  const { data, isLoading, error } = useTrends(params);

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          error={error}
          params={params}
          setParams={setParams}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
        />
        <TrendModal />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
