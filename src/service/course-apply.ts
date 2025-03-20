import { useQuery } from "react-query";
import { useHttp } from "./http";
import type {
  CourseApplyListResult,
  CourseApplyListSearchParams,
} from "types/course-apply";

export const useCourseApplyList = (
  params: Partial<CourseApplyListSearchParams>
) => {
  const client = useHttp();
  return useQuery<CourseApplyListResult>(["course_apply_list", params], () =>
    client("/api/admin/class-room-apply/list", { data: params })
  );
};
