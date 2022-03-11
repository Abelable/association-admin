import styled from "@emotion/styled";
import { useArticleCategories, useArticles } from "service/article";
import { toNumber } from "utils";
import { ArticleModal } from "./components/article-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useArticlesSearchParams } from "./util";

export const Articles = () => {
  const [params, setParams] = useArticlesSearchParams();
  const { data, isLoading, error } = useArticles(params);
  const { data: category } = useArticleCategories({ page: 1, page_size: 10 });

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryList={category?.list || []}
          params={params}
          setParams={setParams}
        />
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
        <ArticleModal />
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
