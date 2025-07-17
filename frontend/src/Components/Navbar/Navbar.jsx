import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const menuItems = [
  { path: "/", label: "ホーム" },
  { path: "/about", label: "企業情報" },
  { path: "/leadership", label: "役員紹介" },
  { path: "/board", label: "掲示板" },
  { path: "/service", label: "事業内容" },
  { path: "/contact", label: "お問い合わせ" },
];

const MenuItem = ({ path, label, onClick }) => (
  <li>
    <Link
      to={path}
      className="font-sans hover:text-blue-600 transition duration-300 font-bold  text-lg xl:text-xl"
      onClick={onClick}
    >
      {label}
    </Link>
  </li>
);

const Navbar = () => {
  const [language, setLanguage] = useState("ja");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-mincho font-bold  lg:mr-8 min-w-100">
          <Link to="/">山田製作所</Link>
        </h1>
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-xs">
            {menuItems.map((item) => (
              <MenuItem key={item.path} {...item} />
            ))}
          </ul>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="hidden lg:block px-3 ml-8 border rounded-md bg-white hover:border-blue-500 transition duration-300 p-2 min-w-40 text-center"
        >
          <option value="ja">日本語</option>
          <option value="ko">한국어</option>
        </select>

        <button
          className="lg:hidden text-5xl"
          aria-label="メニュー"
          onClick={toggleMenu}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4">
          <button
            className="text-2xl mb-8 float-right"
            onClick={toggleMenu}
            aria-label="閉じる"
          >
            <HiX />
          </button>
          <ul className="clear-both space-y-4 pt-8 text-lg">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                {...item}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </ul>
          <select
            className="mt-6 w-full px-3 py-1 border rounded-md bg-white hover:border-blue-500 transition duration-300"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
