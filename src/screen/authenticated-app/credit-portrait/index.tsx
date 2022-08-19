import styled from "@emotion/styled";
import { usePortraits } from "service/credit-portrait";
import { toNumber } from "utils";
import { PortraitModal } from "./components/portrait-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { usePortraitsSearchParams } from "./util";

export const Portraits = () => {
  const [params, setParams] = usePortraitsSearchParams();
  const { data, isLoading, error } = usePortraits(params);

  const categoryOptions = [
    { id: "1", name: "培训服务" },
    { id: "2", name: "政企合作" },
    { id: "3", name: "标准制定" },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={categoryOptions}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          categoryOptions={categoryOptions}
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
        <PortraitModal categoryOptions={categoryOptions} />
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
