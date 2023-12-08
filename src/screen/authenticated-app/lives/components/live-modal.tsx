import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { OssUpload } from "components/oss-upload";
import { OssVideoUpload } from "components/oss-video-upload";
import { useLiveModal, useLivesQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddLive, useEditLive } from "service/live";
import useDeepCompareEffect from "use-deep-compare-effect";

import type { Live } from "types/live";

export const LiveModal = () => {
  const [form] = useForm();

  const { liveModalOpen, editingLiveId, editingLive, close } = useLiveModal();

  const useMutationLive = editingLiveId ? useEditLive : useAddLive;
  const { mutateAsync, error, isLoading } = useMutationLive(useLivesQueryKey());

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
      const { cover, replay_url, ...restParams } = form.getFieldsValue();
      const liveParams: Live = {
        id: editingLiveId || "",
        cover: cover[0].url,
        replay_url: replay_url[0].url,
        ...restParams,
      };
      await mutateAsync(liveParams);
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingLive) {
      const { title, cover, replay_url, ...restFieldsValue } = editingLive;
      form.setFieldsValue({
        title,
        cover: [{ url: cover }],
        video: [{ name: `${title}.mp4`, url: replay_url, cover }],
        ...restFieldsValue,
      });
    }

    editingLive && form.setFieldsValue(editingLive);
  }, [form, editingLive]);

  return (
    <Drawer
      title={editingLiveId ? "编辑直播" : "新增直播"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={liveModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={isLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        <Form.Item
          name="replay_url"
          label="上传视频"
          rules={[{ required: true, message: "请上传视频" }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <OssVideoUpload />
        </Form.Item>
        <Form.Item
          name="cover"
          label="视频封面"
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "请上传视频封面" }]}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="直播标题"
              rules={[{ required: true, message: "请输入直播标题" }]}
            >
              <Input placeholder="请输入直播标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sort" label="直播排序">
              <Input placeholder="请输入直播序号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="platform"
              label="平台"
              rules={[{ required: true, message: "请输入平台" }]}
            >
              <Input placeholder="请输入平台" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="company_name"
              label="公司名称"
              rules={[{ required: true, message: "请输入公司名称" }]}
            >
              <Input placeholder="请输入公司名称" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="地址"
              rules={[{ required: true, message: "请输入地址" }]}
            >
              <Input placeholder="请输入地址" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
