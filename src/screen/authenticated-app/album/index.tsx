import styled from "@emotion/styled";
import { useAlbumList } from "service/album";
import { toNumber } from "utils";
import { AlbumModal } from "./components/album-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useAlbumListSearchParams } from "./util";

const cityOptions = [
  { id: 1, name: "杭州" },
  { id: 2, name: "宁波" },
  { id: 3, name: "温州" },
  { id: 4, name: "绍兴" },
  { id: 5, name: "湖州" },
  { id: 6, name: "嘉兴" },
  { id: 7, name: "金华" },
  { id: 8, name: "衢州" },
  { id: 9, name: "台州" },
  { id: 10, name: "丽水" },
  { id: 11, name: "舟山" },
];

export const Album = () => {
  const [params, setParams] = useAlbumListSearchParams();
  const { data, isLoading, error } = useAlbumList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          cityOptions={cityOptions}
          params={params}
          setParams={setParams}
        />
        <List
          cityOptions={cityOptions}
          params={params}
          setParams={setParams}
          error={error}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
        />
        <AlbumModal cityOptions={cityOptions} />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
