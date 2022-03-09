import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useQueryClient } from "react-query";
import {
  ApplicationsResult,
  LevelOption,
  ApplicationForm,
} from "types/application";
import { useApplicationModal, useApplicationsQueryKey } from "../util";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";

export const ApplicationModal = ({
  levelOptions,
}: {
  levelOptions: LevelOption[];
}) => {
  const [form] = useForm();

  const { applicationModalOpen, editingApplicationId, close } =
    useApplicationModal();
  const editingApplicationForm =
    useEditingApplicationForm(editingApplicationId);

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const submit = () => {
    console.log(form.getFieldsValue());
    // form.validateFields().then(() => {
    //   console.log(form.getFieldsValue());
    // });
  };

  useEffect(() => {
    form.setFieldsValue(editingApplicationForm);
  }, [form, editingApplicationForm]);

  return (
    <Drawer
      title={editingApplicationId ? "编辑申请列表" : "新增申请列表"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={applicationModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Divider orientation="left">企业信息</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="company_name"
              label="企业名称"
              rules={[{ required: true, message: "请输入企业名称" }]}
            >
              <Input placeholder="请输入企业名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="website_url"
              label="网站（app）名称"
              rules={[{ required: true, message: "请输入网站(app)名称" }]}
            >
              <Input placeholder="请输入网站(app)名称" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ICP"
              label="ICP备案号"
              rules={[{ required: true, message: "请输入ICP备案号" }]}
            >
              <Input placeholder="请输入ICP备案号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="company_type"
              label="企业类型（可多选）"
              rules={[{ required: true, message: "请选择企业类型" }]}
            >
              <Select placeholder="请选择企业类型" mode="tags" showArrow>
                {["第三方平台", "自营平台", "非平台"].map((item) => (
                  <Select.Option key={item}>{item}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="website_type"
              label="网站电子商务类型（可多选）"
              rules={[{ required: true, message: "请选择网站电子商务类型" }]}
            >
              <Select
                placeholder="请选择网站电子商务类型"
                mode="tags"
                showArrow
              >
                {["B2B", "B2C", "C2C", "G2C", "其他"].map((item) => (
                  <Select.Option key={item}>{item}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="staff_count"
              label="员工人数"
              rules={[{ required: true, message: "请输入员工人数" }]}
            >
              <Input placeholder="请输入员工人数" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gang_count"
              label="党员人数"
              rules={[{ required: true, message: "请输入党员人数" }]}
            >
              <Input placeholder="请输入党员人数" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trade_commodity"
              label="交易商品（服务）"
              rules={[{ required: true, message: "请输入交易商品（服务）" }]}
            >
              <Input placeholder="请输入交易商品（服务）" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="member_count" label="注册会员数量（个）">
              <Input placeholder="请输入注册会员数量" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trade_commodity"
              label="平台网站内经营者数量（个）"
            >
              <Input placeholder="请输入平台网站内经营者数量" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="trade_count"
              label="上年交易笔数（笔）"
              rules={[{ required: true, message: "请输入上年交易笔数" }]}
            >
              <Input placeholder="请输入上年交易笔数" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trade_amount"
              label="上年交易额（元）"
              rules={[{ required: true, message: "请输入上年交易额" }]}
            >
              <Input placeholder="请输入上年交易额" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="member_level" label="企业等级名称">
              <Select placeholder="请选择企业等级名称">
                {levelOptions.map(({ id, level, name }) => (
                  <Select.Option key={id} value={level}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="license"
          label="企业营业执照或副本"
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "请上传企业营业执照或副本" }]}
        >
          <OssUpload />
        </Form.Item>
        <Divider orientation="left">负责人信息</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="_name"
              label="姓名"
              rules={[{ required: true, message: "请输入负责人姓名" }]}
            >
              <Input placeholder="请输入负责人姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="job_title"
              label="职务"
              rules={[{ required: true, message: "请输入负责人职务" }]}
            >
              <Input placeholder="请输入负责人职务" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="political_status"
              label="政治面貌"
              rules={[{ required: true, message: "请输入负责人政治面貌" }]}
            >
              <Input placeholder="请输入负责人政治面貌" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="_mobile"
              label="手机"
              rules={[{ required: true, message: "请输入负责人手机号" }]}
            >
              <Input placeholder="请输入负责人手机号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="_email"
              label="邮箱"
              rules={[{ required: true, message: "请输入负责人邮箱" }]}
            >
              <Input placeholder="请输入负责人邮箱" />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left">联系人信息</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contacter_name"
              label="姓名"
              rules={[{ required: true, message: "请输入联系人姓名" }]}
            >
              <Input placeholder="请输入联系人姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contacter_job_title"
              label="职务"
              rules={[{ required: true, message: "请输入联系人职务" }]}
            >
              <Input placeholder="请输入联系人职务" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contacter_mobile"
              label="手机"
              rules={[{ required: true, message: "请输入联系人手机号" }]}
            >
              <Input placeholder="请输入联系人手机号" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

const useEditingApplicationForm = (editingApplicationId: string) => {
  const queryClient = useQueryClient();
  const applicationsResult: ApplicationsResult | undefined =
    queryClient.getQueryData(useApplicationsQueryKey());
  const currentApplication = applicationsResult
    ? applicationsResult.list.find((item) => item.id === editingApplicationId)
    : undefined;
  const formList = currentApplication
    ? JSON.parse(currentApplication?.apply_content_json)
    : [];
  const list: string[][] = [];
  formList.forEach((item: { title: string; name: string; value: string }) => {
    list.push([item.name, item.value]);
  });
  const originForm = Object.fromEntries(list);

  const license: { [key in string]: string }[] = [];
  if (originForm.license) {
    const imgs = originForm.license.split(",");
    imgs.forEach((item: string) => {
      license.push({ url: item });
    });
  }

  const editingApplicationForm: ApplicationForm | undefined =
    originForm.company_type
      ? {
          ...originForm,
          license,
          company_type: originForm.company_type.split(","),
          website_type: originForm.website_type.split(","),
          member_level: Number(currentApplication?.level_id),
        }
      : undefined;
  return editingApplicationForm;
};
