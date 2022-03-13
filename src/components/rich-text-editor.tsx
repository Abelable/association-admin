import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useOssConfig } from "service/common";
import { http } from "service/http";

interface RichTextEditorProps extends React.ComponentProps<typeof ReactQuill> {}

export const RichTextEditor = (props: RichTextEditorProps) => {
  const [text, setText] = useState("");
  const quillRef: any = useRef(null);
  const { data: ossConfig } = useOssConfig();

  // 配置toolbar
  const toolbarContainer = [
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ font: [] }],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image", "link"],
    ["clean"],
  ];

  const showImageUI = () => {
    const quillEditor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      try {
        const file = input.files ? input.files[0] : null;
        const fileName = file?.name;

        const formData = new FormData();
        formData.append("key", `website/${ossConfig?.dir}/${fileName}`);
        formData.append("dir", ossConfig?.dir || "");
        formData.append("policy", ossConfig?.policy || "");
        formData.append("OSSAccessKeyId", ossConfig?.OSSAccessKeyId || "");
        formData.append("success_action_status", "200");
        formData.append("signature", ossConfig?.signature || "");
        formData.append("file", file || "", fileName);

        const host = ossConfig?.host.replace("http", "https") || "";
        // 上传 ossConfig
        await http(host, { data: formData, method: "POST" });
        const url = `${host}/website/${ossConfig?.dir}/${fileName}`;
        const range = quillEditor.getSelection();
        quillEditor.insertEmbed(range.index, "image", url);
      } catch (err) {
        console.error(err);
      }
    };
  };

  // 重新上传图片
  const modules = {
    toolbar: {
      container: toolbarContainer,
      handlers: {
        image: showImageUI,
      },
    },
  };

  // 为啥这边要价格setTimeout呢？因为不加的话会有抖动效果
  const handleTextChange = (textTyped: any) => {
    setTimeout(() => {
      setText(textTyped);
    }, 10);
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      value={text}
      onChange={() => handleTextChange}
      {...props}
    />
  );
};
