import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLine } from "react-icons/fa";

const scrollToTop = () => {
  console.log("Scrolling to top");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans">会社情報</h3>
            <p className="text-gray-400 w-2/3">
              太陽光パネルの製造と販売を行う山田製作所です。
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-white transition duration-300"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="hover:text-white transition duration-300"
                >
                  企業情報
                </Link>
              </li>
              <li>
                <Link
                  to="/leadership"
                  onClick={scrollToTop}
                  className="hover:text-white transition duration-300"
                >
                  役員紹介
                </Link>
              </li>
              <li>
                <Link
                  to="/board"
                  onClick={scrollToTop}
                  className="hover:text-white transition duration-300"
                >
                  掲示板
                </Link>
              </li>
              <li>
                <Link
                  to="/service"
                  onClick={scrollToTop}
                  className="hover:text-white transition duration-300"
                >
                  事業内容
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="hover:text-white transition duration-300"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans">コンタクト</h3>
            <ul className="space-y-2 text-gray-400">
              <li>大阪府大阪市中央区</li>
              <li>十二軒町305-12</li>
              <li>TEL : 123-456-7890</li>
              <li>e-mail : contact@yamada.jp</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans">SNS</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 text-4xl hover:text-white transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 text-4xl hover:text-white transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 text-4xl hover:text-white transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 text-4xl hover:text-white transition duration-300"
              >
                <FaLine />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} 山田製作所. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            <Link to="/privacy-policy" className="hover:text-white">
              プライバシーポリシー
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
