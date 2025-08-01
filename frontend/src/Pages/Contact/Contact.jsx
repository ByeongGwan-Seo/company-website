import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "in_progress",
  });
  const [error, setError] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

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
      const response = await axios.post(`${baseURL}/api/contact`, formData);

      if (response.status === 201) {
        alert(
          "お問い合わせありがとうございました。内容を確認の上、24時間以内にご連絡いたします。"
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          status: "in_progress",
        });
      }
    } catch (error) {
      const errorMessage = error.response.data.message || "failed to post";
      alert("エラーが発生しました。少々お待ちした上、再度お試しください。");

      console.log(errorMessage);
      setError({
        message: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            お問い合わせ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            太陽光設備と設置から維持保守まで、山田製作所ならできます。
            <br />
            ２４時間以内にご返答します。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <form
              className="bg-white rounded-2xl shadow-xl p-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    名前
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="山田太郎"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mail"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    メール
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="example@email.com"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    電話番号
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    placeholder="010-1234-5678"
                    onChange={handleChange}
                    value={formData.phone}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    内容
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors h-40"
                    placeholder="お問い合わせ内容"
                    onChange={handleChange}
                    value={formData.message}
                    required
                  ></textarea>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium
                    hover:bg-blue-700 transition-colors duration-300"
                >
                  お問い合わせ
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                コンタクト情報
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: "phone",
                    title: "電話番号",
                    info: "02-1234-5678",
                    desc: "平日 09:00 - 18:00",
                  },
                  {
                    icon: "envelope",
                    title: "メール",
                    info: "contact@yamada.jp",
                    desc: "24時間受付中",
                  },
                  {
                    icon: "map-marker-alt",
                    title: "住所",
                    info: "大阪府大阪市中央区 十二軒町305-12",
                    desc: "本社",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <i
                        className={`fas fa-${item.icon} text-blue-600 text-xl`}
                      ></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.info}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.760530309392!2d135.51278372633143!3d34.677448422927945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e73a0256f1cf%3A0x47569336166477c4!2z44CSNTQwLTAwMTUg7Jik7IKs7Lm067aAIOyYpOyCrOy5tOyLnCDso7zsmKTqtawg7KO864uI7LyE7LSI!5e1!3m2!1sko!2sjp!4v1752804036867!5m2!1sko!2sjp"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
