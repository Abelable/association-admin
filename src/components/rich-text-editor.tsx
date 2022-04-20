import styled from "@emotion/styled";
import { useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useOssConfig } from "service/common";

export const RichTextEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: any) => void;
}) => {
  const quillRef: any = useRef(null);
  const { data: ossConfig } = useOssConfig();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ header: 1 }, { header: 2 }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
        ],
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = async () => {
              try {
                const file = input.files ? input.files[0] : null;
                const suffix =
                  file?.name.slice(file.name.lastIndexOf(".")) || "";
                const filename = Date.now() + suffix;

                const formData = new FormData();
                formData.append("key", `${ossConfig?.dir}${filename}`);
                formData.append("dir", ossConfig?.dir || "");
                formData.append("policy", ossConfig?.policy || "");
                formData.append(
                  "OSSAccessKeyId",
                  ossConfig?.OSSAccessKeyId || ""
                );
                formData.append("success_action_status", "200");
                formData.append("signature", ossConfig?.signature || "");
                formData.append("file", file || "", filename);

                await window.fetch(`https:${ossConfig?.host}`, {
                  method: "POST",
                  body: formData,
                });

                const url = `https:${ossConfig?.host}/${ossConfig?.dir}${filename}`;
                const quillEditor = quillRef.current.getEditor();
                const range = quillEditor.getSelection();
                const index = range ? range.index : 0;
                quillEditor.insertEmbed(index, "image", url);
                quillEditor.setSelection(index + 1);
              } catch (err) {
                console.error(err);
              }
            };
          },
        },
      },
    }),
    [ossConfig]
  );

  return (
    <Editor
      ref={quillRef}
      theme="snow"
      modules={modules}
      value={content}
      onChange={setContent}
    />
  );
};

const Editor = styled(ReactQuill)`
  > .ql-container.ql-snow {
    min-height: 30rem;
  }
`;
