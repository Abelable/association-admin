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
import { useTalentModal, useTalentsQueryKey } from "../util";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { cleanObject } from "utils";
import {
  CategoryOption,
  ExpertOption,
  GenderOption,
  TalentForm,
  TalentItem,
  TalentsResult,
} from "types/talent";
import { useAddTalent, useEditTalent } from "service/talents";

export const TalentModal = ({
  genderOptions,
  categoryOptions,
  expertOptions,
}: {
  genderOptions: GenderOption[];
  categoryOptions: CategoryOption[];
  expertOptions: ExpertOption[];
}) => {
  const [form] = useForm();

  const { talentModalOpen, editingTalentId, close } = useTalentModal();
  const editingTalentForm = useEditingTalentForm(editingTalentId);

  const useMutationTalent = editingTalentId ? useEditTalent : useAddTalent;
  const { mutateAsync, error, isLoading } = useMutationTalent(
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
        image,
        name,
        sex,
        id_number,
        political_status,
        graduated_school,
        profession,
        expert_intent_id,
        talent_classification,
        score,
        introduction,
        employer,
        department,
        position,
        work_time,
        work_experience,
        honor,
        professional_qualification,
        mobile,
        telephone,
        email,
        fax,
        wechat,
        QQ,
        address,
      } = form.getFieldsValue();
      console.log("expert_intent_id", expert_intent_id);

      const imageList: any[] = [];
      image && image.forEach((item: any) => imageList.push(item.url));

      const applyContent = [
        { title: "图片", name: "image", value: imageList.join() },
        { title: "姓名", name: "name", value: name },
        { title: "性别", name: "sex", value: sex },
        { title: "身份证号码", name: "id_number", value: id_number },
        {
          title: "政治面貌",
          name: "political_status",
          value: political_status,
        },
        {
          title: "毕业院校",
          name: "graduated_school",
          value: graduated_school,
        },
        { title: "学历及专业", name: "profession", value: profession },
        { title: "入库意向", name: "inventory_ntention", value: "专家库" },
        {
          title: "专家库意向",
          name: "expert_intent_id",
          value: expert_intent_id ? expert_intent_id.join() : "",
        },
        {
          title: "人才分类",
          name: "talent_classification",
          value: talent_classification,
        },
        { title: "评分", name: "score", value: score },
        { title: "人才介绍", name: "introduction", value: introduction },
        { title: "工作单位", name: "employer", value: employer },
        { title: "部门", name: "department", value: department },
        { title: "现任职务", name: "position", value: position },
        { title: "参加工作时间", name: "work_time", value: work_time },
        { title: "工作经历", name: "work_experience", value: work_experience },
        { title: "所获荣誉以及网监专长", name: "honor", value: honor },
        {
          title: "已有职业资格",
          name: "professional_qualification",
          value: professional_qualification,
        },
        { title: "手机号", name: "mobile", value: mobile },
        { title: "固话", name: "telephone", value: telephone },
        { title: "电子邮件", name: "email", value: email },
        { title: "传真", name: "fax", value: fax },
        { title: "微信号", name: "wechat", value: wechat },
        { title: "QQ", name: "QQ", value: QQ },
        { title: "通讯地址", name: "address", value: address },
      ];

      const talentItem: Partial<TalentItem> = cleanObject({
        id: editingTalentId || undefined,
        apply_content_json: JSON.stringify(applyContent),
      });
      await mutateAsync(talentItem);
      closeModal();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTalentForm);
  }, [form, editingTalentForm]);

  return (
    <Drawer
      title={editingTalentId ? "编辑人才申报" : "新增人才申报"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={talentModalOpen}
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
          <OssUpload maxCount={1} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="姓名">
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sex" label="性别">
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
            <Form.Item name="id_number" label="身份证号">
              <Input placeholder="请输入身份证号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="political_status" label="政治面貌">
              <Input placeholder="请输入政治面貌" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="graduated_school" label="毕业院校">
              <Input placeholder="请输入毕业院校" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="profession" label="学历及专业">
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
            <Form.Item name="employer" label="工作单位">
              <Input placeholder="请输入工作单位" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="department" label="具体工作部门或所">
              <Input placeholder="请输入具体工作部门或所" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="position" label="现任职务">
              <Input placeholder="请输入现任职务" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="work_time" label="参加工作日期">
              <Input placeholder="请输入参加工作日期" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="work_experience" label="工作经历">
          <Input.TextArea rows={4} placeholder="请输入工作经历" />
        </Form.Item>
        <Form.Item name="honor" label="所获荣誉以及网监专长">
          <Input.TextArea rows={4} placeholder="请输入所获荣誉以及网监专长" />
        </Form.Item>
        <Form.Item name="professional_qualification" label="已有职业资格">
          <Input.TextArea rows={4} placeholder="请输入已有职业资格" />
        </Form.Item>
        <Divider orientation="left">联系方式</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="mobile" label="手机号">
              <Input placeholder="请输入手机号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="telephone" label="固话">
              <Input placeholder="请输入固话" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="email" label="电子邮箱">
              <Input placeholder="请输入电子邮箱" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fax" label="传真">
              <Input placeholder="请输入传真" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="wechat" label="微信号">
              <Input placeholder="请输入微信号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="QQ" label="QQ">
              <Input placeholder="请输入QQ" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="address" label="通讯地址">
          <Input.TextArea rows={4} placeholder="请输入通讯地址" />
        </Form.Item>
        <Divider orientation="left">人才评价</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="talent_classification" label="人才分类">
              <Select placeholder="请选择人才分类">
                {categoryOptions.map(({ id, name }) => (
                  <Select.Option key={id}>{name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="score" label="评分">
              <Input placeholder="请输入评分" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="introduction" label="人才介绍">
          <Input.TextArea rows={4} placeholder="请输入人才介绍" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const useEditingTalentForm = (editingTalentId: string) => {
  const queryClient = useQueryClient();
  const talentsResult: TalentsResult | undefined = queryClient.getQueryData(
    useTalentsQueryKey()
  );
  const currentTalent = talentsResult
    ? talentsResult.list.find((item) => item.id === editingTalentId)
    : undefined;
  const formList = currentTalent
    ? JSON.parse(currentTalent?.apply_content_json)
    : [];
  const list: string[][] = [];
  formList.forEach((item: { title: string; name: string; value: string }) => {
    list.push([item.name, item.value]);
  });
  const originForm = Object.fromEntries(list);

  const image: { [key in string]: string }[] = [];
  if (originForm.image) {
    const imgs = originForm.image.split(",");
    imgs.forEach((item: string) => {
      image.push({ url: item });
    });
  }

  const editingTalentForm: TalentForm | undefined = originForm.expert_intent_id
    ? {
        ...originForm,
        image,
        expert_intent_id: originForm.expert_intent_id.split(","),
        sex: `${originForm.sex}`,
        talent_classification: `${currentTalent?.talent_classification}`,
      }
    : undefined;
  console.log(editingTalentForm);
  return editingTalentForm;
};
