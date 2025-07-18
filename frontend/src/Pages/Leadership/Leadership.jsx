import React from "react";
import Human1 from "../../assets/Human1.webp";

const Leadership = () => {
  const executives = [
    {
      name: "佐藤 健一",
      position: "COO（最高執行責任者）",
      description:
        "企業運営全般を統括し、効率的な業務とプロセス革新を推進しています。",
      imageUrl: Human1,
    },
    {
      name: "高橋 和也",
      position: "CTO（最高技術責任者）",
      description: "最新の技術トレンドをリードし、R&D部門を統括しています。",
      imageUrl: Human1,
    },
    {
      name: "中村 達也",
      position: "CFO（最高財務責任者）",
      description:
        "財務戦略の立案および企業価値向上のための財務管理を担当しています。",
      imageUrl: Human1,
    },
    {
      name: "鈴木 翔太",
      position: "CMO（最高マーケティング責任者）",
      description:
        "グローバルマーケティング戦略の立案とブランド価値の向上を推進しています。",
      imageUrl: Human1,
    },
  ];

  const teamMembers = [
    {
      name: "田中 翔平",
      position: "開発チームリーダー",
      description: "新製品の開発と技術革新を担当しています。",
      imageUrl: Human1,
    },
    {
      name: "山口 悠真",
      position: "営業チームリーダー",
      description: "グローバル市場の開拓と顧客対応を担当しています。",
      imageUrl: Human1,
    },
    {
      name: "伊藤 拓真",
      position: "品質管理チームリーダー",
      description: "製品の品質向上と品質システムの管理を担当しています。",
      imageUrl: Human1,
    },
    {
      name: "小林 優斗",
      position: "人事チームリーダー",
      description: "人事ポリシーの立案と人材管理を担当しています。",
      imageUrl: Human1,
    },
  ];
  return (
    <div className="container max-w-7xl mx-auto px-4 py-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          役員紹介
        </h1>
        <p className="text-xl text-gray-600">
          革新と成長をリードする山田製作所のリーダーシップ
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-24 items-center">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">CEOあいさつ</h2>
          <div className="text-lg text-gray-600 space-y-6">
            <p>皆様、こんにちは。山田製作所代表取締役の山田です。</p>
            <p>
              山田製作所は、20年以上の電気業界での経験をもとに、
              革新的な技術とサービスを通じてお客様に最高の価値を提供するべく
              日々取り組んでおります。
            </p>
            <p>
              変化の激しいグローバル市場においても、
              継続的な研究開発と品質革新を通じて、
              世界最高水準の製品とサービスを提供してまいります。
            </p>
            <p className="font-semibold mt-8">山田製作所 代表取締役　山田</p>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={Human1} className="w-full aspect-[3/4] object-cover" />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-gray-800">山田 誠一</h3>
              <p className="text-indigo-600">代表取締役</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          経営幹部
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((executive, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-square bg-gray-200">
                <img
                  src={executive.imageUrl}
                  alt={executive.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {executive.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4">
                  {executive.position}
                </p>
                <p className="text-gray-600">{executive.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          主要メンバー
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((teamMember, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-square bg-gray-200">
                <img
                  src={teamMember.imageUrl}
                  alt={teamMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {teamMember.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4">
                  {teamMember.position}
                </p>
                <p className="text-gray-600">{teamMember.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
