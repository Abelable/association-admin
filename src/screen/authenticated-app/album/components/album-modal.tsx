import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";

import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useForm } from "antd/lib/form/Form";
import { useAddAlbum, useEditAlbum } from "service/album";
import { useAlbumModal, useAlbumListQueryKey } from "../util";

import type { Album, AlbumListResult } from "types/album";

export const AlbumModal = ({
  cityOptions,
}: {
  cityOptions: { id: number; name: string }[];
}) => {
  const [form] = useForm();

  const { albumModalOpen, editingAlbumId, close } = useAlbumModal();

  const useMutationAlbum = editingAlbumId ? useEditAlbum : useAddAlbum;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationAlbum(useAlbumListQueryKey());
  const editingAlbumForm = useEditingAlbumForm(editingAlbumId);

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      const { photo_list, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingAlbumId || "",
        photo_list: JSON.stringify(photo_list.map((item: any) => item.url)),
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingAlbumForm) {
      const { photo_list, ...restFieldsValue } = editingAlbumForm;
      const photoList = JSON.parse(photo_list);
      form.setFieldsValue({
        photo_list: photoList.map((url: string) => ({ url })),
        ...restFieldsValue,
      });
    }
  }, [form, editingAlbumForm]);

  return (
    <Drawer
      title={editingAlbumId ? "编辑协会相册" : "新增协会相册"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={albumModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={mutateLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="活动标题"
              rules={[{ required: true, message: "请输入活动标题" }]}
            >
              <Input placeholder="请输入活动标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="活动地点"
              name="city_id"
              rules={[{ required: true, message: "请选择活动地点" }]}
            >
              <Select placeholder="请选择活动地点">
                {cityOptions?.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="photo_list"
          label="活动照片"
          rules={[{ required: true, message: "请上传活动照片" }]}
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <OssUpload />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const useEditingAlbumForm = (editingAlbumId: string) => {
  const queryClient = useQueryClient();
  const AlbumListResult: AlbumListResult | undefined = queryClient.getQueryData(
    useAlbumListQueryKey()
  );
  const currentAlbum = AlbumListResult
    ? AlbumListResult.list.find((item) => item.id === editingAlbumId)
    : undefined;

  const editingAlbumForm: Album | undefined = currentAlbum?.title
    ? currentAlbum
    : undefined;
  return editingAlbumForm;
};
