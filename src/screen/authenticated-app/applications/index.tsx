import styled from "@emotion/styled";
import { Button, Drawer, Spin, message } from "antd";
import { Row } from "components/lib";
import { useState, useEffect } from "react";
import {
  useApplications,
  useDealApplications,
  useLevelOptions,
  useCreateCertificate,
} from "service/application";
import { toNumber } from "utils";
import { ApplicationModal } from "./components/application-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useApplicationsQueryKey, useApplicationsSearchParams } from "./util";
import { codeBg, drawText } from "./canvas";
import { useOssConfig2 } from "service/common";
let codeId: string = "";
let codeFile: any = null;
export const Applications = () => {
  const statusOptions = [
    { id: 1, name: "待处理", value: "0" },
    { id: 2, name: "已处理", value: "1" },
    { id: 3, name: "已驳回", value: "2" },
  ];
  const categoryOptions = [
    {
      text: "计算应用类",
      value: 1,
      subOptions: [
        { text: "SAAS系统", value: 1 },
        { text: "创新技术", value: 2 },
        { text: "大数据", value: 3 },
        { text: "工业互联网", value: 4 },
        { text: "技术服务", value: 5 },
        { text: "开发工具", value: 6 },
        { text: "行业综合服务", value: 7 },
        { text: "云计算", value: 8 },
        { text: "综合类", value: 9 },
      ],
    },
    {
      text: "网络销售类",
      value: 2,
      subOptions: [
        { text: "MCN机构", value: 1 },
        { text: "跨境", value: 2 },
        { text: "农业", value: 3 },
        { text: "商品交易", value: 4 },
        { text: "专业商品", value: 5 },
        { text: "综合类", value: 6 },
      ],
    },
    {
      text: "生活服务类",
      value: 3,
      subOptions: [
        { text: "交通出行", value: 1 },
        { text: "教育培训", value: 2 },
        { text: "配送服务", value: 3 },
        { text: "人才服务", value: 4 },
        { text: "技术服务", value: 5 },
        { text: "生活服务", value: 6 },
        { text: "市场服务", value: 7 },
        { text: "文化旅游", value: 8 },
        { text: "医疗健康", value: 9 },
        { text: "运输物流", value: 10 },
      ],
    },
    {
      text: "社交娱乐类",
      value: 4,
      subOptions: [
        { text: "社交", value: 1 },
        { text: "视频直播", value: 2 },
        { text: "综合类", value: 3 },
      ],
    },
    { text: "金融服务类", value: 2 },
    { text: "信息资讯类", value: 6 },
    { text: "其他类", value: 7 },
  ];
  const evaluationOptions = [
    { name: "上市", value: "1" },
    { name: "荣誉", value: "2" },
    { name: "独角兽", value: "3" },
  ];
  const [params, setParams] = useApplicationsSearchParams();
  const { data, isLoading, error } = useApplications(params);
  const { data: levelOptions } = useLevelOptions();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [codeLoading, setCodeLoading] = useState(false);
  const { mutate: dealApplications } = useDealApplications(
    useApplicationsQueryKey()
  );
  const { mutateAsync: createCertificate } = useCreateCertificate(
    useApplicationsQueryKey()
  );

  const { mutate: getOssConfig, data: dataOssConfig } = useOssConfig2();
  const exportApplications = (ids: string[]) => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/api/admin/enter-apply/export?ids=${ids.join()}`;
  };
  const createCertificateFn = async (
    certificate_status: string,
    imgUrl: string
  ) => {
    await createCertificate({
      id: codeId,
      url: imgUrl,
      certificate_status: certificate_status,
    });
    message.success("操作成功");
    setCodeLoading(false);
  };
  useEffect(() => {
    if (dataOssConfig) {
      const suffix = codeFile?.name.slice(codeFile.name.lastIndexOf(".")) || "";
      const filename = Date.now() + suffix;
      const formData = new FormData();
      formData.append("key", dataOssConfig.dir + filename);
      formData.append("OSSAccessKeyId", dataOssConfig.OSSAccessKeyId);
      formData.append("success_action_status", "200");
      formData.append("policy", dataOssConfig.policy);
      formData.append("Signature", dataOssConfig.signature);
      formData.append("file", codeFile);
      let url = `https:${dataOssConfig?.host}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.status === 200) {
            let imgUrl = url + "/" + dataOssConfig.dir + filename;
            createCertificateFn("1", imgUrl);
          } else {
            message.info("上传失败");
            setCodeLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          message.info("上传失败!");
          setCodeLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataOssConfig]);

  const dataURLtoFile = (url: string) => {
    try {
      var arr = url.split(",") || [];
      var mime = "data:image/png;base64";
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let file = new File([u8arr], new Date().valueOf() + ".png", {
        type: mime,
      });
      codeFile = file;
      getOssConfig();
    } catch (e) {
      setCodeLoading(false);
      message.info("图片转文件失败");
    }
  };
  const editCode = (obj: {
    id: string;
    number: string;
    company_name: string;
    certificate_status: string;
  }) => {
    codeId = obj.id;
    if (obj.certificate_status === "-1") {
      createCertificateFn("-1", "");
      return false;
    }
    setCodeLoading(true);
    let width = 1240;
    let height = 1754;
    let codeCanvas: any = document.getElementById("codeCanvas");
    codeCanvas.width = width;
    codeCanvas.height = height;
    let context: any = codeCanvas.getContext("2d");
    var imageBg = new Image();
    imageBg.setAttribute("crossOrigin", "anonymous");
    imageBg.src = codeBg;
    imageBg.onload = () => {
      context.drawImage(imageBg, 0, 0, width, height, 0, 0, width, height);
      drawText(
        context,
        false,
        obj.company_name + "：",
        158,
        768,
        925,
        58,
        "#000",
        65,
        3,
        0,
        1,
        (row: any, width: any) => {
          let lineTop = 768 + 97;
          if (row.length === 1) {
            drawText(
              context,
              true,
              obj.company_name + "：",
              158,
              768,
              925,
              58,
              "#000",
              65,
              3,
              0,
              1,
              (row: any, width: any) => {}
            );
          }
          if (row.length === 2) {
            drawText(
              context,
              true,
              obj.company_name + "：",
              158,
              768 - 33,
              925,
              58,
              "#000",
              65,
              3,
              0,
              1,
              (row: any, width: any) => {}
            );
            lineTop = 768 + 97 - 33 + 65;
          }
          if (row.length === 3) {
            drawText(
              context,
              true,
              obj.company_name + "：",
              158,
              768 - 65,
              925,
              58,
              "#000",
              65,
              3,
              0,
              1,
              (row: any, width: any) => {}
            );
            lineTop = 768 + 97 - 65 + 65 * 2;
          }
          context.lineWidth = 2;
          context.strokeStyle = "#000";
          context.moveTo(158, lineTop);
          context.lineTo(158 + (width > 935 ? 935 : width), lineTop);
          context.stroke();
        }
      );
      drawText(
        context,
        true,
        "ZNBA 2022 " + obj.number,
        437,
        1064,
        682,
        40,
        "#000",
        34,
        1,
        0,
        1,
        () => {}
      );
      var dataurl = codeCanvas.toDataURL("image/png");
      dataURLtoFile(dataurl);
    };
    imageBg.onerror = (e) => {
      console.log(e);
      setCodeLoading(false);
      message.info("加载背景图失败");
    };
  };
  return (
    <Container drawerVisible={!!selectedRowKeys.length}>
      {codeLoading ? (
        <div
          style={{
            position: "fixed",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "200",
            background: "rgba(255,255,255,.3)",
          }}
        >
          <Spin tip="生成中..."></Spin>
        </div>
      ) : null}
      {/* alfont需要先用到用哪都行 生成的CANVAS才拿的到 */}
      <div
        style={{
          height: "1px",
          width: "1px",
          overflow: "hidden",
          fontFamily: "alfont",
        }}
      >
        <canvas
          id="codeCanvas"
          style={{ width: "1240px", height: "1754px" }}
        ></canvas>
      </div>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          evaluationOptions={evaluationOptions}
          levelOptions={levelOptions || []}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          statusOptions={statusOptions}
          evaluationOptions={evaluationOptions}
          levelOptions={levelOptions || []}
          params={params}
          setParams={setParams}
          setSelectedRowKeys={setSelectedRowKeys}
          dealApplications={dealApplications}
          exportApplications={exportApplications}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
          editCode={editCode}
        />
      </Main>
      <ApplicationModal
        categoryOptions={categoryOptions}
        levelOptions={levelOptions || []}
        evaluationOptions={evaluationOptions}
      />
      <Drawer
        visible={!!selectedRowKeys.length}
        style={{ position: "absolute" }}
        height={"8rem"}
        placement="bottom"
        mask={false}
        getContainer={false}
        closable={false}
      >
        <Row between={true}>
          <div>
            已选择 <SelectedCount>{selectedRowKeys.length}</SelectedCount> 项
          </div>
          <Row gap={true}>
            <Button onClick={() => dealApplications(selectedRowKeys)}>
              批量处理
            </Button>
            <Button
              onClick={() => exportApplications(selectedRowKeys)}
              type={"primary"}
              style={{ marginRight: 0 }}
            >
              批量导出
            </Button>
          </Row>
        </Row>
      </Drawer>
    </Container>
  );
};

const Container = styled.div<{ drawerVisible: boolean }>`
  position: relative;
  padding-bottom: ${(props) => (props.drawerVisible ? "8rem" : 0)};
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;

const SelectedCount = styled.span`
  color: #1890ff;
  font-weight: 600;
`;
