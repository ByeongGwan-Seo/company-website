import React from "react";
import HeroImage from "../../assets/Image1.webp";

const Hero = () => {
  return (
    <div className="relative min-h-[110vh] bg-gradient-to-b from-gray-50 to-white pb-0">
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl 2xl:text-5xl font-sans font-bold text-gray-900 leading-tight mb-6 lg:mb-8">
              信頼と技術で未来を照らす
              <span className="block text-4xl 2xl:text-4xl font-sans font-bold text-blue-600 mt-2 lg:mt-6">
                太陽光発電のプロフェッショナル
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 font-sans font-semibold mb-8 max-w-2xl mx-auto lg:mx-0">
              山田製作所は、太陽光パネルの製造と販売、設置を通じて、持続可能なエネルギーの未来を築いています。私たちの技術と情熱で、クリーンなエネルギー社会の実現を目指します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start sm:justify-center lg:justify-start">
              <button className="bg-blue-600 text-white px-8 font-semibold py-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl">
                相談予約
              </button>
              <button className="bg-white text-blue-600 px-8 font-semibold py-4 rounded-lg border-2 border-blue-600 transition duration-300 shadow-lg hover:shadow-xl">
                お問い合わせ
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <div className="relative">
              <img
                src={HeroImage}
                className="relative rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[1.02] transition-transform duration-300"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 min-w-full mx-auto">
          {[
            {
              number: "1000+",
              text: "プロジェクト完了",
            },
            {
              number: "99%",
              text: "満足度",
            },
            {
              number: "15年以上",
              text: "業界歴",
            },
            {
              number: "年中無休",
              text: "技術サポート",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-5xl font-bold text-blue-600 mb-5">
                {item.number}
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-800">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
