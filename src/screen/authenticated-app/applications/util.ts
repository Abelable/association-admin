import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useApplicationsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "s_time",
    "e_time",
    "name",
    "mobile",
    "email",
    "member_level",
    "is_deal",
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
