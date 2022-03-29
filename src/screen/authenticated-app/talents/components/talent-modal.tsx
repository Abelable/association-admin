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
  ApplicationForm,
  ApplicationsItem,
} from "types/application";
import { useApplicationModal, useTalentsQueryKey } from "../util";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { useAddApplication, useEditApplication } from "service/application";
import { ErrorBox } from "components/lib";
import { cleanObject } from "utils";
import { ExpertOption } from "types/talents";

export const TalentModal = ({
  expertOptions,
}: {
  expertOptions: ExpertOption[];
}) => {
  const genderOptions = [
    { value: 1, desc: "男" },
    { value: 2, desc: "女" },
  ];
  const [form] = useForm();

  const { applicationModalOpen, editingApplicationId, close } =
    useApplicationModal();
  const editingApplicationForm =
    useEditingApplicationForm(editingApplicationId);

  const useMutationApplication = editingApplicationId
    ? useEditApplication
    : useAddApplication;
  const { mutateAsync, error, isLoading } = useMutationApplication(
    useTalentsQueryKey()
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
      const {
        company_name,
        website_url,
        ICP,
        company_type,
        website_type,
        staff_count,
        gang_count,
        trade_commodity,
        member_count,
        operator_count,
        trade_count,
        trade_amount,
        _name,
        job_title,
        political_status,
        _mobile,
        _email,
        contacter_name,
        contacter_job_title,
        contacter_mobile,
        license,
        member_level,
      } = form.getFieldsValue();

      const licenseList: any[] = [];
      license.forEach((item: any) => licenseList.push(item.url));

      const applyContent = [
        { title: "企业名称", name: "company_name", value: company_name },
        { title: "网站（app）名称", name: "website_url", value: website_url },
        { title: "ICP备案号", name: "ICP", value: ICP },
        { title: "企业类型", name: "company_type", value: company_type.join() },
        {
          title: "网站电子商务类型",
          name: "website_type",
          value: website_type.join(),
        },
        { title: "员工人数", name: "staff_count", value: staff_count },
        { title: "党员人数", name: "gang_count", value: gang_count },
        {
          title: "交易商品（服务）",
          name: "trade_commodity",
          value: trade_commodity,
        },
        { title: "上年交易笔数", name: "trade_count", value: trade_count },
        { title: "上年交易额", name: "trade_amount", value: trade_amount },
        { title: "负责人姓名", name: "_name", value: _name },
        { title: "职务", name: "job_title", value: job_title },
        {
          title: "政治面貌",
          name: "political_status",
          value: political_status,
        },
        { title: "手机号", name: "_mobile", value: _mobile },
        { title: "邮箱", name: "_email", value: _email },
        {
          title: "协会联系人姓名",
          name: "contacter_name",
          value: contacter_name,
        },
        {
          title: "协会联系人职务",
          name: "contacter_job_title",
          value: contacter_job_title,
        },
        {
          title: "协会联系人手机号",
          name: "contacter_mobile",
          value: contacter_mobile,
        },
        {
          title: "企业营业执照或副本",
          name: "license",
          value: licenseList.join(),
        },
        { title: "注册会员数量", name: "member_count", value: member_count },
        {
          title: "平台网站内经营者数量",
          name: "operator_count",
          value: operator_count,
        },
        { title: "等级名称", name: "member_level", value: member_level || "" },
      ];

      const applicationItem: Partial<ApplicationsItem> = cleanObject({
        id: editingApplicationId || undefined,
        company_name,
        level_id: `${member_level}`,
        name: _name,
        mobile: _mobile,
        apply_content_json: JSON.stringify(applyContent),
      });
      await mutateAsync(applicationItem);
      closeModal();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingApplicationForm);
  }, [form, editingApplicationForm]);

  return (
    <Drawer
      title={editingApplicationId ? "编辑申报列表" : "新增申报列表"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={applicationModalOpen}
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
        <Divider orientation="left">个人信息</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: "请输入姓名" }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="employer"
              label="工作单位"
              rules={[{ required: true, message: "请输入工作单位" }]}
            >
              <Input placeholder="请输入工作单位" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="department"
              label="具体工作单位或所"
              rules={[{ required: true, message: "请输入具体工作单位或所" }]}
            >
              <Input placeholder="请输入具体工作单位或所" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="political_status"
              label="政治面貌"
              rules={[{ required: true, message: "请输入政治面貌" }]}
            >
              <Input placeholder="请输入政治面貌" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="work_time"
              label="参加工作日期"
              rules={[{ required: true, message: "请输入参加工作日期" }]}
            >
              <Input placeholder="请输入参加工作日期" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id_number"
              label="身份证号"
              rules={[{ required: true, message: "请输入身份证号" }]}
            >
              <Input placeholder="请输入身份证号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="website_type"
              label="性别"
              rules={[{ required: true, message: "请选择性别" }]}
            >
              <Select placeholder="请选择性别" showArrow>
                {genderOptions.map((item) => (
                  <Select.Option key={item.value}>{item.desc}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="position"
              label="现任职务"
              rules={[{ required: true, message: "请输入现任职务" }]}
            >
              <Input placeholder="请输入现任职务" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="expert_intent_id"
              tooltip="最多选择两项"
              label="专家意向库"
              rules={[{ required: true, message: "请选择专家意向库" }]}
            >
              <Select placeholder="请选择专家意向库" mode="tags" showArrow>
                {expertOptions.map((item) => (
                  <Select.Option key={item.id}>{item.title}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="telephone"
              label="固话"
              rules={[{ required: true, message: "请输入固话" }]}
            >
              <Input placeholder="请输入固话" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="mobile"
              label="移动电话"
              rules={[{ required: true, message: "请输入移动电话" }]}
            >
              <Input placeholder="请输入移动电话" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fax"
              label="传真"
              rules={[{ required: true, message: "请输入传真" }]}
            >
              <Input placeholder="请输入传真" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="电子邮箱"
              rules={[{ required: true, message: "请输入电子邮箱" }]}
            >
              <Input placeholder="请输入电子邮箱" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="QQ"
              label="QQ"
              rules={[{ required: true, message: "请输入QQ" }]}
            >
              <Input placeholder="请输入QQ" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="wechat"
              label="微信号"
              rules={[{ required: true, message: "请输入微信号" }]}
            >
              <Input placeholder="请输入微信号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="graduated_school"
              label="毕业院校"
              rules={[{ required: true, message: "请输入毕业院校" }]}
            >
              <Input placeholder="请输入毕业院校" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="profession"
              label="学历及专业"
              rules={[{ required: true, message: "请输入学历及专业" }]}
            >
              <Input placeholder="请输入学历及专业" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="work_experience"
          label="工作经历"
          rules={[{ required: true, message: "请输入工作经历" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入工作经历" />
        </Form.Item>
        <Form.Item
          name="honor"
          label="所获荣誉以及网监专长"
          rules={[{ required: true, message: "请输入所获荣誉以及网监专长" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入所获荣誉以及网监专长" />
        </Form.Item>
        <Form.Item
          name="professional_qualification"
          label="已有职业资格"
          rules={[{ required: true, message: "请输入已有职业资格" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入已有职业资格" />
        </Form.Item>
        <Form.Item
          name="address"
          label="通讯地址"
          rules={[{ required: true, message: "请输入通讯地址" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入通讯地址" />
        </Form.Item>
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
      </Form>
    </Drawer>
  );
};

const useEditingApplicationForm = (editingApplicationId: string) => {
  const queryClient = useQueryClient();
  const applicationsResult: ApplicationsResult | undefined =
    queryClient.getQueryData(useTalentsQueryKey());
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
          member_level:
            Number(currentApplication?.level_id) === 0
              ? undefined
              : Number(currentApplication?.level_id),
        }
      : undefined;
  return editingApplicationForm;
};
