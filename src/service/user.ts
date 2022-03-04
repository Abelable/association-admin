import { useQuery } from "react-query";
import { useHttp } from "./http";

import { UsersResult, UsersSearchParams } from "types/user";

export const useUsers = ({
  page_size = 10,
  ...params
}: Partial<UsersSearchParams>) => {
  const client = useHttp();
  return useQuery<UsersResult>(["users", { page_size, ...params }], () =>
    client("/api/admin/user/list", { data: { page_size, ...params } })
  );
};
