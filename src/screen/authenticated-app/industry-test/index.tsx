import styled from "@emotion/styled";
import { useTests } from "service/industry-test";
import { toNumber } from "utils";
import { TestModal } from "./components/test-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useTestsSearchParams } from "./util";

export const Tests = () => {
  const [params, setParams] = useTestsSearchParams();
  const { data, isLoading, error } = useTests(params);

  const categoryOptions = [
    { id: "1", name: "法律与政策" },
    { id: "2", name: "监管动向" },
    { id: "3", name: "舆情总览" },
    { id: "4", name: "行业动态" },
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
        <TestModal categoryOptions={categoryOptions} />
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
