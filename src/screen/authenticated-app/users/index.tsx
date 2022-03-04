import { toNumber } from "utils";
import { useUsers } from "service/user";
import { useUsersSearchParams } from "./util";

import { ErrorBox } from "components/lib";
import { SearchPanel } from "./components/SearchPanel";
import { List } from "./components/List";

export const Users = () => {
  const [params, setParams] = useUsersSearchParams();
  const { data, isLoading, error } = useUsers(params);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} />
      <ErrorBox error={error} />
      <List
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
