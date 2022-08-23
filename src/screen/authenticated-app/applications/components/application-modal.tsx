import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useForm } from "antd/lib/form/Form";
import { cleanObject } from "utils";
import { useAddApplication, useEditApplication } from "service/application";
import { useApplicationModal, useApplicationsQueryKey } from "../util";

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
  Cascader,
} from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { Map } from "components/map";
import { useState } from "react";
import options from "utils/cascader-address-options";

import {
  ApplicationsResult,
  LevelOption,
  ApplicationForm,
  ApplicationsItem,
  EvaluationOption,
} from "types/application";

export const ApplicationModal = ({
  levelOptions,
  evaluationOptions,
}: {
  levelOptions: LevelOption[];
  evaluationOptions: EvaluationOption[];
}) => {
  const [form] = useForm();

  const [lng, setLng] = useState<undefined | number>(120);
  const [lat, setLat] = useState<undefined | number>(30);

  const { applicationModalOpen, editingApplicationId, close } =
    useApplicationModal();
  const editingApplicationForm =
    useEditingApplicationForm(editingApplicationId);

  const useMutationApplication = editingApplicationId
    ? useEditApplication
    : useAddApplication;
  const { mutateAsync, error, isLoading } = useMutationApplication(
    useApplicationsQueryKey()
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
        staff_count,
        gang_count,
        revenue,
        trade_amount,
        _name,
        job_title,
        political_status,
        _mobile,
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
        { title: "上年度GMV", name: "trade_amount", value: trade_amount },
        { title: "上年度营收", name: "revenue", value: revenue },
        { title: "员工人数", name: "staff_count", value: staff_count },
        { title: "党员人数", name: "gang_count", value: gang_count },
        { title: "负责人姓名", name: "_name", value: _name },
        { title: "职务", name: "job_title", value: job_title },
        {
          title: "政治面貌",
          name: "political_status",
          value: political_status,
        },
        { title: "手机号", name: "_mobile", value: _mobile },
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

  useDeepCompareEffect(() => {
    form.setFieldsValue(editingApplicationForm);
  }, [form, editingApplicationForm]);

  return (
    <Drawer
      title={editingApplicationId ? "编辑入会申请" : "新增入会申请"}
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
              name="short_name"
              label="企业简称"
              rules={[{ required: true, message: "请输入企业简称" }]}
            >
              <Input placeholder="请输入企业简称" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="region"
              label="企业所在地区"
              rules={[{ required: true, message: "请选择企业所在地区" }]}
            >
              <Cascader options={options} placeholder="请选择企业所在地区" />
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
                {[
                  "网络销售类平台",
                  "生活服务类平台",
                  "社交娱乐类平台",
                  "信息资讯类平台",
                  "金融服务类平台",
                  "计算机应用类平台",
                  "其它类",
                ].map((item) => (
                  <Select.Option key={item}>{item}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="trade_amount"
              label="上年度GMV（元）"
              rules={[{ required: true, message: "请输入上年度GMV" }]}
            >
              <Input placeholder="请输入上年度GMV" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="revenue"
              label="上年度营收（元）"
              rules={[{ required: true, message: "请输入上年度营收" }]}
            >
              <Input placeholder="请输入上年度营收" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="staff_count"
              label="员工人数"
              rules={[{ required: true, message: "请输入员工人数" }]}
            >
              <Input placeholder="请输入员工人数" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gang_count"
              label="党员人数"
              rules={[{ required: true, message: "请输入党员人数" }]}
            >
              <Input placeholder="请输入党员人数" />
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
          <Col span={12}>
            <Form.Item name="evaluation" label="企业评价">
              <Select placeholder="请选择企业评价">
                {evaluationOptions.map(({ name, value }) => (
                  <Select.Option key={value} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="license"
              label="企业营业执照或副本"
              tooltip="图片大小不能超过10MB"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "请上传企业营业执照或副本" }]}
            >
              <OssUpload maxCount={3} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="logo"
              label="企业logo"
              tooltip="图片大小不能超过10MB"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <OssUpload maxCount={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="企业所在经纬度" required>
              <Input.Group>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name="longitude"
                      rules={[{ required: true, message: "请输入经度" }]}
                    >
                      <Input placeholder="请输入经度" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name="latitude"
                      rules={[{ required: true, message: "请输入纬度" }]}
                    >
                      <Input placeholder="请输入纬度" />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
        <Map
          company={editingApplicationForm?.company_name}
          lng={lng}
          lat={lat}
          setLng={setLng}
          setLat={setLat}
        />
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
              rules={[
                {
                  pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                  message: "请输入正确的手机号",
                },
                { required: true, message: "请输入负责人手机号" },
              ]}
            >
              <Input placeholder="请输入负责人手机号" />
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
          member_level:
            Number(currentApplication?.level_id) === 0
              ? undefined
              : Number(currentApplication?.level_id),
        }
      : undefined;
  return editingApplicationForm;
};
