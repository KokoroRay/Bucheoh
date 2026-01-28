import { useState } from 'react';
import styles from './FAQPage.module.css';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

export const FAQPage = () => {
    const { t, language } = useLanguage();
    const [activeId, setActiveId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const faqData: FAQItem[] = [
        {
            id: 1,
            question: 'BUCHAOH là gì?',
            answer: 'BUCHAOH là sản phẩm nước trái cây lên men từ men vi sinh, được tạo ra thông qua quá trình lên men sinh học có kiểm soát. Sản phẩm sử dụng trái cây làm nguyên liệu chính và hệ vi sinh vật có lợi để tạo thành sản phẩm mang đặc tính chức năng rõ rệt.',
            category: 'product'
        },
        {
            id: 2,
            question: 'Sản phẩm có an toàn cho sức khỏe không?',
            answer: 'Hoàn toàn an toàn. BUCHAOH được sản xuất theo quy trình lên men sinh học kiểm soát chặt chẽ, sử dụng men vi sinh có lợi và nguyên liệu trái cây tự nhiên. Sản phẩm không chứa chất bảo quản, màu tổng hợp hay hương liệu nhân tạo.',
            category: 'health'
        },
        {
            id: 3,
            question: 'Cách sử dụng BUCHAOH như thế nào?',
            answer: 'Bạn có thể uống trực tiếp hoặc pha loãng với nước theo tỷ lệ 1:3. Nên uống vào buổi sáng trước bữa ăn hoặc sau bữa ăn 30 phút. Liều lượng khuyến nghị: 50-100ml/ngày cho người lớn.',
            category: 'usage'
        },
        {
            id: 4,
            question: 'Phân vi sinh từ bã trái cây có tác dụng gì?',
            answer: 'Phân vi sinh từ bã trái cây giúp cải tạo đất, tăng độ màu mỡ, giảm phụ thuộc vào phân hóa học. Sản phẩm này tạo ra mô hình kinh tế tuần hoàn, tận dụng toàn bộ nguyên liệu mà không tạo ra chất thải.',
            category: 'product'
        },
        {
            id: 5,
            question: 'Tại sao chọn trái cây làm nguyên liệu?',
            answer: 'Trái cây giàu đường tự nhiên và axit hữu cơ phù hợp cho quá trình lên men. Nguồn cung dễ tìm, tính mùa vụ rõ ràng giúp chủ động nguyên liệu. Hơn nữa, trái cây gắn liền với ẩm thực Việt Nam, gần gũi và dễ được đón nhận.',
            category: 'product'
        },
        {
            id: 6,
            question: 'Sản phẩm có được kiểm định chất lượng không?',
            answer: 'Có, tất cả sản phẩm BUCHAOH đều được kiểm định chất lượng tại các phòng lab uy tín, đảm bảo tiêu chuẩn an toàn thực phẩm và có giấy chứng nhận từ Bộ Y tế.',
            category: 'safety'
        },
        {
            id: 7,
            question: 'Bảo quản sản phẩm như thế nào?',
            answer: 'Bảo quản trong tủ lạnh ở nhiệt độ 2-8°C. Sau khi mở nắp, nên sử dụng trong vòng 3-5 ngày. Tránh để nơi có ánh sáng trực tiếp và nhiệt độ cao.',
            category: 'usage'
        },
        {
            id: 8,
            question: 'Ai không nên sử dụng sản phẩm?',
            answer: 'Trẻ em dưới 1 tuổi, phụ nữ mang thai trong 3 tháng đầu, người có tiền sử dị ứng với trái cây nên tham khảo ý kiến bác sĩ trước khi sử dụng.',
            category: 'health'
        },
        {
            id: 9,
            question: 'Làm thế nào để đặt hàng?',
            answer: 'Bạn có thể đặt hàng qua website, gọi hotline, hoặc đến trực tiếp cửa hàng. Chúng tôi hỗ trợ giao hàng toàn quốc với phí ship ưu đãi.',
            category: 'order'
        },
        {
            id: 10,
            question: 'Chính sách đổi trả như thế nào?',
            answer: 'Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày mua hàng nếu sản phẩm có lỗi từ nhà sản xuất. Sản phẩm phải còn nguyên vẹn bao bì và chưa sử dụng.',
            category: 'order'
        }
    ];

    const categories = [
        { value: 'all', label: t('faq.all') },
        { value: 'product', label: t('faq.product') },
        { value: 'health', label: t('faq.health') },
        { value: 'usage', label: t('faq.usage') },
        { value: 'safety', label: language === 'vi' ? 'An toàn' : 'Safety' },
        { value: 'order', label: language === 'vi' ? 'Đặt hàng' : 'Order' }
    ];

    const toggleFAQ = (id: number) => {
        setActiveId(activeId === id ? null : id);
    };

    const filteredFAQs = faqData.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={styles.faqPage}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{t('faq.title')}</h1>
                    <p className={styles.subtitle}>
                        {t('faq.subtitle')}
                    </p>
                </div>

                <div className={styles.filters}>
                    <div className={styles.searchBox}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder={t('faq.search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.categoryFilter}>
                        {categories.map(category => (
                            <button
                                key={category.value}
                                className={`${styles.categoryBtn} ${
                                    selectedCategory === category.value ? styles.active : ''
                                }`}
                                onClick={() => setSelectedCategory(category.value)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.faqList}>
                    {filteredFAQs.length === 0 ? (
                        <div className={styles.noResults}>
                            <p>Không tìm thấy câu hỏi phù hợp. Hãy thử từ khóa khác hoặc liên hệ với chúng tôi.</p>
                        </div>
                    ) : (
                        filteredFAQs.map(faq => (
                            <div
                                key={faq.id}
                                className={`${styles.faqItem} ${
                                    activeId === faq.id ? styles.active : ''
                                }`}
                            >
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => toggleFAQ(faq.id)}
                                    aria-expanded={activeId === faq.id}
                                >
                                    <span>{faq.question}</span>
                                    {activeId === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                
                                <div className={`${styles.faqAnswer} ${
                                    activeId === faq.id ? styles.open : ''
                                }`}>
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.contactSection}>
                    <h3>{t('faq.noAnswer')}</h3>
                    <p>{t('faq.contactUs')}</p>
                    <div className={styles.contactButtons}>
                        <a href="/contact" className={styles.contactBtn}>
                            {t('faq.contactNow')}
                        </a>
                        <a href="tel:+84123456789" className={styles.phoneBtn}>
                            {t('faq.callHotline')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};