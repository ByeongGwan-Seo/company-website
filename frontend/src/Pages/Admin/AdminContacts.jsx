import React from "react";

const contacts = [
  {
    id: 1,
    name: "山田 太郎",
    email: "yamada@example.com",
    phone: "010-1234-5678",
    message: "商品についてのお問い合わせです。",
    status: "対応待ち",
  },
  {
    id: 2,
    name: "佐藤 花子",
    email: "sato@example.com",
    phone: "010-8765-4321",
    message: "返金を希望します。",
    status: "対応中",
  },
  {
    id: 3,
    name: "鈴木 一郎",
    email: "suzuki@example.com",
    phone: "010-0000-1111",
    message: "ご連絡が遅れています。",
    status: "完了",
  },
];

const AdminContacts = () => {
  return (
    <div className="p-4 mx-auto max-w-[1400px]">
      <h1 className="text-4xl font-bold mt-6 mb-8">お問い合わせ管理</h1>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select className="border rounded px-3 py-2 font-bold">
            <option value="name">名前</option>
            <option value="email">メール</option>
            <option value="phone">連絡先</option>
            <option value="message">内容</option>
          </select>
          <div className="flex-1 md:w-80 ">
            <input
              type="text"
              placeholder="検索"
              className="w-full border rounded px-3 py-2 font-bold"
            />
          </div>
          <select className="border rounded px-3 py-2 font-bold">
            <option value="all">全体</option>
            <option value="pending">対応待ち</option>
            <option value="in_progress">対応中</option>
            <option value="completed">完了</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="font-bold text-gray-600">表示件数</label>
          <select className="border rounded px-3 py-2">
            {[5, 15, 20, 25].map((size) => (
              <option key={size} value={size}>{`${size}件`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-lg font-bold text-gray-600">
          {`${contacts.length}件のお問い合わせがあります`}
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-lg font-bold">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-center">番号</th>
              <th className="px-4 py-3 text-center">名前</th>
              <th className="px-4 py-3 text-center">メール</th>
              <th className="px-4 py-3 text-center">電話番号</th>
              <th className="px-4 py-3 text-center">内容</th>
              <th className="px-4 py-3 text-center">処理状態</th>
              <th className="px-4 py-3 text-center">管理</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b">
                <td className="px-4 py-3 text-center">{contact.id}</td>
                <td className="px-4 py-3 text-center">{contact.name}</td>
                <td className="px-4 py-3 text-center">{contact.email}</td>
                <td className="px-4 py-3 text-center">{contact.phone}</td>
                <td className="px-4 py-3 text-left">{contact.message}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      contact.status === "対応待ち"
                        ? "bg-blue-100 text-blue-800"
                        : contact.status === "対応中"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2">
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
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border rounded-lg bg-white shadow-md"
          >
            <div className="text-lg font-bold">番号: {contact.id}</div>
            <div>名前: {contact.name}</div>
            <div>メール: {contact.email}</div>
            <div>電話番号: {contact.phone}</div>
            <div>内容: {contact.message}</div>
            <div>
              処理状態:
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  contact.status === "対応待ち"
                    ? "bg-blue-100 text-blue-800"
                    : contact.status === "対応中"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {contact.status}
              </span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
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

export default AdminContacts;
