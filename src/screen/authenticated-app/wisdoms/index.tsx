import styled from "@emotion/styled";
import { useWisdoms } from "service/wisdom";
import { toNumber } from "utils";
import { WisdomModal } from "./components/wisdom-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useWisdomsSearchParams } from "./util";

export const Wisdoms = () => {
  const [params, setParams] = useWisdomsSearchParams();
  const { data, isLoading, error } = useWisdoms(params);

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
        <WisdomModal />
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
