import type { Lang } from "./i18n";

export const productCategoryIds = [
  "tower-cranes",
  "truck-cranes",
  "other-equipment",
] as const;

export type ProductCategory = (typeof productCategoryIds)[number];

type LocalizedText = Record<Lang, string>;

export const productCategories: {
  id: ProductCategory;
  label: LocalizedText;
  description: LocalizedText;
}[] = [
  {
    id: "tower-cranes",
    label: {
      en: "Tower Cranes",
      zh: "塔吊系列",
      vi: "Cẩu Tháp",
      ar: "الرافعات البرجية",
    },
    description: {
      en: "Tower cranes for building and infrastructure projects",
      zh: "适用于建筑及基础设施项目的塔式起重机",
      vi: "Cẩu tháp cho các dự án xây dựng và hạ tầng",
      ar: "رافعات برجية لمشاريع البناء والبنية التحتية",
    },
  },
  {
    id: "truck-cranes",
    label: {
      en: "Truck Cranes",
      zh: "汽车吊系列",
      vi: "Cẩu Xe Tải",
      ar: "الرافعات المتنقلة",
    },
    description: {
      en: "Mobile truck cranes for flexible lifting operations",
      zh: "适用于灵活吊装作业的汽车起重机",
      vi: "Cẩu xe tải di động cho công việc nâng hạ linh hoạt",
      ar: "رافعات متنقلة لعمليات الرفع المرنة",
    },
  },
  {
    id: "other-equipment",
    label: {
      en: "Other Equipment",
      zh: "其他设备系列",
      vi: "Thiết Bị Khác",
      ar: "معدات أخرى",
    },
    description: {
      en: "Other construction machinery and heavy equipment",
      zh: "其他工程机械及重型设备",
      vi: "Máy móc xây dựng và thiết bị hạng nặng khác",
      ar: "آلات بناء ومعدات ثقيلة أخرى",
    },
  },
];

export function normalizeProductCategory(value: unknown): ProductCategory {
  return productCategoryIds.includes(value as ProductCategory)
    ? (value as ProductCategory)
    : "tower-cranes";
}

export function filterProductsByCategory<T extends { category?: unknown }>(
  products: T[],
  category: ProductCategory,
): T[] {
  return products.filter(
    (product) => normalizeProductCategory(product.category) === category,
  );
}

export function getProductCategoryLabel(
  category: ProductCategory,
  lang: Lang,
): string {
  return (
    productCategories.find((item) => item.id === category)?.label[lang] ??
    category
  );
}

export function getEmptyCategoryMessage(lang: Lang): string {
  const messages: LocalizedText = {
    en: "No products are currently listed in this series. Contact us and we can source the equipment you need.",
    zh: "该系列暂未上架产品。请联系我们，我们可以按您的需求寻找设备。",
    vi: "Hiện chưa có sản phẩm trong dòng này. Hãy liên hệ để chúng tôi tìm thiết bị bạn cần.",
    ar: "لا توجد منتجات مدرجة حالياً في هذه الفئة. تواصل معنا وسنساعدك في توفير المعدات المطلوبة.",
  };

  return messages[lang];
}
