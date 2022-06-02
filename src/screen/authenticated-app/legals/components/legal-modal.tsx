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
import { useLegalModal, useLegalsQueryKey } from "../util";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { LegalCategory, LegalsResult } from "types/legal";
import { useAddLegal, useEditLegal } from "service/legal";
import { RichTextEditor } from "components/rich-text-editor";
import { useQueryClient } from "react-query";
import { LegalItem } from "../../../../types/legal";
import useDeepCompareEffect from "use-deep-compare-effect";
import moment from "moment";

export const LegalModal = ({
  categoryList,
}: {
  categoryList: LegalCategory[];
}) => {
  const [form] = useForm();

  const { legalModalOpen, editingLegalId, close } = useLegalModal();

  const useMutationLegal = editingLegalId ? useEditLegal : useAddLegal;
  const editingLegalForm = useEditingLegalForm(editingLegalId);
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationLegal(useLegalsQueryKey());
  const [content, setContent] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const closeModal = () => {
    form.resetFields();
    setContent("");
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      const { image, effective_time, promulgation_time, ...restFieldsValue } =
        form.getFieldsValue();
      await mutateAsync({
        id: editingLegalId || "",
        content,
        image: image.length ? image[0].url : "",
        effective_time: effective_time
          ? `${Math.floor(effective_time.valueOf() / 1000)}`
          : "",
        promulgation_time: promulgation_time
          ? `${Math.floor(promulgation_time.valueOf() / 1000)}`
          : "",
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingLegalForm) {
      const {
        image,
        content,
        effective_time,
        promulgation_time,
        ...restFieldsValue
      } = editingLegalForm;
      form.setFieldsValue({
        image: [{ url: image }],
        effective_time: effective_time
          ? moment(Number(effective_time) * 1000)
          : undefined,
        promulgation_time: promulgation_time
          ? moment(Number(promulgation_time) * 1000)
          : undefined,
        ...restFieldsValue,
      });
      setContent(content);
    }
  }, [form, editingLegalForm]);

  return (
    <Drawer
      title={editingLegalId ? "编辑文章" : "新增文章"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={legalModalOpen}
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
              label="文章标题"
              rules={[{ required: true, message: "请输入文章标题" }]}
            >
              <Input placeholder="请输入文章标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="category_id" label="文章分类">
              <Select placeholder="请选择文章分类">
                {categoryList?.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="文章排序" name="sort">
              <Input placeholder="请输入文章排序" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="生效时间" name="effective_time">
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
                placeholder="请选择生效时间"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="颁布时间" name="promulgation_time">
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
                placeholder="请选择颁布时间"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="image"
          label="分享图片"
          rules={[{ required: true, message: "请上传分享图片" }]}
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
        <Form.Item label="文章内容" tooltip="排版自定义规则">
          <RichTextEditor content={content} setContent={setContent} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const useEditingLegalForm = (editingLegalId: string) => {
  const queryClient = useQueryClient();
  const legalsResult: LegalsResult | undefined = queryClient.getQueryData(
    useLegalsQueryKey()
  );
  const currentLegal = legalsResult
    ? legalsResult.list.find((item) => item.id === editingLegalId)
    : undefined;

  const editingLegalForm: LegalItem | undefined = currentLegal?.image
    ? currentLegal
    : undefined;
  return editingLegalForm;
};
