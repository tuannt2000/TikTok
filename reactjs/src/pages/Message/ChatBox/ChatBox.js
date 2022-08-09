import classNames from "classnames/bind";
import styles from './ChatBox.module.scss';
import { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Messagebox from "./Messagebox";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, setAllMessagesAfterSend } from '~/redux/actions/room';
import Avatar from '~/components/Avatar';
import { SendMessageIcon, EmojiIcon } from '~/components/Icons';
import Picker from 'emoji-picker-react';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function ChatBox({ room }) {
    const [message, setMessage] = useState('');
    const [focus, setFocus] = useState(false);
    const user_id = useSelector(state => state.user.currentUser.id);
    const listMessages = useSelector(state => state.room.listMessages);
    const dispatch = useDispatch();
    const room_id = room.room_id;

    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_MIX_ABLY_PUBLIC_KEY,
            wsHost: 'realtime-pusher.ably.io',
            wsPort: 443,
            disableStats: true,
            encrypted: true,
            auth: {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        });

        echo
            .channel(`room.${room_id}`)
            .subscribed(() => {
                console.log('You are subscribed');
            })
            .listen('.message.new', (data) => {
                dispatch(setAllMessagesAfterSend(data));
                setMessage('');
            });

        return () => {
            echo.leave(`room.${room_id}`)
        }
    }, [dispatch, room_id]);

    const handleSendMessage = () => {
        if (!message) {
            alert('Please add a message');
            return;
        }
        dispatch(sendMessage({ room_id, user_id, message }));
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
        <div className={cx('wrapper')}>
            {room_id && (
                <>
                    <div className={cx('header')}>
                        <Avatar
                            data={
                                {
                                    nickname: room.nickname,
                                    avatar: room.avatar
                                }
                            }
                            to={false}
                            href
                            size={48}
                        />
                        <a target="_blank" href={`@${room.nickname}`} rel="noreferrer" className={cx('name-container')}>
                            <div className={cx('name')}>
                                <p className={cx('nickname')}>{room.nickname}</p>
                                <p className={cx('uniqueid')}>@{room.nickname}</p>
                            </div>
                        </a>
                    </div>
                    <div className={cx('chat-main')}>
                        {listMessages.length > 0 && listMessages.map((message, index) => (
                            <Messagebox user_id={user_id} key={index} message={message} />
                        ))}
                    </div>
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
                </>
            )}
        </div>
    );
}

export default ChatBox;