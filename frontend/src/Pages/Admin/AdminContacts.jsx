import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/contact`, {
          withCredentials: true,
        });

        setContacts(response.data);
      } catch (error) {
        console.log("エラー", error);
      }
    };

    fetchContacts();
  }, []);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.put(
        `${baseURL}/api/contact/${selectedContact._id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setContacts(
        contacts.map((contact) =>
          contact._id === selectedContact._id
            ? { ...contact, status: newStatus }
            : contact
        )
      );

      setIsModalOpen(false);
      Swal.fire("修正完了", "対応状況を修正しました", "success");
    } catch (error) {
      console.log("エラー：", error);
      Swal.fire("修正 エラー", "修正中エラーが発生しました", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "削除しますか？",
      text: "削除したお問い合わせは復旧できません",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/api/contact/${id}`, {
          withCredentials: true,
        });

        setContacts(
          contacts.filter((contact) => {
            contact._id !== id;
          })
        );
        Swal.fire("削除完了", "削除しました", "success");
      } catch (error) {
        console.log("エラー", error);
        Swal.fire("削除エラー", "削除中エラーが発生しました", "error");
      }
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const value = contact[searchType].toLowerCase() || "";
      const matchedResult = value.includes(searchTerm.toLocaleLowerCase());
      const matchedStatus =
        statusFilter === "all" || contact.status === statusFilter;
      return matchedResult && matchedStatus;
    });
  }, [contacts, searchTerm, searchType, statusFilter]);

  const totalPages = Math.ceil(filteredContacts.length / pageSize);
  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, currentPage, pageSize]);

  return (
    <div className="p-4 mx-auto max-w-[1400px]">
      <h1 className="text-4xl font-bold mt-6 mb-8">お問い合わせ管理</h1>
      {contacts.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-2xl fond-bold text-gray-800">
            現在お問い合わせがありません
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex w-full md:w-auto gap-2">
              <select
                className="border rounded px-3 py-2 font-bold"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border rounded px-3 py-2 font-bold"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">全体</option>
                <option value="pending">対応待ち</option>
                <option value="in_progress">対応中</option>
                <option value="completed">完了</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="font-bold text-gray-600">表示件数</label>
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

          <div className="mb-6">
            <div className="text-lg font-bold text-gray-600">
              {`${paginatedContacts.length}件のお問い合わせがあります`}
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-lg font-bold">
              <colgroup>
                <col className="w-[8%]" />
                <col className="w-[12%]" />
                <col className="w-[20%]" />
                <col className="w-[15%]" />
                <col className="w-[25%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
              </colgroup>
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
                {paginatedContacts.map((contact, index) => (
                  <tr key={contact._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-center">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 py-3 text-center">{contact.name}</td>
                    <td className="px-4 py-3 text-center">{contact.email}</td>
                    <td className="px-4 py-3 text-center">{contact.phone}</td>
                    <td className="px-4 py-3 text-left">{contact.message}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          contact.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : contact.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {`${
                          contact.status === "in_progress"
                            ? "対応中"
                            : contact.status === "pending"
                            ? "対応待ち"
                            : "完了"
                        }`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="px-3 py-1.5 bg-blue-500 text-white rounded whitespace-nowrap  hover:bg-blue-600"
                        >
                          修正
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded whitespace-nowrap  hover:bg-red-600"
                        >
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
            {paginatedContacts.map((contact, index) => (
              <div
                key={contact._id}
                className="p-4 border rounded-lg bg-white shadow-md"
              >
                <div className="text-lg font-bold">
                  番号: {(currentPage - 1) * pageSize + index + 1}
                </div>
                <div>名前: {contact.name}</div>
                <div>メール: {contact.email}</div>
                <div>電話番号: {contact.phone}</div>
                <div>内容: {contact.message}</div>
                <div>
                  処理状態:
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      contact.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : contact.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {`${
                      contact.status === "in_progress"
                        ? "対応中"
                        : contact.status === "pending"
                        ? "対応待ち"
                        : "完了"
                    }`}
                  </span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="px-3 py-1.5 bg-blue-500 text-white rounded whitespace-nowrap hover:bg-blue-600"
                  >
                    修正
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="px-3 py-1.5 bg-red-500 text-white rounded whitespace-nowrap hover:bg-red-600"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center space-x-2 text-lg font-bold">
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
            >
              前へ
            </button>
            {
              <span className="px-3 py-1">
                {currentPage} / {totalPages}
              </span>
            }
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
            >
              次へ
            </button>
          </div>
        </>
      )}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">対応状況修正</h2>
            <div className="mb-4">
              <p className="font-medium mb-2">
                現在状況：
                {selectedContact.status === "in_progress"
                  ? "対応中"
                  : selectedContact.status === "pending"
                  ? "対応待ち"
                  : "完了"}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => handleStatusUpdate("pending")}
                  className="w-full px-4 py-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                >
                  対応待ち
                </button>
                <button
                  onClick={() => handleStatusUpdate("in_progress")}
                  className="w-full px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200"
                >
                  対応中
                </button>
                <button
                  onClick={() => handleStatusUpdate("completed")}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  完了
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="w-full px-4 py-2 font-bold bg-gray-200"
                onClick={() => setIsModalOpen(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
