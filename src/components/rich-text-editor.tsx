import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const RichTextEditor = () => {
  const [text, setText] = useState("");
  const quillRef: any = useRef(null);

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
    ["image", "video", "link"],

    ["clean"],
  ];

  const showImageUI = () => {
    const quillEditor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      // try {
      //   // 获取 signature
      //   const res = await fetchSignature();
      //   if (!res.success) return;
      //   const oss = res.data;
      //   const file = input.files[0];
      //   let formData = new FormData();
      //   const fileName = file.name;
      //   formData.append('key', `website/${oss['dir']}/${fileName}`);
      //   formData.append('dir', oss['dir']);
      //   formData.append('policy', oss['policy']);
      //   formData.append('OSSAccessKeyId', oss['accessid']);
      //   formData.append('success_action_status', '200');
      //   formData.append('signature', oss['signature']);
      //   formData.append('file', file, fileName);
      //   const host = oss.host.replace('http', 'https');
      //   // 上传 oss
      //   await axios.post(host, formData);
      //   const url = `${host}/website/${oss['dir']}/${fileName}`;
      //   const range = quillEditor.getSelection();
      //   quillEditor.insertEmbed(range.index, 'image', url);
      // } catch (err) {
      //   console.error(err);
      // }
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
    />
  );
};
