import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.user) {
        navigate("/admin/posts");
      }
    } catch (error) {
      const errorMessage = error.response.data.message || "failed to login";
      const remainingAttempts = error.response.data.remainingAttempts;

      console.log(errorMessage);
      console.log(remainingAttempts);
      setError({
        message: errorMessage,
        remainingAttempts: remainingAttempts,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8 px-16 py-20 bg-slate-50 rounded-2xl shadow-xl">
        <div>
          <h2 className=" text-center text-3xl font-semibold font-sans text-gray-900">
            管理者ログイン
          </h2>
          <p className="mt-2 text-center text-lg text-gray-500">
            管理者専用ページです
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xl font-medium text-gray-700"
              >
                管理者ID
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                placeholder="管理者IDを入力してください"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                PW
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="mt-3 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                placeholder="PWを入力してください"
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-base font-bold text-center">
              {typeof error === "string" ? error : error.message}
              {error.remainingAttempts !== undefined && (
                <div className="mt-1">
                  アカウントロックまで：{error.remainingAttempts}
                </div>
              )}
              {error.remainingAttempts === 1 && (
                <div className="mt-1">
                  ログイン情報を忘れた場合は管理者にご連絡お願いします。
                </div>
              )}
              {error.remainingAttempts === 0 && (
                <div className="mt-1">
                  アカウントがロックされました。管理者にご連絡お願いします。
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full items-center px-4 py-3 border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium transition-colors duration-300"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
