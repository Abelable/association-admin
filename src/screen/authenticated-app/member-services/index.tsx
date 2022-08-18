import styled from "@emotion/styled";
import { useServices } from "service/member-service";
import { toNumber } from "utils";
import { ServiceModal } from "./components/service-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useServicesSearchParams } from "./util";

export const Services = () => {
  const [params, setParams] = useServicesSearchParams();
  const { data, isLoading, error } = useServices(params);

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
        <ServiceModal />
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
