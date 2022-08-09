import classNames from "classnames/bind";
import styles from './ChatBox.module.scss';
import { SendMessageIcon, EmojiIcon } from '~/components/Icons';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import Picker from 'emoji-picker-react';
import { sendMessage } from '~/redux/actions/room';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function ChatBottom({ room_id, user_id}) {
    const [message, setMessage] = useState('');
    const [focus, setFocus] = useState(false);
    const dispatch = useDispatch();

    const handleSendMessage = () => {
        if (!message) {
            alert('Please add a message');
            return;
        }
        dispatch(sendMessage({ room_id, user_id, message }));
        setMessage('');
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    }

    const onEmojiClick = (event, emojiObject) => {
        setMessage(prev => {
            return prev + emojiObject.emoji
        })
    };

    const renderIcons = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Picker onEmojiClick={onEmojiClick} />
        </div>
    )

    return (
        <div className={cx('chat-bottom')}>
            <div className={cx('input-container', { 'focus': focus })}>
                <div className={cx('editor-container')}>
                    <div className={cx('input-area-container')}>
                        <input
                            className={cx('message-text')}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            placeholder="Gửi tin nhắn..."
                            onKeyPress={handleKeyPress}
                        />
                        <Tippy
                            trigger='click'
                            interactive
                            delay={[0, 700]}
                            offset={[12, 8]}
                            placement='top-end'
                            render={renderIcons}
                        >
                            <div className={cx('emoji-icon')}>
                                <EmojiIcon />
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
            {message && <div className={cx('message-send')} onClick={handleSendMessage}><SendMessageIcon /></div>}
        </div>
    );
}

export default ChatBottom;