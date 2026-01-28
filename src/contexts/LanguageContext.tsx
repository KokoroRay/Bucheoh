import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    vi: {
        // Header
        'nav.home': 'TRANG CHỦ',
        'nav.products': 'SẢN PHẨM',
        'nav.about': 'VỀ BUCHAOH',
        'nav.blog': 'BLOG',
        'nav.faq': 'FAQ',
        'nav.contact': 'LIÊN HỆ',
        
        // Hero
        'hero.title': 'BUCHAOH',
        'hero.subtitle': 'Nước Trái Cây Lên Men Tự Nhiên',
        'hero.description': 'Sản phẩm từ quá trình lên men trái cây với men vi sinh tự nhiên',
        
        // About
        'about.navTitle': 'VỀ BUCHAOH',
        'about.subtitle': 'Câu chuyện về nông nghiệp sinh học',
        'about.content': 'BUCHAOH là thương hiệu tiên phong trong lĩnh vực nông nghiệp sinh học, chuyên sản xuất nước trái cây lên men và phân vi sinh từ nguyên liệu tự nhiên.',
        
        // About Section Details
        'about.title': 'BUCHAOH – Nước Trái Cây Lên Men Từ Men Vi Sinh',
        'about.tagline': '"Từ trái cây tự nhiên đến giải pháp sức khỏe và môi trường"',
        'about.description': 'BUCHAOH là sản phẩm nước trái cây lên men từ men vi sinh, được tạo ra thông qua quá trình lên men sinh học có kiểm soát. Sử dụng trái cây làm nguyên liệu chính và hệ vi sinh vật có lợi để tạo thành sản phẩm mang đặc tính chức năng rõ rệt.',
        'about.drinkTitle': 'Nước Uống Lên Men',
        'about.drinkDesc': 'Giải khát, chăm sóc sức khỏe và làm đẹp tự nhiên',
        'about.fertTitle': 'Phân Vi Sinh',
        'about.fertDesc': 'Cải tạo đất, giảm phụ thuộc phân hóa học',
        'about.whyFruit': 'Tại Sao Chọn Trái Cây?',
        'about.technical': 'Kỹ thuật: Giàu đường tự nhiên, axit hữu cơ phù hợp lên men',
        'about.supply': 'Nguồn cung: Dễ tìm, tính mùa vụ rõ ràng, chủ động nguyên liệu',
        'about.culture': 'Văn hóa: Gắn liền với ẩm thực Việt, gần gũi dễ đón nhận',
        'about.circularEconomy': 'Mô Hình Kinh Tế Tuần Hoàn',
        'about.freshFruit': 'Trái cây tươi + Men vi sinh',
        'about.fermentedDrink': 'Nước uống lên men',
        'about.bioFertilizer': 'Phân vi sinh từ bã',
        'about.circularDesc': 'Tận dụng toàn bộ vòng đời nguyên liệu, biến nông sản thô thành sản phẩm chăm sóc sức khỏe và tái tạo giá trị cho đất, cây trồng - không tạo chất thải.',
        
        // Products
        'products.title': 'SẢN PHẨM BUCHAOH',
        'products.subtitle': 'Khám phá dòng sản phẩm từ nước trái cây lên men và phân vi sinh tự nhiên',
        'products.all': 'Tất cả sản phẩm',
        'products.drinks': 'Nước uống lên men',
        'products.fertilizers': 'Phân vi sinh',
        'products.contact': 'Liên hệ ngay',
        'products.catalog': 'Tải catalog',
        'products.interest': 'Quan tâm đến sản phẩm BUCHAOH?',
        'products.consult': 'Liên hệ với chúng tôi để được tư vấn và báo giá chi tiết',
        
        // Blog
        'blog.title': 'Blog BUCHAOH',
        'blog.sectionTitle': 'BLOGS OF BUCHAOH',
        'blog.subtitle': 'Chia sẻ kiến thức và kinh nghiệm về nông nghiệp sinh học',
        'blog.all': 'Tất cả',
        'blog.products': 'Sản phẩm',
        'blog.guide': 'Hướng dẫn',
        'blog.process': 'Quy trình',
        'blog.knowledge': 'Kiến thức',
        'blog.readMore': 'Đọc thêm →',
        'blog.backToList': 'Quay lại danh sách',
        
        // Contact
        'contact.title': 'Liên Hệ Với Chúng Tôi',
        'contact.subtitle': 'Gửi tin nhắn cho chúng tôi',
        'contact.name': 'Họ và tên',
        'contact.email': 'Email',
        'contact.phone': 'Số điện thoại',
        'contact.subject': 'Chủ đề',
        'contact.message': 'Tin nhắn',
        'contact.messagePlaceholder': 'Nội dung tin nhắn',
        'contact.send': 'Gửi tin nhắn',
        'contact.info': 'Thông tin liên hệ',
        'contact.address': 'Địa chỉ',
        'contact.addressDetail': 'Trường Đại học FPT Cần Thơ\n600 Nguyễn Văn Cừ, An Bình, Ninh Kiều, Cần Thơ',
        'contact.workingHours': 'Giờ làm việc',
        'contact.workingHoursDetail': 'Thứ 2 - Thứ 6: 8:00 - 17:00\nThứ 7: 8:00 - 12:00\nChủ nhật: Nghỉ',
        'contact.success': 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.',
        'contact.required': 'Trường này là bắt buộc',
        'contact.emailInvalid': 'Email không hợp lệ',
        'contact.messageMin': 'Tin nhắn phải có ít nhất 10 ký tự',
        
        // FAQ
        'faq.title': 'Câu Hỏi Thường Gặp',
        'faq.subtitle': 'Tìm câu trả lời cho những thắc mắc về BUCHAOH',
        'faq.search': 'Tìm kiếm câu hỏi...',
        'faq.all': 'Tất cả',
        'faq.product': 'Sản phẩm',
        'faq.health': 'Sức khỏe',
        'faq.usage': 'Sử dụng',
        'faq.noAnswer': 'Không tìm thấy câu trả lời?',
        'faq.contactUs': 'Hãy liên hệ với chúng tôi để được hỗ trợ tốt nhất',
        'faq.contactNow': 'Liên hệ ngay',
        'faq.callHotline': 'Gọi hotline',
        
        // Footer
        'footer.brandName': 'BUCHAOH',
        'footer.brandTagline': 'Nước Trái Cây Lên Men Từ Men Vi Sinh',
        'footer.description': 'Sản phẩm nước trái cây lên men tự nhiên với men vi sinh có lợi, mang đến giải pháp chăm sóc sức khỏe và thân thiện với môi trường.',
        'footer.quickLinksTitle': 'LIÊN KẾT NHANH',
        'footer.contactTitle': 'LIÊN HỆ',
        'footer.products': 'Sản phẩm',
        'footer.aboutUs': 'Về chúng tôi',
        'footer.favorites': 'Yêu thích',
        'footer.store': 'Cửa hàng',
        'footer.blog': 'Blog',
        'footer.contactLink': 'Liên hệ',
        'footer.location': 'Cần Thơ, Việt Nam',
        'footer.email': 'contact@buchaoh.vn',
        'footer.phone': '+84 123 456 789',
        'footer.followUs': 'Theo dõi chúng tôi',
        'footer.copyright': '© {year} BUCHAOH - Nước Trái Cây Lên Men Tự Nhiên',
        'footer.madeWith': 'Made with ❤️ by BUCHAOH Team',
        
        // Product Descriptions
        'product.drink1.title': 'Nước BUCHAOH Trái Cây',
        'product.drink1.desc': 'Nước trái cây lên men tự nhiên giàu dinh dưỡng',
        'product.drink2.title': 'BUCHAOH Probiotic',
        'product.drink2.desc': 'Nước uống chứa men vi sinh có lợi cho sức khỏe',
        'product.drink3.title': 'BUCHAOH Original',
        'product.drink3.desc': 'Phiên bản gốc từ công thức truyền thống',
        'product.fert1.title': 'Phân Bón BUCHAOH',
        'product.fert1.desc': 'Phân bón hữu cơ từ quá trình lên men trái cây',
        'product.fert2.title': 'BUCHAOH Vi Sinh',
        'product.fert2.desc': 'Phân vi sinh giúp cải thiện đất trồng',
        'product.fert3.title': 'Phân Lỏng BUCHAOH',
        'product.fert3.desc': 'Dung dịch vi sinh lỏng dễ sử dụng cho cây trồng',
        
        // Blog Posts
        'blog.post1.title': 'Lợi ích của phân bón sinh học BUCHAOH',
        'blog.post1.excerpt': 'Khám phá những ưu điểm vượt trội của phân bón từ quá trình lên men tự nhiên cho đất trồng và cây trồng của bạn.',
        'blog.post1.content': 'Phân bón sinh học BUCHAOH được sản xuất từ quá trình lên men trái cây tự nhiên, mang lại nhiều lợi ích vượt trội cho đất trồng và cây trồng. Sản phẩm giúp cải thiện cấu trúc đất, tăng sinh vật có lợi, thân thiện với môi trường và tăng năng suất cây trồng một cách bền vững.',
        'blog.post2.title': 'Hướng dẫn sử dụng BUCHAOH hiệu quả',
        'blog.post2.excerpt': 'Cách sử dụng sản phẩm BUCHAOH hiệu quả nhất cho vườn cây của bạn với hướng dẫn chi tiết từ chuyên gia.',
        'blog.post2.content': 'Để đạt hiệu quả cao nhất khi sử dụng BUCHAOH, bạn cần tuân thủ đúng hướng dẫn sử dụng và thời điểm bón phù hợp. Pha loãng BUCHAOH với nước theo tỷ lệ 1:100 đối với tưới gốc, 1:200 đối với phun lá. Thời gian tốt nhất là sáng sớm hoặc chiều mát.',
        'blog.post3.title': 'Quy trình sản xuất BUCHAOH',
        'blog.post3.excerpt': 'Tìm hiểu về quy trình lên men trái cây với men vi sinh tự nhiên, đảm bảo chất lượng và an toàn tuyệt đối.',
        'blog.post3.content': 'BUCHAOH được sản xuất theo quy trình khép kín, đảm bảo chất lượng và an toàn cho người tiêu dùng. Quá trình bao gồm chuẩn bị nguyên liệu tươi ngon, lên men tự nhiên với men vi sinh có lợi, lọc và tinh chế, cuối cùng là đóng chai và kiểm tra chất lượng nghiêm ngặt.',
        'blog.post4.title': 'Lợi ích của nông nghiệp sinh học',
        'blog.post4.excerpt': 'Nông nghiệp sinh học là xu hướng bền vững cho tương lai, mang lại lợi ích cho môi trường và sức khỏe con người.',
        'blog.post4.content': 'Nông nghiệp sinh học không chỉ giúp bảo vệ môi trường mà còn tạo ra những sản phẩm nông nghiệp an toàn, chất lượng cao. Việc sử dụng các sản phẩm sinh học như BUCHAOH giúp giảm thiểu hóa chất, cải thiện độ phì nhiêu đất và tăng cường hệ sinh thái tự nhiên.',
        
        // UI Elements
        'ui.drinkType': 'Nước uống',
        'ui.fertType': 'Phân bón',
        'ui.author': 'Tác giả',
        'ui.features': 'Đặc điểm nổi bật:',
        'ui.orderNow': 'Đặt mua ngay',
        'ui.contactSupport': 'Liên hệ tư vấn',
        'ui.search': 'Tìm kiếm sản phẩm, bài viết...',
        'ui.share': 'Chia sẻ',
        
        // Product Features
        'feature.natural': '100% tự nhiên',
        'feature.noPreservatives': 'Không chất bảo quản',
        'feature.richProbiotics': 'Giàu men vi sinh',
        'feature.liveProbiotics': 'Men vi sinh sống',
        'feature.goodDigestion': 'Tốt cho tiêu hóa',
        'feature.noSugar': 'Không đường',
        'feature.originalFormula': 'Công thức gốc',
        'feature.richFlavor': 'Hương vị đậm đà',
        'feature.fermented30Days': 'Lên men 30 ngày',
        'feature.organic100': '100% hữu cơ',
        'feature.improveSoil': 'Cải thiện đất',
        'feature.increaseYield': 'Tăng năng suất',
        'feature.beneficialMicrobes': 'Vi sinh có lợi',
        'feature.restoreSoil': 'Khôi phục đất',
        'feature.biologicalSafety': 'An toàn sinh học',
        'feature.liquidForm': 'Dạng lỏng',
        'feature.fastAbsorption': 'Hấp thu nhanh',
        'feature.hydroponicSuitable': 'Phù hợp thủy canh',
    },
    en: {
        // Header
        'nav.home': 'HOME',
        'nav.products': 'PRODUCTS',
        'nav.about': 'ABOUT BUCHAOH',
        'nav.blog': 'BLOG',
        'nav.faq': 'FAQ',
        'nav.contact': 'CONTACT',
        
        // Hero
        'hero.title': 'BUCHAOH',
        'hero.subtitle': 'Natural Fermented Fruit Drinks',
        'hero.description': 'Products from fruit fermentation process with natural microorganisms',
        
        // About
        'about.navTitle': 'ABOUT BUCHAOH',
        'about.subtitle': 'The story of biological agriculture',
        'about.content': 'BUCHAOH is a pioneering brand in biological agriculture, specializing in producing fermented fruit drinks and bio-fertilizers from natural ingredients.',
        
        // About Section Details
        'about.title': 'BUCHAOH – Fermented Fruit Drink From Probiotics',
        'about.tagline': '"From natural fruits to health and environmental solutions"',
        'about.description': 'BUCHAOH is a fermented fruit drink product made from probiotics, created through a controlled biological fermentation process. Using fruit as the main ingredient and beneficial microorganisms to create products with distinct functional characteristics.',
        'about.drinkTitle': 'Fermented Drinks',
        'about.drinkDesc': 'Refreshing, natural health care and beauty',
        'about.fertTitle': 'Bio Fertilizer',
        'about.fertDesc': 'Soil improvement, reducing dependence on chemical fertilizers',
        'about.whyFruit': 'Why Choose Fruit?',
        'about.technical': 'Technical: Rich in natural sugars, organic acids suitable for fermentation',
        'about.supply': 'Supply: Easy to find, clear seasonality, proactive materials',
        'about.culture': 'Culture: Associated with Vietnamese cuisine, familiar and easy to accept',
        'about.circularEconomy': 'Circular Economy Model',
        'about.freshFruit': 'Fresh fruit + Probiotics',
        'about.fermentedDrink': 'Fermented drinks',
        'about.bioFertilizer': 'Bio-fertilizer from pulp',
        'about.circularDesc': 'Utilizing the entire lifecycle of materials, turning raw agricultural products into health care products and recreating value for soil and plants - creating no waste.',
        
        // Products
        'products.title': 'BUCHAOH PRODUCTS',
        'products.subtitle': 'Discover our range of fermented fruit drinks and natural bio-fertilizers',
        'products.all': 'All Products',
        'products.drinks': 'Fermented Drinks',
        'products.fertilizers': 'Bio-Fertilizers',
        'products.contact': 'Contact Now',
        'products.catalog': 'Download Catalog',
        'products.interest': 'Interested in BUCHAOH products?',
        'products.consult': 'Contact us for consultation and detailed pricing',
        
        // Blog
        'blog.title': 'BUCHAOH Blog',
        'blog.sectionTitle': 'BLOGS OF BUCHAOH',
        'blog.subtitle': 'Sharing knowledge and experience about biological agriculture',
        'blog.all': 'All',
        'blog.products': 'Products',
        'blog.guide': 'Guide',
        'blog.process': 'Process',
        'blog.knowledge': 'Knowledge',
        'blog.readMore': 'Read More →',
        'blog.backToList': 'Back to List',
        
        // Contact
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Send us a message',
        'contact.name': 'Full Name',
        'contact.email': 'Email',
        'contact.phone': 'Phone Number',
        'contact.subject': 'Subject',
        'contact.message': 'Message',
        'contact.messagePlaceholder': 'Message content',
        'contact.send': 'Send Message',
        'contact.info': 'Contact Information',
        'contact.address': 'Address',
        'contact.addressDetail': 'FPT University Can Tho\n600 Nguyen Van Cu, An Binh, Ninh Kieu, Can Tho',
        'contact.workingHours': 'Working Hours',
        'contact.workingHoursDetail': 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM\nSunday: Closed',
        'contact.success': 'Thank you for contacting us! We will respond as soon as possible.',
        'contact.required': 'This field is required',
        'contact.emailInvalid': 'Invalid email address',
        'contact.messageMin': 'Message must be at least 10 characters',
        
        // FAQ
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Find answers to your questions about BUCHAOH',
        'faq.search': 'Search questions...',
        'faq.all': 'All',
        'faq.product': 'Product',
        'faq.health': 'Health',
        'faq.usage': 'Usage',
        'faq.noAnswer': 'Can\'t find the answer?',
        'faq.contactUs': 'Contact us for the best support',
        'faq.contactNow': 'Contact now',
        'faq.callHotline': 'Call hotline',
        
        // Footer
        'footer.about': 'About BUCHAOH',
        'footer.aboutText': 'Specializing in producing fermented fruit drinks and bio-fertilizers from natural ingredients',
        'footer.quickLinks': 'Quick Links',
        // Footer
        'footer.brandName': 'BUCHAOH',
        'footer.brandTagline': 'Fermented Fruit Drink From Probiotics',
        'footer.description': 'Natural fermented fruit drink products with beneficial probiotics, providing health care solutions and environmentally friendly.',
        'footer.quickLinksTitle': 'QUICK LINKS',
        'footer.contactTitle': 'CONTACT',
        'footer.products': 'Products',
        'footer.aboutUs': 'About Us',
        'footer.favorites': 'Favorites',
        'footer.store': 'Store',
        'footer.blog': 'Blog',
        'footer.contactLink': 'Contact',
        'footer.location': 'Can Tho, Vietnam',
        'footer.email': 'contact@buchaoh.vn',
        'footer.phone': '+84 123 456 789',
        'footer.followUs': 'Follow Us',
        'footer.copyright': '© {year} BUCHAOH - Natural Fermented Fruit Drinks',
        'footer.madeWith': 'Made with ❤️ by BUCHAOH Team',
        
        // Product Descriptions
        'product.drink1.title': 'BUCHAOH Fruit Drink',
        'product.drink1.desc': 'Natural fermented fruit drink rich in nutrients',
        'product.drink2.title': 'BUCHAOH Probiotic',
        'product.drink2.desc': 'Probiotic drink containing beneficial microorganisms for health',
        'product.drink3.title': 'BUCHAOH Original',
        'product.drink3.desc': 'Original version from traditional formula',
        'product.fert1.title': 'BUCHAOH Fertilizer',
        'product.fert1.desc': 'Organic fertilizer from fruit fermentation process',
        'product.fert2.title': 'BUCHAOH Microorganism',
        'product.fert2.desc': 'Bio-fertilizer helps improve soil quality',
        'product.fert3.title': 'BUCHAOH Liquid',
        'product.fert3.desc': 'Liquid microbial solution easy to use for plants',
        
        // Blog Posts
        'blog.post1.title': 'Benefits of BUCHAOH Bio-Fertilizer',
        'blog.post1.excerpt': 'Discover the outstanding advantages of fertilizer from natural fermentation process for your soil and plants.',
        'blog.post1.content': 'BUCHAOH bio-fertilizer is produced from natural fruit fermentation process, bringing many outstanding benefits to soil and plants. The product helps improve soil structure, increase beneficial organisms, environmentally friendly and sustainably increase plant productivity.',
        'blog.post2.title': 'Guide to Using BUCHAOH Effectively',
        'blog.post2.excerpt': 'How to use BUCHAOH products most effectively for your garden with detailed guidance from experts.',
        'blog.post2.content': 'To achieve the highest efficiency when using BUCHAOH, you need to follow proper usage guidelines and appropriate application timing. Dilute BUCHAOH with water at a ratio of 1:100 for root watering, 1:200 for foliar spray. The best time is early morning or cool evening.',
        'blog.post3.title': 'BUCHAOH Production Process',
        'blog.post3.excerpt': 'Learn about the fruit fermentation process with natural microorganisms, ensuring absolute quality and safety.',
        'blog.post3.content': 'BUCHAOH is produced according to a closed process, ensuring quality and safety for consumers. The process includes preparing fresh ingredients, natural fermentation with beneficial microorganisms, filtration and purification, finally bottling and strict quality control.',
        'blog.post4.title': 'Benefits of Biological Agriculture',
        'blog.post4.excerpt': 'Biological agriculture is a sustainable trend for the future, bringing benefits to the environment and human health.',
        'blog.post4.content': 'Biological agriculture not only helps protect the environment but also creates safe, high-quality agricultural products. Using biological products like BUCHAOH helps reduce chemicals, improve soil fertility and enhance natural ecosystems.',
        
        // UI Elements
        'ui.drinkType': 'Drink',
        'ui.fertType': 'Fertilizer',
        'ui.author': 'Author',
        'ui.features': 'Key Features:',
        'ui.orderNow': 'Order Now',
        'ui.contactSupport': 'Contact Support',
        'ui.search': 'Search products, articles...',
        'ui.share': 'Share',
        
        // Product Features
        'feature.natural': '100% Natural',
        'feature.noPreservatives': 'No Preservatives',
        'feature.richProbiotics': 'Rich in Probiotics',
        'feature.liveProbiotics': 'Live Probiotics',
        'feature.goodDigestion': 'Good for Digestion',
        'feature.noSugar': 'Sugar Free',
        'feature.originalFormula': 'Original Formula',
        'feature.richFlavor': 'Rich Flavor',
        'feature.fermented30Days': 'Fermented 30 Days',
        'feature.organic100': '100% Organic',
        'feature.improveSoil': 'Improve Soil',
        'feature.increaseYield': 'Increase Yield',
        'feature.beneficialMicrobes': 'Beneficial Microbes',
        'feature.restoreSoil': 'Restore Soil',
        'feature.biologicalSafety': 'Biological Safety',
        'feature.liquidForm': 'Liquid Form',
        'feature.fastAbsorption': 'Fast Absorption',
        'feature.hydroponicSuitable': 'Hydroponic Suitable',
    }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>('vi');

    useEffect(() => {
        const savedLang = localStorage.getItem('buchaoh-language');
        if (savedLang && (savedLang === 'vi' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem('buchaoh-language', lang);
        document.documentElement.lang = lang;
    };

    const t = (key: string): string => {
        const langTranslations = translations[language as keyof typeof translations] || translations.vi;
        return langTranslations[key as keyof typeof langTranslations] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};