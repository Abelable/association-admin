import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useCourseApplyListSearchParams = () => {
  const [params, setParmas] = useUrlQueryParams(["page", "page_size"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
      }),
      [params]
    ),
    setParmas,
  ] as const;
};

export const useCourseApplyListQueryKey = () => {
  const [params] = useCourseApplyListSearchParams();
  return ["course_apply_list", params];
};
