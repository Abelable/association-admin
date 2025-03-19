import { QueryKey, useMutation, useQuery } from "react-query";
import { Album, AlbumListResult, AlbumListSearchParams } from "types/album";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useAlbumList = (params: Partial<AlbumListSearchParams>) => {
  const client = useHttp();
  return useQuery<AlbumListResult>(["album_list", params], () =>
    client("/api/admin/album/list", { data: params })
  );
};

export const useAddAlbum = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Album>) =>
      client("/api/admin/album/save", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditAlbum = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Album>) =>
      client("/api/admin/album/save", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteAlbum = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Album>) =>
      client("/api/admin/album/save", {
        data: { ...params, status: -1 },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
