import React from "react";

const dummyPosts = [
  {
    _id: "1",
    title: "第一の投稿",
    content: "これは第一の投稿の内容です。",
    views: 123,
    fileUrl: ["https://example.com/file1.pdf"],
    createdAt: "2023-12-01T12:00:00Z",
    updatedAt: "2023-12-02T15:30:00Z",
  },
  {
    _id: "2",
    title: "第二の投稿",
    content: "こちらは第二の投稿の内容です。",
    views: 456,
    fileUrl: ["https://example.com/file2.pdf", "https://example.com/file3.pdf"],
    createdAt: "2023-12-03T10:00:00Z",
    updatedAt: "2023-12-03T18:45:00Z",
  },
  {
    _id: "3",
    title: "第三の投稿",
    content: "第三の投稿の内容になります。",
    views: 789,
    fileUrl: [],
    createdAt: "2023-12-05T09:00:00Z",
    updatedAt: "2023-12-05T14:30:00Z",
  },
];

const AdminPosts = () => {
  return (
    <div className="p-4 mx-auto max-w-[1400px]">
      <h1 className="text-4xl font-bold mt-6 mb-8">投稿管理</h1>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select className="border rounded px-3 py-2 font-bold">
            <option value="name">タイトル</option>
            <option value="content">内容</option>
          </select>
          <div className="flex-1 md:w-80 ">
            <input
              type="text"
              placeholder="検索"
              className="w-full border rounded px-3 py-2 font-bold"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="border rounded px-5 py-2 font-semibold bg-blue-400 hover:bg-blue-600 transition-colors duration-300">
            投稿
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-lg font-bold text-gray-600">
          {`${dummyPosts.length}件の投稿があります`}
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-lg font-bold">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">番号</th>
              <th className="px-4 py-3 text-left">タイトル</th>
              <th className="px-4 py-3 text-left">内容</th>
              <th className="px-4 py-3 text-left">閲覧数</th>
              <th className="px-4 py-3 text-center">ファイル</th>
              <th className="px-4 py-3 text-left">投稿日</th>
              <th className="px-4 py-3 text-left">修正日</th>
              <th className="px-4 py-3 text-center">管理</th>
            </tr>
          </thead>
          <tbody>
            {dummyPosts.map((post, index) => (
              <tr key={post._id} className="border-b">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {post.title}
                </td>
                <td className="px-4 py-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {post.content}
                </td>
                <td className="px-4 py-3">{post.views}</td>
                <td className="px-4 py-3 text-center">
                  {post.fileUrl.length > 0 ? (
                    post.fileUrl.map((url, index) => (
                      <button
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-md transition-all duration-300 border border-gray-200 hover:border-gray-300 mr-2"
                      >
                        ファイル {index + 1}
                      </button>
                    ))
                  ) : (
                    <span className="text-gray-500">無し</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(post.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {new Date(post.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end space-x-2">
                    <button className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                      修正
                    </button>
                    <button className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {dummyPosts.map((post, index) => (
          <div
            key={post._id}
            className="p-4 border rounded-lg bg-white shadow-md"
          >
            <div className="flex justify-between items-cecnter mb-2">
              <h2 className="text-lg font-bold">{post.title}</h2>
              <span className="text-gray-500 text-sm">#{index + 1}</span>
            </div>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.fileUrl.length > 0 ? (
                post.fileUrl.map((url, index) => (
                  <button
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-md transition-all duration-300 border border-gray-200 hover:border-gray-300 mr-2"
                  >
                    ファイル {index + 1}
                  </button>
                ))
              ) : (
                <span className="text-gray-500">ファイル無し</span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <div>閲覧数: {post.views}</div>
              <div>投稿日: {new Date(post.createdAt).toLocaleString()}</div>
              <div>修正日: {new Date(post.updatedAt).toLocaleString()}</div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                修正
              </button>
              <button className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                削除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-2 text-lg font-bold">
        <button className="px-3 py-1 rounded border disabled:opacity-50">
          前へ
        </button>
        <span className="px-3 py-1">1 / 1</span>
        <button className="px-3 py-1 rounded border disabled:opacity-50">
          次へ
        </button>
      </div>
    </div>
  );
};

export default AdminPosts;
