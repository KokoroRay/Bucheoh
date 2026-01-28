import styles from './AboutSection.module.css';

interface AboutSectionProps {
    leftImageSrc?: string;
    bottomImageSrc?: string;
}

export const AboutSection = ({
    leftImageSrc,
    bottomImageSrc,
}: AboutSectionProps) => {
    return (
        <section id="about" className={styles.aboutSection}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left Image */}
                    <div className={styles.leftImage}>
                        {leftImageSrc && (
                            <img src={leftImageSrc} alt="Buchaoh Product" />
                        )}
                    </div>

                    {/* Content */}
                    <div className={styles.content}>
                        <h2 className={styles.title}>
                            BUCHAOH – Nước Trái Cây Lên Men Từ Men Vi Sinh
                        </h2>

                        <div className={styles.highlight}>
                            <p className={styles.tagline}>
                                "Từ trái cây tự nhiên đến giải pháp sức khỏe và môi trường"
                            </p>
                        </div>

                        <p className={styles.description}>
                            BUCHAOH là sản phẩm nước trái cây lên men từ men vi sinh, được tạo ra thông qua quá trình lên men sinh học có kiểm soát. 
                            Sử dụng trái cây làm nguyên liệu chính và hệ vi sinh vật có lợi để tạo thành sản phẩm mang đặc tính chức năng rõ rệt.
                        </p>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>🥤</div>
                                <div className={styles.featureContent}>
                                    <h3>Nước Uống Lên Men</h3>
                                    <p>Giải khát, chăm sóc sức khỏe và làm đẹp tự nhiên</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>🌱</div>
                                <div className={styles.featureContent}>
                                    <h3>Phân Vi Sinh</h3>
                                    <p>Cải tạo đất, giảm phụ thuộc phân hóa học</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.values}>
                            <h3 className={styles.valuesTitle}>Tại Sao Chọn Trái Cây?</h3>
                            <div className={styles.valueGrid}>
                                <div className={styles.valueItem}>
                                    <span className={styles.valueIcon}>⚗️</span>
                                    <div>
                                        <strong>Kỹ thuật:</strong> Giàu đường tự nhiên, axit hữu cơ phù hợp lên men
                                    </div>
                                </div>
                                <div className={styles.valueItem}>
                                    <span className={styles.valueIcon}>🌾</span>
                                    <div>
                                        <strong>Nguồn cung:</strong> Dễ tìm, tính mùa vụ rõ ràng, chủ động nguyên liệu
                                    </div>
                                </div>
                                <div className={styles.valueItem}>
                                    <span className={styles.valueIcon}>🇻🇳</span>
                                    <div>
                                        <strong>Văn hóa:</strong> Gắn liền với ẩm thực Việt, gần gũi dễ đón nhận
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.circularEconomy}>
                            <h3 className={styles.circularTitle}>Mô Hình Kinh Tế Tuần Hoàn</h3>
                            <div className={styles.processFlow}>
                                <div className={styles.flowItem}>
                                    <span className={styles.flowIcon}>🥭</span>
                                    <span className={styles.flowText}>Trái cây tươi + Men vi sinh</span>
                                </div>
                                <div className={styles.flowArrow}>→</div>
                                <div className={styles.flowItem}>
                                    <span className={styles.flowIcon}>🥤</span>
                                    <span className={styles.flowText}>Nước uống lên men</span>
                                </div>
                                <div className={styles.flowArrow}>+</div>
                                <div className={styles.flowItem}>
                                    <span className={styles.flowIcon}>🌱</span>
                                    <span className={styles.flowText}>Phân vi sinh từ bã</span>
                                </div>
                            </div>
                            <p className={styles.circularDesc}>
                                Tận dụng toàn bộ vòng đời nguyên liệu, biến nông sản thô thành sản phẩm chăm sóc sức khỏe 
                                và tái tạo giá trị cho đất, cây trồng - không tạo chất thải.
                            </p>
                        </div>

                        <div className={styles.ctaSection}>
                            <button className={styles.ctaButton}>Khám Phá Quy Trình</button>
                        </div>

                        {bottomImageSrc && (
                            <div className={styles.bottomImage}>
                                <img src={bottomImageSrc} alt="Buchaoh Process" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
