import styled from "@emotion/styled";
import { useCourseAuthors, useCourses } from "service/course";
import { toNumber } from "utils";
import { CourseModal } from "./components/course-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useCoursesSearchParams } from "./util";

export const Courses = () => {
  const [params, setParams] = useCoursesSearchParams();
  const { data, isLoading, error } = useCourses(params);
  const { data: author } = useCourseAuthors({ page: 1, page_size: 30 });

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          authorList={author?.list || []}
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
        <CourseModal authorList={author?.list || []} />
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
