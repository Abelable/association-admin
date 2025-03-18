import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useEnterpriseConsultingListSearchParams = () => {
  const [params, setParmas] = useUrlQueryParams([
    "enterprise_id",
    "enterprise_name",
    "page",
    "page_size",
  ]);
  return [
    useMemo(
      () => ({
        enterprise_name: params.enterprise_name,
        enterprise_id: Number(params.enterprise_id),
        page: Number(params.page) || 1,
        page_size: Number(params.page_size) || 10,
      }),
      [params]
    ),
    setParmas,
  ] as const;
};

export const useEnterpriseConsultingListQueryKey = () => {
  const [params] = useEnterpriseConsultingListSearchParams();
  return ["enterprise_consulting_list", params];
};
