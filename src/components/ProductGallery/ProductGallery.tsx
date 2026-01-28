import { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
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
    const { t } = useLanguage();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'drink' | 'fertilizer'>('all');
    const carouselRef = useRef<HTMLDivElement>(null);

    // Danh sách sản phẩm BUCHAOH
    const products: Product[] = [
        { 
            id: 1, 
            title: t('product.drink1.title'),
            description: t('product.drink1.desc'),
            price: '75,000đ',
            features: [t('feature.natural'), t('feature.noPreservatives'), t('feature.richProbiotics')],
            type: 'drink'
        },
        { 
            id: 2, 
            title: t('product.drink2.title'),
            description: t('product.drink2.desc'),
            price: '85,000đ',
            features: [t('feature.liveProbiotics'), t('feature.goodDigestion'), t('feature.noSugar')],
            type: 'drink'
        },
        { 
            id: 3, 
            title: t('product.drink3.title'),
            description: t('product.drink3.desc'),
            price: '65,000đ',
            features: [t('feature.originalFormula'), t('feature.richFlavor'), t('feature.fermented30Days')],
            type: 'drink'
        },
        { 
            id: 4, 
            title: t('product.fert1.title'),
            description: t('product.fert1.desc'),
            price: '120,000đ',
            features: [t('feature.organic100'), t('feature.improveSoil'), t('feature.increaseYield')],
            type: 'fertilizer'
        },
        { 
            id: 5, 
            title: t('product.fert2.title'),
            description: t('product.fert2.desc'),
            price: '95,000đ',
            features: [t('feature.beneficialMicrobes'), t('feature.restoreSoil'), t('feature.biologicalSafety')],
            type: 'fertilizer'
        },
        { 
            id: 6, 
            title: t('product.fert3.title'),
            description: t('product.fert3.desc'),
            price: '85,000đ',
            features: [t('feature.liquidForm'), t('feature.fastAbsorption'), t('feature.hydroponicSuitable')],
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
                    <h2 className={styles.sectionTitle}>{t('products.title')}</h2>
                    <p className={styles.sectionSubtitle}>
                        {t('products.subtitle')}
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className={styles.filterTabs}>
                    <button 
                        className={`${styles.filterTab} ${activeFilter === 'all' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        <span className={styles.filterIcon}>🌟</span>
                        {t('products.all')}
                    </button>
                    <button 
                        className={`${styles.filterTab} ${activeFilter === 'drink' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('drink')}
                    >
                        <span className={styles.filterIcon}>🥤</span>
                        {t('products.drinks')}
                    </button>
                    <button 
                        className={`${styles.filterTab} ${activeFilter === 'fertilizer' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('fertilizer')}
                    >
                        <span className={styles.filterIcon}>🌱</span>
                        {t('products.fertilizers')}
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
                                            {product.type === 'drink' ? t('ui.drinkType') : t('ui.fertType')}
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
                    <h3>{t('products.interest')}</h3>
                    <p>{t('products.consult')}</p>
                    <div className={styles.ctaButtons}>
                        <button className={styles.primaryCta}>{t('products.contact')}</button>
                        <button className={styles.secondaryCta}>{t('products.catalog')}</button>
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
                                    <h3>{t('ui.features')}</h3>
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
                                📞 {t('ui.orderNow')}
                            </button>
                            <button className={styles.modalContactButton}>
                                💬 {t('ui.contactSupport')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
