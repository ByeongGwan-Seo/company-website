import React from "react";
import { useEffect } from "react";
import CompanyImage from "../../assets/Image2.webp";

const mockYearData = [
  { year: "2023", event: "グローバル市場進出" },
  { year: "2022", event: "シリーズB資金調達達成" },
  { year: "2021", event: "主要技術の特許取得" },
  { year: "2020", event: "会社設立" },
];

const mockValues = [
  {
    title: "革新",
    desc: "絶え間ない挑戦と革新で未来を切り拓きます",
  },
  { title: "信頼", desc: "顧客との信頼を最も重要な価値としています" },
  { title: "成長", desc: "社員の継続的な成長を支援します" },
  ,
];

const About = () => {
  useEffect(() => {
    document.title = "山田製作所 | 企業情報";
  }, []);
  return (
    <div className="container mx-auto px-4 py-32 max-w-7xl">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-24">
        <img src={CompanyImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900">
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
            <h3 className="text-2xl md:text-4xl font-sans font-bold mb-2 md:mb-3">
              山田製作所
            </h3>
            <p className="text-base md:text-xl font-light">
              信頼と技術力で未来を切り拓きます
            </p>
          </div>
        </div>
      </div>
      <div className="mb-24 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-slate-800 text-center">
          会社紹介
        </h2>
        <div className="text-lg leading-relaxed text-gray-600 space-y-6">
          <p>
            山田製作所は1995年の設立以来、電力変換装置および電力制御システム分野において革新的なソリューションを提供してきた先進的な電機企業です。
            高効率トランス、電力変換装置（PCS）、無停電電源装置（UPS）などの主要製品を開発・製造し、再生可能エネルギー設備やスマートグリッドシステムの構築にも取り組んでいます。
          </p>
          <p>
            特に環境に優しいエネルギーソリューション分野では優れた技術力が評価され、国内外の主要発電所や産業施設に安定した電力供給システムを構築しています。
            絶え間ないR&D投資と技術革新によりエネルギー効率化と電力品質の向上に貢献し、持続可能な未来のためのエコエネルギーソリューションをリードしています。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {mockValues.map((value, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">
              {value.title}
            </h3>
            <p className="text-gray-600 text-lg">{value.desc}</p>
          </div>
        ))}
      </div>

      <div className="mb-24 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">企業ビジョン</h2>
        <p className="text-2xl leading-relaxed text-gray-600 font-light">
          2030年までにグローバル市場をリードする技術革新企業へと飛躍し、
          <br />
          より良い世界の実現に貢献してまいります。
        </p>
      </div>

      <div className="mb-24">
        <h2 className="text-4xl font-bold mb-12 text-slate-800 text-center">
          会社沿革
        </h2>
        <div className="space-y-12 max-w-5xl mx-auto">
          {mockYearData.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="w-1/2 text-center">
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <h3 className="text-2xl font-bold mb-3 text-indigo-600">
                    {item.year}
                  </h3>
                  <p className="text-gray-700 font-bold text-xl">
                    {item.event}
                  </p>
                </div>
              </div>
              <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
