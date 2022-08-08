import classNames from "classnames/bind";
import styles from './ChatBox.module.scss';
import Avatar from '~/components/Avatar/Avatar';
import { MoreIcon } from '~/components/Icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Messagebox({ message, user_id }) {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className={cx('chat-item-wrapper')}>
            <div 
                className={cx('message-container', {'me' : user_id === message.user_id})}
                onMouseEnter={() => setShowMore(true)} 
                onMouseLeave={() => setShowMore(false)}
            >
                <Avatar
                    data={
                        {
                            nickname: message.nickname,
                            avatar: message.avatar
                        }
                    }
                    to
                    size={32}
                />
                <div className={cx('text-container', {'me' : user_id === message.user_id})}>
                    <p className={cx('text')}>{message.text}</p>
                </div>
                {showMore && (
                    <div className={cx('more')}>
                        <MoreIcon />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Messagebox;