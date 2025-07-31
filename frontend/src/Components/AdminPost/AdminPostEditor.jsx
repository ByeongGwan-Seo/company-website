import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

const AdminPostEditor = ({ initialContent = "", onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const imageHandler = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/upload/image`,
            formData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const imageUrl = res.data.imageUrl;
          const quill = quillRef.current;
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", imageUrl);
          quill.setSelection(range.index + 1);
        } catch (err) {
          console.error("Image upload failed:", err);
        }
      };
    };

    const toolbarOptions = [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ];

    const quill = new Quill(editorRef.current, {
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            image: imageHandler,
          },
        },
      },
      placeholder: "Compose an epic...",
      theme: "snow",
    });

    quill.root.innerHTML = initialContent;
    quill.on("text-change", () => {
      if (onChange) onChange(quill.root.innerHTML);
    });

    quillRef.current = quill;
  }, []);

  return (
    <div>
      <div
        ref={editorRef}
        style={{
          height: "500px",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export default AdminPostEditor;
