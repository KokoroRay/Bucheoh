import { useState } from 'react';
import styles from './LanguageSwitcher.module.css';

interface Language {
    code: string;
    name: string;
    flag: string;
}

export const LanguageSwitcher = () => {
    const [currentLang, setCurrentLang] = useState<string>('vi');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const languages: Language[] = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
    ];

    const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

    const handleLanguageChange = (langCode: string) => {
        setCurrentLang(langCode);
        setIsOpen(false);
        // TODO: Add actual language switching logic here
        console.log(`Switched to language: ${langCode}`);
    };

    return (
        <div className={styles.languageSwitcher}>
            <button 
                className={styles.currentLanguage}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Chọn ngôn ngữ"
            >
                <span className={styles.flag}>{currentLanguage.flag}</span>
                <span className={styles.code}>{currentLanguage.code.toUpperCase()}</span>
                <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
            </button>
            
            {isOpen && (
                <div className={styles.dropdown}>
                    {languages.map(language => (
                        <button
                            key={language.code}
                            className={`${styles.languageOption} ${currentLang === language.code ? styles.active : ''}`}
                            onClick={() => handleLanguageChange(language.code)}
                        >
                            <span className={styles.flag}>{language.flag}</span>
                            <span className={styles.name}>{language.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};