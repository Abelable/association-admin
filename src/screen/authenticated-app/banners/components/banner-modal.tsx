import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useBannerModal, useBannersQueryKey } from "../util";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { Banner } from "types/banner";
import { useAddBanner, useEditBanner } from "service/banner";

export const BannerModal = () => {
  const [form] = useForm();

  const { bannerModalOpen, editingBannerId, editingBannerForm, close } =
    useBannerModal();

  const useMutationBanner = editingBannerId ? useEditBanner : useAddBanner;
  const { mutateAsync, error, isLoading } = useMutationBanner(
    useBannersQueryKey()
  );

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
      const { img, link_type, linkInfo, dateRange, ...restParams } =
        form.getFieldsValue();
      const s_time = `${Math.floor(dateRange[0].valueOf() / 1000) * 1000}`;
      const e_time = `${Math.floor(dateRange[1].valueOf() / 1000) * 1000}`;
      const bannerParams: Banner = {
        id: editingBannerId || "",
        s_time,
        e_time,
        link_type,
        banner_id: link_type === "1" ? linkInfo : "1",
        redirect_url: link_type === "2" ? linkInfo : "",
        img: img[0].url,
        ...restParams,
      };
      await mutateAsync(bannerParams);
      closeModal();
    });
  };

  useEffect(() => {
    editingBannerForm && form.setFieldsValue(editingBannerForm);
  }, [form, editingBannerForm]);

  return (
    <Drawer
      title={editingBannerId ? "编辑头图" : "新增头图"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={bannerModalOpen}
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="头图标题"
              rules={[{ required: true, message: "请输入头图标题" }]}
            >
              <Input placeholder="请输入头图标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sort" label="头图排序">
              <Input placeholder="请输入头图序号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateRange"
              label="投放时间"
              rules={[{ required: true, message: "请选择投放时间" }]}
            >
              <DatePicker.RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="跳转信息"
              name="linkInfo"
              rules={[{ required: true, message: "请输入新闻编号或H5地址" }]}
            >
              <Input
                addonBefore={
                  <Form.Item
                    name="link_type"
                    noStyle
                    rules={[{ required: true, message: "请选择跳转类型" }]}
                  >
                    <Select placeholder="请选择类型">
                      {[
                        { name: "跳转新闻", value: "1" },
                        { name: "跳转H5", value: "2" },
                      ].map((item, index) => (
                        <Select.Option key={index} value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                }
                placeholder="请输入新闻编号或H5地址"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="is_show"
              label="是否显示"
              rules={[{ required: true, message: "请选择显示或隐藏" }]}
            >
              <Select placeholder="请选择显示或隐藏">
                {[
                  { name: "显示", value: "1" },
                  { name: "隐藏", value: "0" },
                ].map((item, index) => (
                  <Select.Option key={index} value={item.value}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="img"
          label="分享图片"
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "请上传分享图片" }]}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
