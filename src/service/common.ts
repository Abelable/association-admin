import { useHttp } from "./http";
import { useQuery, useMutation } from "react-query";
import { OssConfig } from "types/ossConfig";

export const useOssConfig = () => {
  const client = useHttp();
  return useQuery<OssConfig>(["ossConfig"], () => client("/api/admin/oss/ali"));
};

export const useOssConfig2 = () => {
  const client = useHttp();
  return useMutation(() =>
    client("/api/admin/oss/ali", {
      data: {},
      method: "POST",
    })
  );
};
