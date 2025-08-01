import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminPostEditor from "../../Components/AdminPost/AdminPostEditor";

const AdminCreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    files: [],
    fileList: [],
  });
  const editorRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [currentUpload, setCurrentUpload] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const UploadModal = ({ progress, fileName }) =>
    showUploadModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            アップロード中。。。
          </h3>
          <p className="text-sm text-gray-600 mb-4">{fileName}</p>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
              />
            </div>
            <div className="text-center text-sm text-gray-600">
              {progress.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editorContent = editorRef.current.getC;
  };
  return (
    <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold sm:mb-8 text-gray-800">
          新しい投稿
        </h2>

        <form className="space-y-4 sm:space-y-8">
          <div>
            <label
              htmlFor="title"
              className="block text-lg sm:text-xl font-medium text-gray-700 mb-2"
            >
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 text-base sm:text-lg p-2 sm:p-3"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-lg sm:text-xl font-medium text-gray-700 mb-2"
            >
              内容
            </label>
            <AdminPostEditor
              initialContent={formData.content}
              onChange={(html) =>
                setFormData({
                  ...formData,
                  content: html,
                })
              }
            />
          </div>

          <div>
            <label
              htmlFor="files"
              className="block text-lg sm:text-xl font-medium text-gray-700 mb-2"
            >
              添付ファイル
            </label>
            <input
              type="file"
              id="files"
              multiple
              className="mt-1 block w-full text-base sm:text-lg text-gray-500 file:mr-2 sm:file:mr-4 file:py-2 sm:file:py-3 file:px-4 sm:file:px-6 file:rounded-lg file:border file:text-base sm:file:text-lg file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />

            {formData.fileList.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="font-medium text-gray-700">ファイルリスト:</p>
                <ul className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                  {formData.fileList.map((file) => (
                    <li
                      key={file.id}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileDelete(file.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              type="submit"
              className="w-full sm:w-auto sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-blue-600 border-2 border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none transition-all duration-300"
            >
              投稿
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/posts")}
              className="w-full sm:w-auto sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-gray-600 border-2 border-transparent rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none transition-all duration-300"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
      <UploadModal
        progress={uploadProgress[currentUpload] || 0}
        fileName={currentUpload || ""}
      />
    </div>
  );
};

export default AdminCreatePost;
