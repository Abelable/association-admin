import { useQuery } from "react-query";
import { useHttp } from "./http";
import type {
  EnterpriseConsultingListResult,
  EnterpriseConsultingListSearchParams,
} from "types/enterprise-consulting";

export const useEnterpriseConsultingList = (
  params: Partial<EnterpriseConsultingListSearchParams>
) => {
  const client = useHttp();
  return useQuery<EnterpriseConsultingListResult>(
    ["enterprise_consulting_list", params],
    () => client("/api/admin/enterprise-consulting/list", { data: params })
  );
};
