import { useState, useRef } from 'react';
import styles from './ProductGallery.module.css';

interface Product {
    id: number;
    imageSrc?: string;
    title: string;
    description: string;
    price: string;
    features: string[];
    type: 'drink' | 'fertilizer';
}

export const ProductGallery = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'drink' | 'fertilizer'>('all');
    const carouselRef = useRef<HTMLDivElement>(null);

    // Danh sách sản phẩm BUCHAOH
    const products: Product[] = [
        { 
            id: 1, 
            title: 'BUCHAOH Original',
            description: 'Nước trái cây lên men nguyên chất, vị chua ngọt tự nhiên',
            price: '45,000đ',
            features: ['100% tự nhiên', 'Men vi sinh có lợi', 'Không chất bảo quản'],
            type: 'drink'
        },
        { 
            id: 2, 
            title: 'BUCHAOH Honey',
            description: 'Nước trái cây lên men pha mật ong, bổ dưỡng và thơm ngon',
            price: '55,000đ',
            features: ['Pha mật ong thật', 'Giàu enzyme', 'Tốt cho tiêu hóa'],
            type: 'drink'
        },
        { 
            id: 3, 
            title: 'BUCHAOH Mix Berry',
            description: 'Hỗn hợp trái cây lên men với berry, nhiều vitamin',
            price: '50,000đ',
            features: ['Mix berry tươi', 'Vitamin C cao', 'Chống oxy hóa'],
            type: 'drink'
        },
        { 
            id: 4, 
            title: 'Phân Vi Sinh BUCHAOH',
            description: 'Phân bón vi sinh từ bã trái cây lên men',
            price: '120,000đ',
            features: ['Cải tạo đất', 'Vi sinh hữu ích', 'Hữu cơ 100%'],
            type: 'fertilizer'
        },
        { 
            id: 5, 
            title: 'BUCHAOH Tropical',
            description: 'Nước lên men từ trái cây nhiệt đới tươi ngon',
            price: '48,000đ',
            features: ['Trái cây nhiệt đới', 'Vitamin A, C', 'Mát gan, thanh nhiệt'],
            type: 'drink'
        },
        { 
            id: 6, 
            title: 'Phân Lỏng BUCHAOH',
            description: 'Dung dịch vi sinh lỏng dễ sử dụng cho cây trồng',
            price: '85,000đ',
            features: ['Dạng lỏng', 'Hấp thu nhanh', 'Phù hợp thủy canh'],
            type: 'fertilizer'
        },
    ];

    // Filter products based on active filter
    const filteredProducts = products.filter(product => {
        if (activeFilter === 'all') return true;
        return product.type === activeFilter;
    });

    // Duplicate for infinite scroll effect
    const duplicatedProducts = [...filteredProducts, ...filteredProducts, ...filteredProducts];

    // Handle click on product card
    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
        
        // Pause carousel animation when clicked
        if (carouselRef.current) {
            carouselRef.current.style.animationPlayState = 'paused';
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
        
        // Resume carousel animation
        if (carouselRef.current) {
            carouselRef.current.style.animationPlayState = 'running';
        }
    };

    const handleFilterChange = (filter: 'all' | 'drink' | 'fertilizer') => {
        setActiveFilter(filter);
        setSelectedProduct(null);
        setShowModal(false);
        
        // Resume animation when filter changes
        if (carouselRef.current) {
            carouselRef.current.style.animationPlayState = 'running';
        }
    };

    return (
        <section id="products" className={styles.productGallery}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>SẢN PHẨM BUCHAOH</h2>
                    <p className={styles.sectionSubtitle}>
                        Khám phá dòng sản phẩm từ nước trái cây lên men và phân vi sinh tự nhiên
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className={styles.filterTabs}>
                    <button 
                        className={`${styles.filterTab} ${activeFilter === 'all' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        <span className={styles.filterIcon}>🌟</span>
                        Tất cả sản phẩm
                    </button>
                    <button 
                        className={`${styles.filterTab} ${activeFilter === 'drink' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('drink')}
                    >
                        <span className={styles.filterIcon}>🥤</span>
                        Nước uống lên men
                    </button>
                    <button 
                        className={`${styles.filterTab} ${activeFilter === 'fertilizer' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('fertilizer')}
                    >
                        <span className={styles.filterIcon}>🌱</span>
                        Phân vi sinh
                    </button>
                </div>

                {/* Carousel Container */}
                <div className={styles.carouselWrapper}>
                    <div 
                        className={styles.carouselTrack} 
                        ref={carouselRef}
                        style={{ 
                            animationDuration: `${filteredProducts.length * 8}s`,
                        }}
                    >
                        {duplicatedProducts.map((product, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                className={styles.productCard}
                                onClick={() => handleProductClick(product)}
                            >
                                <div className={styles.cardContent}>
                                    <div className={styles.productImage}>
                                        <div className={styles.imagePlaceholder}>
                                            <span className={styles.productIcon}>
                                                {product.type === 'drink' ? '🥤' : '🌱'}
                                            </span>
                                        </div>
                                        <div className={styles.typeTag}>
                                            {product.type === 'drink' ? 'Nước uống' : 'Phân bón'}
                                        </div>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <h3 className={styles.productTitle}>{product.title}</h3>
                                        <p className={styles.productDescription}>{product.description}</p>
                                        <div className={styles.price}>{product.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className={styles.ctaSection}>
                    <h3>Quan tâm đến sản phẩm BUCHAOH?</h3>
                    <p>Liên hệ với chúng tôi để được tư vấn và báo giá chi tiết</p>
                    <div className={styles.ctaButtons}>
                        <button className={styles.primaryCta}>Liên hệ ngay</button>
                        <button className={styles.secondaryCta}>Tải catalog</button>
                    </div>
                </div>
            </div>

            {/* Product Detail Modal */}
            {showModal && selectedProduct && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={handleCloseModal}>
                            ×
                        </button>
                        
                        {/* Product Image Section */}
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon}>
                                {selectedProduct.type === 'drink' ? '🥤' : '🌱'}
                            </div>
                        </div>
                        
                        {/* Product Info Section */}
                        <div className={styles.modalInfo}>
                            <div className={styles.modalInfoHeader}>
                                <h2 className={styles.modalTitle}>{selectedProduct.title}</h2>
                                <div className={styles.modalPrice}>{selectedProduct.price}</div>
                            </div>
                            
                            <div className={styles.modalBody}>
                                <p className={styles.modalDescription}>{selectedProduct.description}</p>
                                
                                <div className={styles.modalFeatures}>
                                    <h3>Đặc điểm nổi bật:</h3>
                                    <ul>
                                        {selectedProduct.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        {/* Actions */}
                        <div className={styles.modalActions}>
                            <button className={styles.modalBuyButton}>
                                📞 Đặt mua ngay
                            </button>
                            <button className={styles.modalContactButton}>
                                💬 Liên hệ tư vấn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
