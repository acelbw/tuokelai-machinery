import productsData from "../../data/products.json";

export interface TowerCrane {
  id: string;
  model: string;
  brand: string;
  image: string;
  specs: {
    capacityTons: number;
    maxHeightM: number;
    workingRadiusM: number;
    year: number;
    condition: string;
  };
  description: Record<string, string>;
}

export const towerCranes: TowerCrane[] = productsData;

const brandNames: Record<string, Record<string, string>> = {
  Zoomlion: { en: "Zoomlion", zh: "中联重科", vi: "Zoomlion", ar: "زومليون" },
  XCMG: { en: "XCMG", zh: "徐工", vi: "XCMG", ar: "إكس سي إم جي" },
  SANY: { en: "SANY", zh: "三一重工", vi: "SANY", ar: "ساني" },
};

export function getBrandName(brand: string, lang: string): string {
  return brandNames[brand]?.[lang] ?? brand;
}
