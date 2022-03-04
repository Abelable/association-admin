import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useUsersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "s_time",
    "e_time",
    "nickname",
    "page",
    "page_size",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};
