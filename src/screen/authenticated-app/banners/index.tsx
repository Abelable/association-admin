import styled from "@emotion/styled";
import { useBanners } from "service/banner";
import { toNumber } from "utils";
import { BannerModal } from "./components/banner-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useBannersSearchParams } from "./util";

const linkTypeOptions = [
  { name: "跳转网商课堂", value: "1" },
  { name: "跳转政策指南", value: "2" },
  { name: "跳转网商智库", value: "3" },
  { name: "跳转H5", value: "4" },
];

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
          linkTypeOptions={linkTypeOptions}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
        />
        <BannerModal linkTypeOptions={linkTypeOptions} />
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
