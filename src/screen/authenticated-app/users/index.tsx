import { useState } from "react";
import { toNumber } from "utils";
import { useUsers } from "service/user";

import { SearchPanel } from "./components/SearchPanel";
import { List } from "./components/List";

import { UsersSearchParams } from "types/user";

export const Users = () => {
  const [params, setParams] = useState<Partial<UsersSearchParams>>({ page: 1 });
  const { data, isLoading } = useUsers(params);
  const pagination = {
    current: toNumber(data?.page),
    pageSize: toNumber(data?.page_size),
    total: toNumber(data?.total),
  };

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} />
      <List
        params={params}
        setParams={setParams}
        dataSource={data?.list}
        loading={isLoading}
        pagination={pagination}
      />
    </div>
  );
};
