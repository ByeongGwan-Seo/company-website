import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post", {
          withCredentials: true,
        });

        setPosts(response.data);
      } catch (error) {}
    };

    fetchPosts();
  }, []);

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    if (typeof url !== "string") return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType].toLowerCase() || "";
      return value.includes(searchTerm.toLowerCase());
    });
  }, [posts, searchTerm, searchType]);

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  return (
    <div className="p-4 mx-auto max-w-[1800px]">
      <h1 className="text-4xl font-bold mt-6 mb-8">投稿管理</h1>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select
            className="border rounded px-3 py-2 text-base"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">タイトル</option>
            <option value="content">内容</option>
          </select>
          <div className="flex-1 md:w-80">
            <input
              type="text"
              placeholder="検索"
              className="w-full border rounded px-3 py-2 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="/admin/create-post"
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center"
          >
            投稿
          </a>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-600">
          {paginatedPosts.length} 件の投稿があります
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-base font-bold text-gray-600">
            表示件数:{" "}
          </label>
          <select
            className="border rounded px-3 py-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[1, 2, 3, 4].map((size) => (
              <option key={size} value={size}>{`${size}件`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg table-fixed overflow-hidden text-sm lg:text-lg font-bold">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-center w-[5%]">番号</th>
              <th className="px-4 py-3 text-center w-[15%]">タイトル</th>
              <th className="px-4 py-3 text-center w-[20%]">内容</th>
              <th className="px-4 py-3 text-center w-[7%]">閲覧数</th>
              <th className="px-4 py-3 text-center w-[10%]">ファイル</th>
              <th className="px-4 py-3 text-center w-[12%]">投稿日</th>
              <th className="px-4 py-3 text-center w-[12%]">修正日</th>
              <th className="px-4 py-3 text-center w-[12%]">管理</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  掲示内容がありません
                </td>
              </tr>
            ) : (
              paginatedPosts.map((post, index) => (
                <tr key={post._id} className="border-b">
                  <td className="text-center text-md px-4 py-3 max-w-[8%]">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="text-center text-md px-4 py-3 max-w-[15%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {post.title}
                  </td>
                  <td className="text-left text-md px-4 py-3 max-w-[20%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {post.content}
                  </td>
                  <td className="text-center text-md px-4 py-3">
                    {post.views}
                  </td>
                  <td className="text-center text-md px-4 py-3">
                    {Array.isArray(post.fileUrl) ? (
                      <div className="flex flex-col gap-1">
                        {post.fileUrl.map((url, index) => (
                          <button
                            key={index}
                            onClick={() => window.open(url, "_blank")}
                            className="inline-flex items-center px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-all duration-200 border border-gray-300 shadow-sm hover:shadow w-full mb-1 last:mb-0"
                          >
                            <svg
                              className="w-4 h-4 mr-2 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="truncate">
                              {getFileNameFromUrl(url)}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      post.fileUrl && (
                        <button
                          onClick={() => window.open(post.fileUrl, "_blank")}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors duration-200 border border-gray-300"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          {getFileNameFromUrl(post.fileUrl)}
                        </button>
                      )
                    )}
                  </td>
                  <td className=" px-4 py-3 text-sm text-center">
                    {new Date(post.createdAt).toLocaleString()}
                  </td>
                  <td className=" px-4 py-3 text-sm text-center">
                    {new Date(post.updatedAt).toLocaleString()}
                  </td>
                  <td className="text-center text-md px-4 py-3 min-w-[12%]">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="px-3 py-1.5 bg-blue-500 text-white whitespace-nowrap rounded hover:bg-blue-600"
                        onClick={() =>
                          (window.location.href = `/admin/edit-post/${post._id}`)
                        }
                      >
                        修正
                      </button>
                      <button className="px-3 py-1.5 bg-red-500 text-white whitespace-nowrap rounded hover:bg-red-600">
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedPosts.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-lg shadow">
            表示内容がありません
          </div>
        ) : (
          paginatedPosts.map((post, index) => (
            <div
              key={post._id}
              className="block md:hidden bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm 2xl:text-base text-gray-500">
                  #{(currentPage - 1) * pageSize + index + 1}
                </span>
                <div className="flex gap-2">
                  <a
                    href={`/admin/edit-post/${post._id}`}
                    className="text-sm 2xl:text-base text-blue-600 hover:text-blue-800"
                  >
                    修正
                  </a>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-sm 2xl:text-base text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </div>
              </div>

              <h3 className="text-xl 2xl:text-2xl font-bold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {post.title}
              </h3>

              <p className="text-gray-600 2xl:text-lg mb-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {post.content}
              </p>

              <div className="flex justify-between items-center text-sm 2xl:text-base text-gray-500 mb-2">
                <span>閲覧数: {post.views}</span>
                <div className="flex flex-col gap-2">
                  {Array.isArray(post.fileUrl)
                    ? post.fileUrl.map((url, index) => (
                        <button
                          key={index}
                          onClick={() => window.open(url, "_blank")}
                          className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-all duration-200 border border-gray-300 shadow-sm hover:shadow-md w-full mb-1.5 last:mb-0 group"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="truncate">
                            {getFileNameFromUrl(url)}
                          </span>
                        </button>
                      ))
                    : post.fileUrl && (
                        <button
                          onClick={() => window.open(post.fileUrl, "_blank")}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors duration-200 border border-gray-300 w-full"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          {getFileNameFromUrl(post.fileUrl)}
                        </button>
                      )}
                </div>
              </div>

              <div className="flex justify-between text-sm 2xl:text-base text-gray-500">
                <span>作成: {new Date(post.createdAt).toLocaleString()}</span>
                <span>修正: {new Date(post.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-center space-x-2 text-lg font-bold">
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          前へ
        </button>
        <span className="px-3 py-1">
          {totalPages > 0 ? `${currentPage} / ${totalPages}` : "0 / 0"}
        </span>
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default AdminPosts;
