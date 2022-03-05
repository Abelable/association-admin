import { useQuery } from "react-query";
import { useHttp } from "./http";
import dayjs from "dayjs";
import { cleanObject } from "utils";
import {
  ApplicationsResult,
  ApplicationsSearchParams,
} from "types/application";

export const useApplications = (params: Partial<ApplicationsSearchParams>) => {
  const client = useHttp();
  return useQuery<ApplicationsResult>(["applications", params], () =>
    client("/api/admin/enter-apply/list", {
      data: {
        member_level: "",
        ...cleanObject({
          s_time: params.s_time ? dayjs(params.s_time).valueOf() : "",
          e_time: params.e_time ? dayjs(params.e_time).valueOf() : "",
          ...params,
        }),
      },
    })
  );
};
