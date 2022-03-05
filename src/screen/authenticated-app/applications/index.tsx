import { useApplications } from "service/application";
import { toNumber } from "utils";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useApplicationsSearchParams } from "./util";

export const Applications = () => {
  const [params, setParams] = useApplicationsSearchParams();
  const { data, isLoading, error } = useApplications(params);

  return (
    <div>
      <SearchPanel />
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
    </div>
  );
};
