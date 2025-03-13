import styled from "@emotion/styled";
import { useOpenInfoList } from "service/open-info";
import { toNumber } from "utils";
import { OpenInfoModal } from "./components/open-info-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useOpenInfoListSearchParams } from "./util";

export const OpenInfo = () => {
  const [params, setParams] = useOpenInfoListSearchParams();
  const { data, isLoading, error } = useOpenInfoList(params);

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
        <OpenInfoModal />
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
