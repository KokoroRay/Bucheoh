import styles from './Footer.module.css';
// 1. Import các icon cần thiết
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Section - Giữ nguyên */}
                    <div className={styles.brandSection}>
                        <h3 className={styles.brandName}>BUCHAOH</h3>
                        <p className={styles.brandTagline}>Từ lên men xanh đến mùa vụ lành</p>
                        <p className={styles.description}>
                            Thương hiệu cung cấp nước và phân bón sinh học từ quá trình lên men trái cây với men vi sinh tự nhiên.
                        </p>
                    </div>

                    {/* Quick Links - Giữ nguyên */}
                    <div className={styles.linksSection}>
                        <h4 className={styles.sectionTitle}>Liên kết nhanh</h4>
                        <ul className={styles.linksList}>
                            <li><a href="#products" className={styles.link}>Sản phẩm</a></li>
                            <li><a href="#about" className={styles.link}>Về chúng tôi</a></li>
                            <li><a href="#blog" className={styles.link}>Blog</a></li>
                            <li><a href="#contact" className={styles.link}>Liên hệ</a></li>
                        </ul>
                    </div>

                    {/* Contact Info - Đã thay icon */}
                    <div className={styles.contactSection}>
                        <h4 className={styles.sectionTitle}>Liên hệ</h4>
                        <ul className={styles.contactList}>
                            <li className={styles.contactItem}>
                                <span className={styles.contactIcon}><MdLocationOn /></span>
                                <span>Cần Thơ, Việt Nam</span>
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.contactIcon}><MdEmail /></span>
                                <span>contact@buchaoh.vn</span>
                            </li>
                            <li className={styles.contactItem}>
                                <span className={styles.contactIcon}><MdPhone /></span>
                                <span>+84 123 456 789</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links - Đã thay icon */}
                    <div className={styles.socialSection}>
                        <h4 className={styles.sectionTitle}>Theo dõi chúng tôi</h4>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialLink} aria-label="Facebook">
                                <span className={styles.socialIcon}><FaFacebookF /></span>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram">
                                <span className={styles.socialIcon}><FaInstagram /></span>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="YouTube">
                                <span className={styles.socialIcon}><FaYoutube /></span>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Zalo">
                                <span className={styles.socialIcon}><SiZalo /></span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                {/* Bottom Section - Giữ nguyên */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>© {currentYear} BUCHAOH. All rights reserved.</p>
                    <p className={styles.credits}>Developed by FPT Students</p>
                </div>
            </div>
        </footer>
    );
};