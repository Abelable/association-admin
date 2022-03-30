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
import { ExpertOption } from "types/talent";

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
      const { image } = form.getFieldsValue();

      const applyContent = [
        { title: "图片", name: "image", value: image },
        { title: "姓名", name: "name", value: "张三" },
        { title: "工作单位", name: "employer", value: "有播" },
        {
          title: "部门",
          name: "department",
          value: "技术部",
        },

        {
          title: "政治面貌",
          name: "political_status",
          value: "群众",
        },
        {
          title: "参加工作时间",
          name: "work_time",
          value: "2020-12",
        },
        {
          title: "身份证号码",
          name: "id_number",
          value: "330514895484844",
        },
        {
          title: "性别",
          name: "sex",
          value: "男",
        },
        {
          title: "现任职务",
          name: "position",
          value: "开发",
        },
        {
          title: "入库意向",
          name: "inventory_ntention",
          value: "专家库",
        },
        {
          title: "专家库意向",
          name: "expert_intent_id",
          value: "2",
        },
        {
          title: "固话",
          name: "telephone",
          value: "89574686",
        },
        {
          title: "移动电话",
          name: "mobile",
          value: "13578948877",
        },
        {
          title: "传真",
          name: "fax",
          value: "445566",
        },
        {
          title: "电子邮件",
          name: "email",
          value: "478499554@qq.com",
        },
        {
          title: "QQ",
          name: "QQ",
          value: "478499554",
        },
        {
          title: "微信号",
          name: "wechat",
          value: "445566",
        },
        {
          title: "毕业院校",
          name: "graduated_school",
          value: "厦大",
        },
        {
          title: "学历及专业",
          name: "profession",
          value: "计算机",
        },
        {
          title: "工作经历",
          name: "work_experience",
          value: "上过班",
        },
        {
          title: "所获荣誉以及网监专长",
          name: "honor",
          value: "三好学生",
        },
        {
          title: "已有职业资格",
          name: "professional_qualification",
          value: "厨师证",
        },
        {
          title: "通讯地址",
          name: "address",
          value: "杭州",
        },
      ];

      const applicationItem: Partial<ApplicationsItem> = cleanObject({
        id: editingApplicationId || undefined,
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
        <Form.Item
          name="image"
          label="添加照片"
          tooltip="照片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <OssUpload />
        </Form.Item>
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="id_number"
              label="身份证号"
              rules={[{ required: true, message: "请输入身份证号" }]}
            >
              <Input placeholder="请输入身份证号" />
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
              name="graduated_school"
              label="毕业院校"
              rules={[{ required: true, message: "请输入毕业院校" }]}
            >
              <Input placeholder="请输入毕业院校" />
            </Form.Item>
          </Col>
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="expert_intent_id"
              tooltip="最多选择两项"
              label="专家库意向"
              rules={[{ required: true, message: "请选择专家库意向" }]}
            >
              <Select placeholder="请选择专家库意向" mode="tags" showArrow>
                {expertOptions.map((item) => (
                  <Select.Option key={item.id}>{item.title}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left">工作履历</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="employer"
              label="工作单位"
              rules={[{ required: true, message: "请输入工作单位" }]}
            >
              <Input placeholder="请输入工作单位" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="department"
              label="具体工作部门或所"
              rules={[{ required: true, message: "请输入具体工作部门或所" }]}
            >
              <Input placeholder="请输入具体工作部门或所" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="position"
              label="现任职务"
              rules={[{ required: true, message: "请输入现任职务" }]}
            >
              <Input placeholder="请输入现任职务" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="work_time"
              label="参加工作日期"
              rules={[{ required: true, message: "请输入参加工作日期" }]}
            >
              <Input placeholder="请输入参加工作日期" />
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
        <Divider orientation="left">联系方式</Divider>
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
              name="email"
              label="电子邮箱"
              rules={[{ required: true, message: "请输入电子邮箱" }]}
            >
              <Input placeholder="请输入电子邮箱" />
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
              name="wechat"
              label="微信号"
              rules={[{ required: true, message: "请输入微信号" }]}
            >
              <Input placeholder="请输入微信号" />
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
        <Form.Item
          name="address"
          label="通讯地址"
          rules={[{ required: true, message: "请输入通讯地址" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入通讯地址" />
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
