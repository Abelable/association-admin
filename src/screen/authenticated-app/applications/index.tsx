import { useApplications, useLevelOptions } from "service/application";
import { toNumber } from "utils";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useApplicationsSearchParams } from "./util";

export const Applications = () => {
  const [params, setParams] = useApplicationsSearchParams();
  const { data, isLoading, error } = useApplications(params);
  const { data: levelOptions } = useLevelOptions();

  return (
    <div>
      <SearchPanel
        levelOptions={levelOptions || []}
        params={params}
        setParams={setParams}
      />
      <List
        error={error}
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
    </div>
  );
};
