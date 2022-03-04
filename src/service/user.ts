import { useQuery } from "react-query";
import { useHttp } from "./http";
import dayjs from "dayjs";
import { cleanObject } from "utils";
import { UsersResult, UsersSearchParams } from "types/user";

export const useUsers = (params: Partial<UsersSearchParams>) => {
  const client = useHttp();
  return useQuery<UsersResult>(["users", params], () =>
    client("/api/admin/user/list", {
      data: cleanObject({
        s_time: params.s_time ? dayjs(params.s_time).valueOf() : "",
        e_time: params.e_time ? dayjs(params.e_time).valueOf() : "",
        ...params,
      }),
    })
  );
};
