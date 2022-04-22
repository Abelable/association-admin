import styled from "@emotion/styled";
import { useState } from "react";
import { Button, Drawer } from "antd";
import { Row } from "components/lib";
import { useExpertOptions, useTalents } from "service/talents";
import { toNumber } from "utils";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useTalentsSearchParams } from "./util";
import { TalentListItem } from "types/talent";

export const Talents = () => {
  const [params, setParams] = useTalentsSearchParams();
  const { data, isLoading, error } = useTalents(params);

  // 处理列表数据
  const list: TalentListItem[] = data
    ? data?.list.map((item) => {
        const { id, created_at, apply_content_json } = item;
        const jsonDataList = JSON.parse(apply_content_json);
        const list: string[][] = [];
        jsonDataList.forEach(
          (item: { title: string; name: string; value: string }) => {
            list.push([item.name, item.value]);
          }
        );
        const restData = Object.fromEntries(list);

        return { id, created_at, ...restData };
      })
    : [];

  const { data: expertOptions } = useExpertOptions();
  const categoryOptions = [
    { id: 1, name: "市场监管" },
    { id: 2, name: "非市场监管" },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const exportTalents = (ids: string[]) => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/api/admin/enter-apply/personal-export?ids=${ids.join()}`;
  };

  return (
    <Container drawerVisible={!!selectedRowKeys.length}>
      <Main>
        <SearchPanel
          expertOptions={expertOptions || []}
          categoryOptions={categoryOptions}
          params={params}
          setParams={setParams}
        />
        <List
          expertOptions={expertOptions || []}
          categoryOptions={categoryOptions}
          error={error}
          params={params}
          setParams={setParams}
          setSelectedRowKeys={setSelectedRowKeys}
          exportTalents={exportTalents}
          loading={isLoading}
          dataSource={list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <Drawer
        visible={!!selectedRowKeys.length}
        style={{ position: "absolute" }}
        height={"8rem"}
        placement="bottom"
        mask={false}
        getContainer={false}
        closable={false}
      >
        <Row between={true}>
          <div>
            已选择 <SelectedCount>{selectedRowKeys.length}</SelectedCount> 项
          </div>
          <Row gap={true}>
            <Button
              onClick={() => exportTalents(selectedRowKeys)}
              type={"primary"}
              style={{ marginRight: 0 }}
            >
              批量导出
            </Button>
          </Row>
        </Row>
      </Drawer>
    </Container>
  );
};

const Container = styled.div<{ drawerVisible: boolean }>`
  position: relative;
  padding-bottom: ${(props) => (props.drawerVisible ? "8rem" : 0)};
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;

const SelectedCount = styled.span`
  color: #1890ff;
  font-weight: 600;
`;
