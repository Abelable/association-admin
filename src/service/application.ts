import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import dayjs from "dayjs";
import { cleanObject } from "utils";
import {
  ApplicationsResult,
  ApplicationsSearchParams,
  LevelOption,
  ApplicationsItem,
} from "types/application";
import { useEditApplicationsConfig } from "./use-optimistic-options";

export const useLevelOptions = () => {
  const client = useHttp();
  return useQuery<LevelOption[]>(["levelOptions"], () =>
    client("/api/admin/enter-apply/level-info")
  );
};

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

export const useEditApplicationLevel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, level_id }: Partial<ApplicationsItem>) =>
      client("/api/admin/enter-apply/modify-level", {
        data: { id, member_level: level_id },
        method: "POST",
      }),
    useEditApplicationsConfig(queryKey)
  );
};
