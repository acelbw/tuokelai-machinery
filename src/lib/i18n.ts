export type Lang = "en" | "zh" | "vi" | "ar";

export const languages: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

type TranslationDict = Record<string, string>;

const dict: Record<Lang, TranslationDict> = {
  en: {
    "site.name": "Tuokelai Machinery",
    "site.slogan": "Your Trusted Partner for Heavy Equipment",
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.cases": "Cases",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.quote": "Get Quote",

    // Hero
    "hero.badge": "Global Equipment Supplier",
    "hero.title": "Chinese Heavy Equipment, Global Reach",
    "hero.subtitle":
      "Premium second-hand tower cranes and construction machinery exported worldwide. Quality inspected, competitively priced, ready to ship.",
    "hero.cta": "Explore Products",
    "hero.cta2": "Contact Us",
        
    // Trust Bar
    "trust.years": "Years in Business",
    "trust.countries": "Countries Exported",
    "trust.units": "Units Sold",
    "trust.satisfaction": "Client Satisfaction",

    // Featured Products
    "featured.eyebrow": "Featured Equipment",
    "featured.title": "Featured Equipment",
    "featured.subtitle":
      "Quality-inspected tower cranes available now. Each unit undergoes rigorous testing before shipment.",
    "featured.viewAll": "View All Products",

    // Why Us
    "why.eyebrow": "Why Choose Us",
    "why.title": "Why Choose Tuokelai",
    "why.subtitle":
      "We bridge the gap between Chinese manufacturers and global buyers with transparency, quality, and service.",
    "why.1.title": "Rigorous Inspection",
    "why.1.desc":
      "Every machine undergoes a 50-point inspection by our engineers before listing. Full inspection reports available.",
    "why.2.title": "Competitive Pricing",
    "why.2.desc":
      "Direct sourcing from China's largest equipment markets. No middlemen, factory-to-port pricing.",
    "why.3.title": "Global Logistics",
    "why.3.desc":
      "We handle container loading, customs documentation, and shipping to ports worldwide — stress-free delivery.",
    "why.4.title": "After-Sales Support",
    "why.4.desc":
      "Technical support, spare parts sourcing, and installation guidance — we stand behind every sale.",

    // CTA
    "cta.title": "Looking for Quality Equipment?",
    "cta.subtitle":
      "Tell us what you need. We'll find the right machine at the right price.",
    "cta.button": "Send Inquiry",

    // Products Page
    "products.eyebrow": "Our Inventory",
    "products.title": "Our Equipment",
    "products.subtitle":
      "Browse our current inventory of tower cranes and construction machinery.",
    "products.spec.capacity": "Lifting Capacity",
    "products.spec.height": "Standard Height",
    "products.spec.radius": "Working Radius",
    "products.spec.year": "Year",
    "products.spec.condition": "Condition",
    "products.condition.used": "Used - Inspected",
    "products.inquiry": "Inquire Now",
    "products.loading": "Loading capacity",
    "products.heightUnit": "m",
    "products.radiusUnit": "m",
    "products.capacityUnit": "t",

    // About Page
    "about.eyebrow": "About Us",
    "about.title": "About Tuokelai",
    "about.subtitle":
      "Changsha-based heavy equipment supplier connecting global buyers with China's best machinery.",
    "about.story.title": "Our Story",
    "about.story.p1":
      "Changsha Tuokelai Machinery Equipment Co., Ltd. was founded in Changsha, Hunan — the heart of China's construction machinery industry. With deep roots in the local equipment market, we specialize in sourcing, inspecting, and exporting second-hand tower cranes and construction equipment to buyers worldwide.",
    "about.story.p2":
      "Our team brings over a decade of industry experience. We understand what overseas buyers need: reliable machines, transparent condition reports, and hassle-free shipping. Every piece of equipment we handle is personally inspected by our engineers.",
    "about.mission.title": "Our Mission",
    "about.mission.text":
      "To make China's high-quality second-hand construction equipment accessible to the world — with honesty, professionalism, and competitive pricing.",
    "about.cert.title": "Certifications & Compliance",
    "about.cert.text":
      "We adhere to international export standards. All equipment comes with documentation support for customs clearance. Certification details available upon request.",
    "about.transactions.title": "Transaction Records",
    "about.transactions.text":
      "We maintain transparent records of all our transactions. Past shipments, client references, and equipment history available for serious buyers.",
    "about.transactions.placeholder": "Transaction records and case studies will be displayed here.",

    // Contact Page
    "contact.eyebrow": "Contact Us",
    "contact.title": "Get In Touch",
    "contact.subtitle":
      "Have a question or need a quote? Reach out — we respond within 24 hours.",
    "contact.form.name": "Your Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone / WhatsApp",
    "contact.form.company": "Company (Optional)",
    "contact.form.placeholder": "Describe the equipment type, specs, and quantity you need...",
    "contact.form.message": "What equipment are you looking for?",
    "contact.form.submit": "Send Message",
    "contact.form.success": "Message sent! We'll get back to you within 24 hours.",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.wechat": "WeChat",
    "contact.info.whatsapp": "WhatsApp",
    "contact.info.zalo": "Scan QR to add on Zalo",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact Us",
    "footer.address": "Changsha, Hunan, China",
  },

  zh: {
    "site.name": "拓科莱机械",
    "site.slogan": "您信赖的重型设备合作伙伴",
    "nav.home": "首页",
    "nav.products": "产品中心",
    "nav.cases": "案例",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",
    "nav.quote": "获取报价",

    "hero.title": "中国工程设备，走向全球市场",
    "hero.subtitle": "优质二手塔式起重机及工程机械出口全球，严格质检，价格合理，随时发货。",
    "hero.cta": "查看产品",
    "hero.cta2": "联系我们",

    "trust.years": "行业经验(年)",
    "trust.countries": "出口国家",
    "trust.units": "销售台数",
    "trust.satisfaction": "客户满意度",

    "featured.title": "精选设备",
    "featured.subtitle": "目前在售的优质塔式起重机，每台设备装运前均经过严格检测。",
    "featured.viewAll": "查看全部产品",

    "why.eyebrow": "我们的优势",
    "why.title": "为什么选择拓科莱",
    "why.subtitle": "我们以透明、品质和服务，搭建中国制造商与全球买家之间的桥梁。",
    "why.1.title": "严格质检",
    "why.1.desc": "每台设备上架前均经过工程师50项检测，提供完整检测报告。",
    "why.2.title": "价格优势",
    "why.2.desc": "源头直采，无中间商，工厂到港口直达价格。",
    "why.3.title": "全球物流",
    "why.3.desc": "装箱、报关、海运一站式服务，轻松运达全球港口。",
    "why.4.title": "售后保障",
    "why.4.desc": "技术支持、配件采购、安装指导——我们为每一笔交易负责到底。",

    "cta.title": "在寻找优质设备？",
    "cta.subtitle": "告诉我们您的需求，我们为您找到最合适的设备。",
    "cta.button": "发送询盘",

    "products.eyebrow": "产品中心",
    "products.title": "我们的设备",
    "products.subtitle": "浏览我们目前的塔式起重机及工程机械库存。",
    "products.spec.capacity": "起重量",
    "products.spec.height": "标准高度",
    "products.spec.radius": "工作幅度",
    "products.spec.year": "年份",
    "products.spec.condition": "状态",
    "products.condition.used": "二手 - 已检测",
    "products.inquiry": "立即咨询",
    "products.loading": "起重量",
    "products.heightUnit": "米",
    "products.radiusUnit": "米",
    "products.capacityUnit": "吨",

    "about.eyebrow": "关于我们",
    "about.title": "关于拓科莱",
    "about.subtitle": "立足长沙，连接全球买家与中国优质机械设备。",
    "about.story.title": "我们的故事",
    "about.story.p1":
      "长沙拓科莱机械设备有限公司成立于湖南长沙——中国工程机械行业的核心地带。凭借深厚的本地市场资源，我们专注于为全球买家采购、检测和出口二手塔式起重机及工程设备。",
    "about.story.p2":
      "我们的团队拥有十余年行业经验，深知海外买家的需求：可靠的设备、透明的状况报告、无忧的物流服务。每一台设备均由我们的工程师亲自检测。",
    "about.mission.title": "我们的使命",
    "about.mission.text": "让中国优质二手工程设备走向世界——以诚信、专业和竞争力价格赢得信任。",
    "about.cert.title": "资质与合规",
    "about.cert.text":
      "我们遵循国际出口标准。所有设备提供清关文件支持。更多资质信息可应要求提供。",
    "about.transactions.title": "交易记录",
    "about.transactions.text":
      "我们保持透明的交易记录。过往发货记录、客户参考和设备历史可供认真买家查看。",
    "about.transactions.placeholder": "交易记录和案例将展示在此处。",

    "contact.eyebrow": "联系我们",
    "contact.title": "联系我们",
    "contact.subtitle": "有任何问题或需要报价？联系我们——24小时内回复。",
    "contact.form.name": "您的姓名",
    "contact.form.email": "电子邮箱",
    "contact.form.phone": "电话 / WhatsApp",
    "contact.form.company": "公司名称（选填）",
    "contact.form.placeholder": "请描述您需要的设备类型、规格和数量...",
    "contact.form.message": "您需要什么设备？",
    "contact.form.submit": "发送消息",
    "contact.form.success": "消息已发送！我们将在24小时内回复您。",
    "contact.info.address": "地址",
    "contact.info.phone": "电话",
    "contact.info.email": "邮箱",
    "contact.info.wechat": "微信",
    "contact.info.whatsapp": "WhatsApp",
    "contact.info.zalo": "扫码添加 Zalo 好友",

    "footer.rights": "版权所有。",
    "footer.quickLinks": "快速链接",
    "footer.contact": "联系我们",
    "footer.address": "中国湖南省长沙市",
  },

  vi: {
    "site.name": "Tuokelai Machinery",
    "site.slogan": "Đối Tác Tin Cậy Về Thiết Bị Hạng Nặng",
    "nav.home": "Trang Chủ",
    "nav.products": "Sản Phẩm",
    "nav.cases": "Dự Án",
    "nav.about": "Giới Thiệu",
    "nav.contact": "Liên Hệ",
    "nav.quote": "Báo Giá",

    "hero.title": "Thiết Bị Hạng Nặng Trung Quốc, Vươn Tầm Toàn Cầu",
    "hero.subtitle":
      "Cần cẩu tháp và máy móc xây dựng đã qua sử dụng chất lượng cao, xuất khẩu toàn cầu. Kiểm tra chất lượng, giá cạnh tranh, sẵn sàng vận chuyển.",
    "hero.cta": "Khám Phá Sản Phẩm",
    "hero.cta2": "Liên Hệ",

    "trust.years": "Năm Kinh Nghiệm",
    "trust.countries": "Quốc Gia Xuất Khẩu",
    "trust.units": "Máy Đã Bán",
    "trust.satisfaction": "Khách Hàng Hài Lòng",

    "featured.title": "Thiết Bị Nổi Bật",
    "featured.subtitle":
      "Cần cẩu tháp chất lượng đã kiểm tra hiện có sẵn. Mỗi máy đều qua kiểm tra nghiêm ngặt trước khi vận chuyển.",
    "featured.viewAll": "Xem Tất Cả Sản Phẩm",

    "why.eyebrow": "Tại Sao Chọn Chúng Tôi",
    "why.title": "Tại Sao Chọn Tuokelai",
    "why.subtitle":
      "Chúng tôi kết nối nhà sản xuất Trung Quốc với người mua toàn cầu bằng sự minh bạch, chất lượng và dịch vụ.",
    "why.1.title": "Kiểm Tra Nghiêm Ngặt",
    "why.1.desc":
      "Mỗi máy đều qua 50 điểm kiểm tra bởi kỹ sư trước khi niêm yết. Có sẵn báo cáo kiểm tra đầy đủ.",
    "why.2.title": "Giá Cạnh Tranh",
    "why.2.desc":
      "Nhập hàng trực tiếp từ các thị trường thiết bị lớn nhất Trung Quốc. Không trung gian, giá từ nhà máy đến cảng.",
    "why.3.title": "Hậu Cần Toàn Cầu",
    "why.3.desc":
      "Chúng tôi xử lý đóng container, chứng từ hải quan và vận chuyển đến các cảng trên toàn thế giới.",
    "why.4.title": "Hỗ Trợ Sau Bán",
    "why.4.desc":
      "Hỗ trợ kỹ thuật, tìm phụ tùng và hướng dẫn lắp đặt — chúng tôi đứng sau mỗi giao dịch.",

    "cta.title": "Tìm Thiết Bị Chất Lượng?",
    "cta.subtitle":
      "Hãy cho chúng tôi biết nhu cầu của bạn. Chúng tôi sẽ tìm máy phù hợp với giá tốt.",
    "cta.button": "Gửi Yêu Cầu",

    "products.eyebrow": "Kho Hàng",
    "products.title": "Thiết Bị Của Chúng Tôi",
    "products.subtitle":
      "Duyệt qua kho cần cẩu tháp và máy móc xây dựng hiện có của chúng tôi.",
    "products.spec.capacity": "Sức Nâng",
    "products.spec.height": "Chiều Cao Tiêu Chuẩn",
    "products.spec.radius": "Bán Kính Làm Việc",
    "products.spec.year": "Năm",
    "products.spec.condition": "Tình Trạng",
    "products.condition.used": "Đã Qua Sử Dụng - Đã Kiểm Tra",
    "products.inquiry": "Yêu Cầu Ngay",
    "products.loading": "Sức nâng",
    "products.heightUnit": "m",
    "products.radiusUnit": "m",
    "products.capacityUnit": "t",

    "about.eyebrow": "Giới Thiệu",
    "about.title": "Về Tuokelai",
    "about.subtitle":
      "Nhà cung cấp thiết bị hạng nặng tại Trường Sa, kết nối người mua toàn cầu với máy móc tốt nhất Trung Quốc.",
    "about.story.title": "Câu Chuyện Của Chúng Tôi",
    "about.story.p1":
      "Công ty TNHH Thiết Bị Máy Móc Trường Sa Tuokelai được thành lập tại Trường Sa, Hồ Nam — trung tâm của ngành máy móc xây dựng Trung Quốc. Chúng tôi chuyên tìm nguồn, kiểm tra và xuất khẩu cần cẩu tháp và thiết bị xây dựng đã qua sử dụng.",
    "about.story.p2":
      "Đội ngũ của chúng tôi có hơn 10 năm kinh nghiệm trong ngành. Chúng tôi hiểu người mua nước ngoài cần gì: máy móc đáng tin cậy, báo cáo tình trạng minh bạch và vận chuyển dễ dàng.",
    "about.mission.title": "Sứ Mệnh",
    "about.mission.text":
      "Mang thiết bị xây dựng đã qua sử dụng chất lượng cao của Trung Quốc đến với thế giới — bằng sự trung thực, chuyên nghiệp và giá cạnh tranh.",
    "about.cert.title": "Chứng Nhận & Tuân Thủ",
    "about.cert.text":
      "Chúng tôi tuân thủ tiêu chuẩn xuất khẩu quốc tế. Tất cả thiết bị đều có hỗ trợ tài liệu thông quan.",
    "about.transactions.title": "Hồ Sơ Giao Dịch",
    "about.transactions.text":
      "Chúng tôi duy trì hồ sơ giao dịch minh bạch. Lịch sử giao hàng và tham khảo khách hàng có sẵn cho người mua nghiêm túc.",
    "about.transactions.placeholder": "Hồ sơ giao dịch và nghiên cứu điển hình sẽ được hiển thị tại đây.",

    "contact.eyebrow": "Liên Hệ",
    "contact.title": "Liên Hệ",
    "contact.subtitle": "Có câu hỏi hoặc cần báo giá? Liên hệ — chúng tôi phản hồi trong 24 giờ.",
    "contact.form.name": "Tên Của Bạn",
    "contact.form.email": "Địa Chỉ Email",
    "contact.form.phone": "Điện Thoại / WhatsApp",
    "contact.form.company": "Công Ty (Tùy Chọn)",
    "contact.form.placeholder": "Mô tả loại thiết bị, thông số kỹ thuật và số lượng bạn cần...",
    "contact.form.message": "Bạn đang tìm thiết bị gì?",
    "contact.form.submit": "Gửi Tin Nhắn",
    "contact.form.success": "Đã gửi! Chúng tôi sẽ phản hồi trong 24 giờ.",
    "contact.info.address": "Địa Chỉ",
    "contact.info.phone": "Điện Thoại",
    "contact.info.email": "Email",
    "contact.info.wechat": "WeChat",
    "contact.info.whatsapp": "WhatsApp",
    "contact.info.zalo": "Quét mã QR để kết bạn Zalo",

    "footer.rights": "Đã đăng ký bản quyền.",
    "footer.quickLinks": "Liên Kết Nhanh",
    "footer.contact": "Liên Hệ",
    "footer.address": "Trường Sa, Hồ Nam, Trung Quốc",
  },

  ar: {
    "site.name": "توكولاي للمعدات",
    "site.slogan": "شريكك الموثوق للمعدات الثقيلة",
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.cases": "الحالات",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.quote": "طلب عرض سعر",

    "hero.title": "معدات صينية ثقيلة، وصول عالمي",
    "hero.subtitle":
      "رافعات برجية وآلات بناء مستعملة عالية الجودة للتصدير العالمي. مفحوصة الجودة، أسعار تنافسية، جاهزة للشحن.",
    "hero.cta": "تصفح المنتجات",
    "hero.cta2": "اتصل بنا",

    "trust.years": "سنوات في المجال",
    "trust.countries": "دولة تم التصدير لها",
    "trust.units": "وحدة مباعة",
    "trust.satisfaction": "رضا العملاء",

    "featured.title": "معدات مميزة",
    "featured.subtitle":
      "رافعات برجية مفحوصة الجودة متاحة الآن. كل وحدة تخضع لاختبارات صارمة قبل الشحن.",
    "featured.viewAll": "عرض جميع المنتجات",

    "why.eyebrow": "لماذا تختارنا",
    "why.title": "لماذا تختار توكولاي",
    "why.subtitle": "نحن نربط بين المصنعين الصينيين والمشترين العالميين بالشفافية والجودة والخدمة.",
    "why.1.title": "فحص دقيق",
    "why.1.desc": "كل آلة تخضع لفحص 50 نقطة من قبل مهندسينا قبل الإدراج. تقارير فحص كاملة متاحة.",
    "why.2.title": "أسعار تنافسية",
    "why.2.desc": "توريد مباشر من أكبر أسواق المعدات في الصين. بدون وسطاء، أسعار من المصنع إلى الميناء.",
    "why.3.title": "لوجستيات عالمية",
    "why.3.desc": "نتولى تحميل الحاويات ووثائق الجمارك والشحن إلى الموانئ في جميع أنحاء العالم.",
    "why.4.title": "دعم ما بعد البيع",
    "why.4.desc": "دعم فني، توفير قطع الغيار، وإرشادات التركيب — نقف وراء كل عملية بيع.",

    "cta.title": "تبحث عن معدات عالية الجودة؟",
    "cta.subtitle": "أخبرنا بما تحتاج إليه. سنجد لك الآلة المناسبة بالسعر المناسب.",
    "cta.button": "أرسل استفساراً",

    "products.eyebrow": "مخزوننا",
    "products.title": "معداتنا",
    "products.subtitle": "تصفح مخزوننا الحالي من الرافعات البرجية وآلات البناء.",
    "products.spec.capacity": "قدرة الرفع",
    "products.spec.height": "الارتفاع القياسي",
    "products.spec.radius": "نطاق العمل",
    "products.spec.year": "السنة",
    "products.spec.condition": "الحالة",
    "products.condition.used": "مستعمل - مفحوص",
    "products.inquiry": "استفسر الآن",
    "products.loading": "قدرة الرفع",
    "products.heightUnit": "م",
    "products.radiusUnit": "م",
    "products.capacityUnit": "طن",

    "about.eyebrow": "من نحن",
    "about.title": "عن توكولاي",
    "about.subtitle": "مورد معدات ثقيلة في تشانغشا يربط المشترين العالميين بأفضل آلات الصين.",
    "about.story.title": "قصتنا",
    "about.story.p1":
      "تأسست شركة تشانغشا توكولاي لمعدات الآلات في تشانغشا، هونان — قلب صناعة آلات البناء في الصين. بجذور عميقة في سوق المعدات المحلي، نتخصص في توفير وفحص وتصدير الرافعات البرجية ومعدات البناء المستعملة للمشترين في جميع أنحاء العالم.",
    "about.story.p2":
      "يتمتع فريقنا بخبرة تزيد عن عشر سنوات في المجال. نحن نفهم ما يحتاجه المشترون في الخارج: آلات موثوقة، تقارير حالة شفافة، وشحن خالٍ من المتاعب.",
    "about.mission.title": "مهمتنا",
    "about.mission.text":
      "جعل معدات البناء الصينية عالية الجودة في متناول العالم — بأمانة واحترافية وأسعار تنافسية.",
    "about.cert.title": "الشهادات والامتثال",
    "about.cert.text":
      "نلتزم بمعايير التصدير الدولية. جميع المعدات مزودة بدعم التوثيق للتخليص الجمركي.",
    "about.transactions.title": "سجلات المعاملات",
    "about.transactions.text":
      "نحتفظ بسجلات شفافة لجميع معاملاتنا. الشحنات السابقة ومراجع العملاء وتاريخ المعدات متاحة للمشترين الجادين.",
    "about.transactions.placeholder": "سيتم عرض سجلات المعاملات ودراسات الحالة هنا.",

    "contact.eyebrow": "اتصل بنا",
    "contact.title": "تواصل معنا",
    "contact.subtitle": "هل لديك سؤال أو تحتاج عرض سعر؟ تواصل معنا — نرد خلال 24 ساعة.",
    "contact.form.name": "اسمك",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.phone": "الهاتف / واتساب",
    "contact.form.company": "الشركة (اختياري)",
    "contact.form.placeholder": "صف نوع المعدات والمواصفات والكمية التي تحتاجها...",
    "contact.form.message": "ما هي المعدات التي تبحث عنها؟",
    "contact.form.submit": "إرسال الرسالة",
    "contact.form.success": "تم الإرسال! سنرد عليك خلال 24 ساعة.",
    "contact.info.address": "العنوان",
    "contact.info.phone": "الهاتف",
    "contact.info.email": "البريد الإلكتروني",
    "contact.info.wechat": "وي شات",
    "contact.info.whatsapp": "واتساب",
    "contact.info.zalo": "امسح رمز QR للإضافة على Zalo",

    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.address": "تشانغشا، هونان، الصين",
  },
};

export function t(lang: Lang, key: string): string {
  return dict[lang]?.[key] ?? dict.en[key] ?? key;
}

export function useT(lang: Lang) {
  return (key: string) => t(lang, key);
}
