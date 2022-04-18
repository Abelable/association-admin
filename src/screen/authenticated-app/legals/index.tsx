import styled from "@emotion/styled";
import { useLegalCategories, useLegals } from "service/legal";
import { toNumber } from "utils";
import { LegalModal } from "./components/legal-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useLegalsSearchParams } from "./util";

export const Legals = () => {
  const [params, setParams] = useLegalsSearchParams();
  const { data, isLoading, error } = useLegals(params);
  const { data: category } = useLegalCategories({ page: 1, page_size: 30 });

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryList={category?.list || []}
          params={params}
          setParams={setParams}
        />
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
        <LegalModal categoryList={category?.list || []} />
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
