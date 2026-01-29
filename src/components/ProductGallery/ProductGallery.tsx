import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ProductGallery.module.css';

interface Product {
    id: number;
    slug: string;
    imageSrc?: string;
    title: string;
    description: string;
    price: string;
    features: string[];
    type: 'drink' | 'fertilizer';
}

export const ProductGallery = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState<'all' | 'drink' | 'fertilizer'>('all');
    const carouselRef = useRef<HTMLDivElement>(null);

    // Danh sách sản phẩm BUCHAOH
    const products: Product[] = [
        { 
            id: 1,
            slug: 'nuoc-khom-len-men',
            title: t('product.drink1.title'),
            description: t('product.drink1.desc'),
            price: '32,000đ',
            features: [t('feature.natural'), t('feature.noPreservatives'), t('feature.richProbiotics')],
            type: 'drink'
        },
        { 
            id: 2,
            slug: 'nuoc-tao-xanh-len-men',
            title: t('product.drink2.title'),
            description: t('product.drink2.desc'),
            price: '32,000đ',
            features: [t('feature.liveProbiotics'), t('feature.goodDigestion'), t('feature.noSugar')],
            type: 'drink'
        },
        { 
            id: 3,
            slug: 'nuoc-thanh-long-len-men',
            title: t('product.drink3.title'),
            description: t('product.drink3.desc'),
            price: '32,000đ',
            features: [t('feature.originalFormula'), t('feature.richFlavor'), t('feature.fermented30Days')],
            type: 'drink'
        },
        { 
            id: 4,
            slug: 'nuoc-gung-len-men',
            title: t('product.drink4.title'),
            description: t('product.drink4.desc'),
            price: '32,000đ',
            features: [t('feature.natural'), t('feature.antiInflammatory'), t('feature.immunityBoost')],
            type: 'drink'
        },
        { 
            id: 5,
            slug: 'nuoc-buoi-len-men',
            title: t('product.drink5.title'),
            description: t('product.drink5.desc'),
            price: '32,000đ',
            features: [t('feature.weightLoss'), t('feature.detox'), t('feature.cholesterolBalance')],
            type: 'drink'
        },
        { 
            id: 6,
            slug: 'phan-vi-sinh-tong-hop',
            title: t('product.fert1.title'),
            description: t('product.fert1.desc'),
            price: '30,000đ',
            features: [t('feature.organic100'), t('feature.improveSoil'), t('feature.increaseYield')],
            type: 'fertilizer'
        },
        { 
            id: 7,
            slug: 'phan-vi-sinh-cho-rau',
            title: t('product.fert2.title'),
            description: t('product.fert2.desc'),
            price: '30,000đ',
            features: [t('feature.beneficialMicrobes'), t('feature.restoreSoil'), t('feature.biologicalSafety')],
            type: 'fertilizer'
        },
        { 
            id: 8,
            slug: 'phan-vi-sinh-cho-cay-an-trai',
            title: t('product.fert3.title'),
            description: t('product.fert3.desc'),
            price: '30,000đ',
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
        const category = product.type === 'drink' ? 'nuoc' : 'phan';
        navigate(`/products/${category}/${product.slug}`);
    };

    const handleFilterChange = (filter: 'all' | 'drink' | 'fertilizer') => {
        setActiveFilter(filter);
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
        </section>
    );
};
