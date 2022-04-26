import styled from "@emotion/styled";
import { Button, Drawer } from "antd";
import { Row } from "components/lib";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCustomSignupUsers } from "service/custom-signup";
import { toNumber } from "utils";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useCustomSignupUsersSearchParams } from "./util";

export const CustomSignupUsers = () => {
  const [params, setParams] = useCustomSignupUsersSearchParams();
  const { data, isLoading, error } = useCustomSignupUsers(params);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const location = useLocation();

  const exportCustomSignupUsers = (ids: string[]) => {
    const custom_event_id =
      location.state &&
      (location.state as { custom_event_id: string }).custom_event_id
        ? (location.state as { custom_event_id: string }).custom_event_id
        : "";
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/api/admin/enter-form/registered-export?ids=${ids.join()}&custom_event_id=${custom_event_id}`;
  };

  return (
    <Container drawerVisible={!!selectedRowKeys.length}>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          error={error}
          params={params}
          setParams={setParams}
          setSelectedRowKeys={setSelectedRowKeys}
          exportCustomSignupUsers={exportCustomSignupUsers}
          loading={isLoading}
          dataSource={data?.list}
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
              onClick={() => exportCustomSignupUsers(selectedRowKeys)}
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
