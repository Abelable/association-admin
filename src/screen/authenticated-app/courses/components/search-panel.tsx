import { useState } from "react";
import { Button, DatePicker, Input } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { CourseAuthor, CoursesSearchParams } from "types/course";
import moment from "moment";

export interface SearchPanelProps {
  params: Partial<CoursesSearchParams>;
  setParams: (params: Partial<CoursesSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    title: "",
    start_time: "",
    end_time: "",
  } as Partial<CoursesSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<CoursesSearchParams>>(params);

  const setTitle = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        title: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      title: evt.target.value,
    });
  };

  const setDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      start_time: formatString[0],
      end_time: formatString[1],
    });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>文章标题：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.title}
            onChange={setTitle}
            placeholder="请输入文章标题"
            allowClear={true}
          />
        </Row>
      </Row>
      <Row>
        <div>注册时间：</div>
        <DatePicker.RangePicker
          value={
            temporaryParams.start_time
              ? [
                  moment(temporaryParams.start_time),
                  moment(temporaryParams.end_time),
                ]
              : undefined
          }
          onChange={setDates}
        />
      </Row>
      <Row gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          style={{ marginRight: 0 }}
          type={"primary"}
          onClick={() => setParams({ ...params, ...temporaryParams })}
        >
          查询
        </Button>
      </Row>
    </Container>
  );
};

const Container = styled(Row)`
  padding: 2.4rem;
  background: #fff;
`;
