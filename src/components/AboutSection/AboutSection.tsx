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
                            BUCHAOH – Từ lên men xanh đến mùa vụ lành
                        </h2>

                        <p className={styles.description}>
                            BUCHAOH là thương hiệu cung cấp nước và phân bón sinh học từ quá
                            trình lên men trái cây với men vi sinh tự nhiên, mang đến giải
                            pháp nuôi dưỡng đất và cây trồng theo hướng bền vững, an toàn và
                            thân thiện với môi trường.
                        </p>

                        <button className={styles.ctaButton}>Xem thêm</button>

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
