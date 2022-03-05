import styled from "@emotion/styled";
import { useApplications, useLevelOptions } from "service/application";
import { toNumber } from "utils";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useApplicationsSearchParams } from "./util";

export const Applications = () => {
  const statusOptions = [
    { id: 1, name: "未处理", value: "0" },
    { id: 2, name: "已处理", value: "1" },
    { id: 3, name: "已驳回", value: "2" },
  ];

  const [params, setParams] = useApplicationsSearchParams();
  const { data, isLoading, error } = useApplications(params);
  const { data: levelOptions } = useLevelOptions();

  return (
    <Container>
      <SearchPanel
        statusOptions={statusOptions}
        levelOptions={levelOptions || []}
        params={params}
        setParams={setParams}
      />
      <List
        error={error}
        statusOptions={statusOptions}
        levelOptions={levelOptions || []}
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
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
`;
