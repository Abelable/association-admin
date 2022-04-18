import { useState } from "react";
import { Button, Input, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { LegalCategory, LegalsSearchParams } from "types/legal";

export interface SearchPanelProps {
  categoryList: LegalCategory[];
  params: Partial<LegalsSearchParams>;
  setParams: (params: Partial<LegalsSearchParams>) => void;
}

export const SearchPanel = ({
  categoryList,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    legal_class_id: undefined,
    title: "",
  } as Partial<LegalsSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<LegalsSearchParams>>(params);

  const setCategory = (legal_class_id: any) =>
    setTemporaryParams({ ...temporaryParams, legal_class_id });
  const clearCategory = () =>
    setTemporaryParams({ ...temporaryParams, legal_class_id: undefined });

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

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>文章分类：</div>
          <Select
            style={{ width: "20rem" }}
            value={temporaryParams.legal_class_id}
            placeholder="请选择文章分类"
            allowClear={true}
            onSelect={setCategory}
            onClear={clearCategory}
          >
            {categoryList?.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Row>
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
