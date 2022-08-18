import { useState } from "react";
import { Button, Input, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { CategoryOption, ServicesSearchParams } from "types/member-service";

export interface SearchPanelProps {
  categoryOptions: CategoryOption[];
  params: Partial<ServicesSearchParams>;
  setParams: (params: Partial<ServicesSearchParams>) => void;
}

export const SearchPanel = ({
  categoryOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    name: "",
    category_id: undefined,
  } as Partial<ServicesSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<ServicesSearchParams>>(params);

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

  const setCategory = (category_id: any) =>
    setTemporaryParams({ ...temporaryParams, category_id });
  const clearCategory = () =>
    setTemporaryParams({
      ...temporaryParams,
      category_id: undefined,
    });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>标题：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.title}
            onChange={setTitle}
            placeholder="请输入标题"
            allowClear={true}
          />
        </Row>
        <Row>
          <div>标签筛选：</div>
          <Select
            style={{ width: "20rem" }}
            value={temporaryParams.category_id}
            placeholder="请选择关联标签"
            allowClear={true}
            onSelect={setCategory}
            onClear={clearCategory}
          >
            {categoryOptions?.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Row>
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
