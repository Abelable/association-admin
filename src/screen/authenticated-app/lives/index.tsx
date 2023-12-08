import styled from "@emotion/styled";
import { useLives } from "service/live";
import { toNumber } from "utils";
import { LiveModal } from "./components/live-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useLivesSearchParams } from "./util";

export const Lives = () => {
  const [params, setParams] = useLivesSearchParams();
  const { data, isLoading, error } = useLives(params);

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
        <LiveModal />
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
