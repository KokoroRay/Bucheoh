import { useState, useRef } from 'react';
import styles from './ProductGallery.module.css';

interface Product {
    id: number;
    imageSrc?: string;
    title?: string;
}

export const ProductGallery = () => {
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Danh sách sản phẩm - có thể thay bằng data thật
    const products: Product[] = [
        { id: 1, title: 'Sản phẩm 1' },
        { id: 2, title: 'Sản phẩm 2' },
        { id: 3, title: 'Sản phẩm 3' },
        { id: 4, title: 'Sản phẩm 4' },
        { id: 5, title: 'Sản phẩm 5' },
        { id: 6, title: 'Sản phẩm 6' },
        { id: 7, title: 'Sản phẩm 7' },
        { id: 8, title: 'Sản phẩm 8' },
    ];

    // Duplicate products để tạo infinite loop seamless
    const duplicatedProducts = [...products, ...products];

    // Handle click on product card
    const handleProductClick = (productId: number, index: number) => {
        setSelectedProduct(productId);

        // Scroll product to center of viewport
        if (carouselRef.current) {
            const track = carouselRef.current;
            const cards = track.querySelectorAll(`.${styles.productCard}`);
            const clickedCard = cards[index] as HTMLElement;

            if (clickedCard) {
                const trackRect = track.getBoundingClientRect();
                const cardRect = clickedCard.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const viewportCenter = window.innerWidth / 2;
                const scrollOffset = cardCenter - viewportCenter;

                // Pause animation và scroll smooth
                track.style.animationPlayState = 'paused';
                const currentTransform = window.getComputedStyle(track).transform;
                const matrix = new DOMMatrix(currentTransform);
                const currentX = matrix.m41;

                track.style.transform = `translateX(${currentX - scrollOffset}px)`;
            }
        }
    };

    // Close modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
        // Resume animation
        if (carouselRef.current) {
            carouselRef.current.style.animationPlayState = 'running';
        }
    };

    // Get selected product data
    const selectedProductData = products.find(p => p.id === selectedProduct);

    return (
        <section id="products" className={styles.productGallery}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>SẢN PHẨM NỔI BẬT BUCHAOH</h2>

                {/* Wrapper để clip overflow */}
                <div className={styles.carouselWrapper}>
                    {/* Track chứa tất cả items - sẽ animate */}
                    <div className={styles.carouselTrack} ref={carouselRef}>
                        {duplicatedProducts.map((product, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                className={styles.productCard}
                                onClick={() => handleProductClick(product.id, index)}
                            >
                                {product.imageSrc ? (
                                    <img
                                        src={product.imageSrc}
                                        alt={product.title || `Product ${product.id}`}
                                        className={styles.productImage}
                                    />
                                ) : (
                                    <div className={styles.productPlaceholder}>
                                        <span>{product.title}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal for selected product */}
                {selectedProduct && selectedProductData && (
                    <div className={styles.modal} onClick={handleCloseModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeButton} onClick={handleCloseModal}>
                                ✕
                            </button>
                            <div className={styles.modalImage}>
                                {selectedProductData.imageSrc ? (
                                    <img src={selectedProductData.imageSrc} alt={selectedProductData.title} />
                                ) : (
                                    <div className={styles.modalPlaceholder}>
                                        <span>{selectedProductData.title}</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.modalInfo}>
                                <h3>{selectedProductData.title}</h3>
                                <p>Mô tả chi tiết sản phẩm...</p>
                                <button className={styles.ctaButton}>Xem chi tiết</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
