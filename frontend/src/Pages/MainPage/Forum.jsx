import React from "react";
import { Link } from "react-router-dom";
const dummyPosts = [
  {
    _id: 1,
    number: 1,
    title: "最初の投稿",
    views: 120,
    fileUrl: ["file1"],
    createdAt: "2025-01-01",
  },
  {
    _id: 2,
    number: 2,
    title: "第二の投稿",
    views: 95,
    fileUrl: [],
    createdAt: "2025-01-05",
  },
  {
    _id: 3,
    number: 3,
    title: "第三の投稿",
    views: 70,
    fileUrl: ["file2", "file3"],
    createdAt: "2025-01-10",
  },
  {
    _id: 4,
    number: 4,
    title: "第四の投稿",
    views: 50,
    fileUrl: [],
    createdAt: "2025-01-15",
  },
  {
    _id: 5,
    number: 5,
    title: "最新の投稿",
    views: 30,
    fileUrl: ["file4"],
    createdAt: "2025-01-20",
  },
];

const Forum = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-28 lg:py-20 max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            掲示板
          </h2>
        </div>
        <div className="flex justify-end mb-4">
          <Link
            to="/board"
            className="px-5 py-2 bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 border-2 border-gray-400"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            リストへ
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {dummyPosts.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              最近の投稿はありません。
            </div>
          ) : (
            dummyPosts.map((post) => (
              <div
                key={post._id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors duration-300"
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-gray-500 text-sm">
                        No. {post.number}
                      </span>
                      <span className="text-gray-500 text-sm">
                        閲覧数: {post.views}
                      </span>
                      {post.fileUrl.length > 0 && (
                        <span className="text-gray-500 text-sm">
                          ファイル: {post.fileUrl.length}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="mt-2 text-gray-500">{post.createdAt}</div>
                  </div>
                  <div className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
