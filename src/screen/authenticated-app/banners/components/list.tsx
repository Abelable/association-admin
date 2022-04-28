import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";
import dayjs from "dayjs";
import { useBannersQueryKey, useBannerModal } from "../util";
import { Banner } from "types/banner";
import { useDeleteBanner } from "service/banner";

interface ListProps extends TableProps<Banner>, SearchPanelProps {
  linkTypeOptions: { name: string; value: string }[];
  error: Error | unknown;
}

export const List = ({
  error,
  params,
  setParams,
  linkTypeOptions,
  ...restProps
}: ListProps) => {
  const { open } = useBannerModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>头图列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "编号",
            render: (value, banner, index) =>
              `${
                index + 1 + ((params.page || 1) - 1) * (params.page_size || 10)
              }`,
            width: "8rem",
          },
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "头图",
            render: (value, banner) => (
              <img
                style={{ width: "11.5rem", height: "5rem" }}
                src={banner.img}
                alt=""
              />
            ),
            width: "20rem",
          },
          {
            title: "是否展示",
            render: (value, banner) => (
              <span>{banner.is_show === "1" ? "展示" : "隐藏"}</span>
            ),
            width: "12rem",
          },
          {
            title: "跳转类型",
            render: (value, banner) => (
              <span>
                {
                  linkTypeOptions.find(
                    (item) => item.value === banner.link_type
                  )?.name
                }
              </span>
            ),
            width: "16rem",
          },
          {
            title: "跳转链接",
            render: (value, banner) => (
              <span>
                {banner.link_type === "1"
                  ? `文章ID：${banner.article_id}`
                  : banner.redirect_url}
              </span>
            ),
          },
          {
            title: "排序",
            dataIndex: "sort",
            width: "10rem",
          },
          {
            title: "时间",
            render: (value, banner) => (
              <>
                <div>
                  开始：
                  {dayjs(Number(banner.s_time) * 1000).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </div>
                <div>
                  结束：
                  {dayjs(Number(banner.e_time) * 1000).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </div>
              </>
            ),
            width: "24rem",
          },
          {
            title: "操作",
            render(value, banner) {
              return <More id={banner.id} />;
            },
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: string }) => {
  const { mutate: deleteBanner } = useDeleteBanner(useBannersQueryKey());

  const { startEdit } = useBannerModal();

  const confirmDeleteBanner = (id: string) => {
    Modal.confirm({
      title: "确定删除该头图吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteBanner(id),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={() => confirmDeleteBanner(id)} key={"delete"}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
