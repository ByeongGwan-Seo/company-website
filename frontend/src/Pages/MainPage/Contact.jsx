import React from "react";
import { Link } from "react-router-dom";

const mockData = [
  {
    title: "TEL",
    info: "123-456-7890",
    subInfo: "平日 09:00 - 18:00",
  },
  {
    title: "メール",
    info: "contact@yamada.jp",
    subInfo: "24時間対応",
  },
  { title: "住所", info: "大阪府大阪市中央区", subInfo: "十二軒町305-12" },
];

const Contact = () => {
  return (
    <div className="bg-white py-12 lg:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-4">
            お問い合わせ
          </h2>
          <p className="text-gray-600 text-lg">
            ご質問やご相談がございましたら、お気軽にお問い合わせください
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {mockData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300 text-center"
            >
              <h3 className="text-xl font-sans font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.info}</p>
              <p className="text-gray-500 text-sm">{item.subInfo}</p>
            </div>
          ))}
        </div>
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.760530309392!2d135.51278372633143!3d34.677448422927945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e73a0256f1cf%3A0x47569336166477c4!2z44CSNTQwLTAwMTUg7Jik7IKs7Lm067aAIOyYpOyCrOy5tOyLnCDso7zsmKTqtawg7KO864uI7LyE7LSI!5e1!3m2!1sko!2sjp!4v1752804036867!5m2!1sko!2sjp"
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[600px] lg:h-[600px]"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-block px-10 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
