import styles from './AboutSection.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

interface AboutSectionProps {
    leftImageSrc?: string;
    bottomImageSrc?: string;
}

export const AboutSection = ({
    leftImageSrc,
    bottomImageSrc,
}: AboutSectionProps) => {
    const { t } = useLanguage();
    
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
                            {t('about.title')}
                        </h2>

                        <div className={styles.highlight}>
                            <p className={styles.tagline}>
                                {t('about.tagline')}
                            </p>
                        </div>

                        <p className={styles.description}>
                            {t('about.description')}
                        </p>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>🥤</div>
                                <div className={styles.featureContent}>
                                    <h3>{t('about.drinkTitle')}</h3>
                                    <p>{t('about.drinkDesc')}</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>🌱</div>
                                <div className={styles.featureContent}>
                                    <h3>{t('about.fertTitle')}</h3>
                                    <p>{t('about.fertDesc')}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.values}>
                            <h3 className={styles.valuesTitle}>{t('about.whyFruit')}</h3>
                            <div className={styles.valueGrid}>
                                <div className={styles.valueItem}>
                                    <span className={styles.valueIcon}>⚗️</span>
                                    <div>
                                        <strong>{t('about.technical')}</strong>
                                    </div>
                                </div>
                                <div className={styles.valueItem}>
                                    <span className={styles.valueIcon}>🌾</span>
                                    <div>
                                        <strong>{t('about.supply')}</strong>
                                    </div>
                                </div>
                                <div className={styles.valueItem}>
                                    <span className={styles.valueIcon}>🇻🇳</span>
                                    <div>
                                        <strong>{t('about.culture')}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.circularEconomy}>
                            <h3 className={styles.circularTitle}>{t('about.circularEconomy')}</h3>
                            <div className={styles.processFlow}>
                                <div className={styles.flowItem}>
                                    <span className={styles.flowIcon}>🥭</span>
                                    <span className={styles.flowText}>{t('about.freshFruit')}</span>
                                </div>
                                <div className={styles.flowArrow}>→</div>
                                <div className={styles.flowItem}>
                                    <span className={styles.flowIcon}>🥤</span>
                                    <span className={styles.flowText}>{t('about.fermentedDrink')}</span>
                                </div>
                                <div className={styles.flowArrow}>+</div>
                                <div className={styles.flowItem}>
                                    <span className={styles.flowIcon}>🌱</span>
                                    <span className={styles.flowText}>{t('about.bioFertilizer')}</span>
                                </div>
                            </div>
                            <p className={styles.circularDesc}>
                                {t('about.circularDesc')}
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
