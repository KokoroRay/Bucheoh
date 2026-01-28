import { useState } from 'react';
import styles from './ContactPage.module.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

interface FormErrors {
    [key: string]: string;
}

export const ContactPage = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('contact.required');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('contact.required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('contact.emailInvalid');
        }

        if (!formData.subject.trim()) {
            newErrors.subject = t('contact.required');
        }

        if (!formData.message.trim()) {
            newErrors.message = t('contact.required');
        } else if (formData.message.trim().length < 10) {
            newErrors.message = t('contact.messageMin');
        }

        if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
            newErrors.phone = t('contact.emailInvalid');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Form submitted:', formData);
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className={styles.contactPage}>
                <div className={styles.container}>
                    <div className={styles.successMessage}>
                        <div className={styles.successIcon}>✓</div>
                        <h2>{t('contact.success')}</h2>
                        <p>{t('contact.success')}</p>
                        <button 
                            className={styles.backButton}
                            onClick={() => setSubmitted(false)}
                        >
                            {t('contact.send')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.contactPage}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{t('contact.title')}</h1>
                    <p className={styles.subtitle}>
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.contactInfo}>
                        <h3>{t('contact.info')}</h3>
                        
                        <div className={styles.contactItem}>
                            <FaMapMarkerAlt className={styles.icon} />
                            <div>
                                <h4>{t('contact.address')}</h4>
                                <p>{t('contact.addressDetail')}</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <FaEnvelope className={styles.icon} />
                            <div>
                                <h4>Email</h4>
                                <p>contact@buchaoh.vn</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <FaPhone className={styles.icon} />
                            <div>
                                <h4>Điện thoại</h4>
                                <p>+84 123 456 789</p>
                            </div>
                        </div>

                        <div className={styles.workingHours}>
                            <h4>Giờ làm việc</h4>
                            <p>Thứ 2 - Thứ 6: 8:00 - 17:00<br />Thứ 7: 8:00 - 12:00<br />Chủ nhật: Nghỉ</p>
                        </div>
                    </div>

                    <div className={styles.contactForm}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Họ và tên *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={errors.name ? styles.error : ''}
                                        placeholder="Nhập họ và tên của bạn"
                                    />
                                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={errors.email ? styles.error : ''}
                                        placeholder="Nhập địa chỉ email"
                                    />
                                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={errors.phone ? styles.error : ''}
                                        placeholder="Nhập số điện thoại (tùy chọn)"
                                    />
                                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="subject">Chủ đề *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className={errors.subject ? styles.error : ''}
                                    >
                                        <option value="">Chọn chủ đề</option>
                                        <option value="product">Thông tin sản phẩm</option>
                                        <option value="order">Đặt hàng</option>
                                        <option value="support">Hỗ trợ kỹ thuật</option>
                                        <option value="partnership">Hợp tác kinh doanh</option>
                                        <option value="other">Khác</option>
                                    </select>
                                    {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Nội dung tin nhắn *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={errors.message ? styles.error : ''}
                                    rows={6}
                                    placeholder="Nhập nội dung tin nhắn của bạn..."
                                />
                                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                            </div>

                            <button 
                                type="submit" 
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className={styles.spinner}></div>
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Gửi tin nhắn
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};