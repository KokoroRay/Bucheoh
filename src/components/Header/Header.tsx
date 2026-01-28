import { useState, useEffect } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    logoSrc?: string;
}

export const Header = ({ logoSrc }: HeaderProps) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'SẢN PHẨM', href: '#products' },
        { label: 'VỀ GIỚI THIỆU', href: '#about' },
        { label: 'BLOG', href: '#blog' },
        { label: 'LIÊN HỆ', href: '#contact' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    {logoSrc && <img src={logoSrc} alt="FPT Polytechnic Logo" />}
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className={styles.navLink}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
