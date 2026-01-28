import styles from './Hero.module.css';

interface HeroProps {
    imageSrc?: string;
}

export const Hero = ({ imageSrc }: HeroProps) => {
    return (
        <section className={styles.hero}>
            {imageSrc && (
                <div className={styles.imageWrapper}>
                    <img
                        src={imageSrc}
                        alt="Hero Banner"
                        className={styles.image}
                    />
                </div>
            )}
        </section>
    );
};
