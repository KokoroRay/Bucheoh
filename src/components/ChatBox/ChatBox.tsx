import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../services/chatService';
import { ChatService } from '../../services/chatService';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './ChatBox.module.css';

export const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Call API
            const response = await ChatService.sendMessage(inputValue);

            // Add assistant message
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.reply,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);
            
            // Add error message
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: t('chat.error') || 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.chatContainer}>
            {/* Chat Button */}
            <button
                className={styles.chatButton}
                onClick={() => setIsOpen(!isOpen)}
                title={t('chat.title') || 'Chat với BUCHAOH'}
            >
                💬
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    {/* Header */}
                    <div className={styles.chatHeader}>
                        <h3 className={styles.chatTitle}>
                            {t('chat.title') || 'Chat với BUCHAOH'}
                        </h3>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={styles.messagesContainer}>
                        {messages.length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyStateIcon}>🥤</div>
                                <p className={styles.emptyStateText}>
                                    {t('chat.welcome') || 'Xin chào! Có điều gì tôi có thể giúp bạn?'}
                                </p>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`${styles.messageGroup} ${
                                            message.role === 'user'
                                                ? styles.userMessage
                                                : styles.assistantMessage
                                        }`}
                                    >
                                        <div
                                            className={`${styles.messageBubble} ${
                                                message.role === 'user'
                                                    ? styles.userBubble
                                                    : styles.assistantBubble
                                            }`}
                                        >
                                            {message.content}
                                        </div>
                                        <span className={styles.messageTime}>
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div
                                        className={`${styles.messageGroup} ${styles.assistantMessage}`}
                                    >
                                        <div className={styles.assistantBubble}>
                                            <span className={styles.loadingSpinner} />
                                            {t('chat.thinking') || 'Đang suy nghĩ...'}
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input */}
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            className={styles.inputField}
                            placeholder={t('chat.placeholder') || 'Nhập tin nhắn...'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isLoading) {
                                    handleSendMessage();
                                }
                            }}
                            disabled={isLoading}
                        />
                        <button
                            className={styles.sendButton}
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            title={t('chat.send') || 'Gửi'}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
