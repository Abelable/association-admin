import { toNumber } from "utils";
import { useUsers } from "service/user";
import { useUsersSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";

export const Users = () => {
  const [params, setParams] = useUsersSearchParams();
  const { data, isLoading, error } = useUsers(params);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} />
      <List
        error={error}
        params={params}
        setParams={setParams}
        dataSource={data?.list}
        loading={isLoading}
        pagination={{
          current: toNumber(data?.page),
          pageSize: toNumber(data?.page_size),
          total: toNumber(data?.total),
        }}
      />
    </div>
  );
};
