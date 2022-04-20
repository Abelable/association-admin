import styled from "@emotion/styled";
import { useBanners } from "service/banner";
import { toNumber } from "utils";
import { BannerModal } from "./components/banner-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useBannersSearchParams } from "./util";

export const Banners = () => {
  const [params, setParams] = useBannersSearchParams();
  const { data, isLoading, error } = useBanners(params);

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          error={error}
          params={params}
          setParams={setParams}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
        />
        <BannerModal />
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
