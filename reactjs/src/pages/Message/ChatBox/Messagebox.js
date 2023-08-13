import classNames from "classnames/bind";
import styles from './ChatBox.module.scss';
import Avatar from '~/components/Avatar/Avatar';
import { MoreIcon } from '~/components/Icons';
import { useState } from 'react';
import Video from "./Video";
import Tippy from "@tippyjs/react";
import { formatTimeComment } from "~/utils/utility";
import { useDispatch } from "react-redux";
import { deleteMessage } from "~/redux/actions/room";

const cx = classNames.bind(styles);

function Messagebox({ message, user_id }) {
    const [showMore, setShowMore] = useState(false);
    const dispatch = useDispatch();

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
                {message.video !== null && message.deleted_at === null ? (
                    <Video video={message.video} me={user_id === message.user_id} />
                ) : (
                    <div className={cx('text-container', {'me' : user_id === message.user_id})}>
                        <Tippy
                            interactive
                            placement='top'
                            content={formatTimeComment(message.created_at)}
                        >
                            <p className={cx('text')}>{message.deleted_at ? 'Tin nhắn đã bị xóa' : message.text}</p>
                        </Tippy>
                    </div>
                )}
                {(showMore && user_id === message.user_id && message.deleted_at === null) && (
                    <Tippy
                        interactive
                        placement='top'
                        content={(
                            <div 
                                className={cx('menu-item')}
                                onClick={() => dispatch(deleteMessage({id: message.id}))}
                            >
                                Xóa
                            </div>
                        )}
                    >
                        <div className={cx('more')}>
                            <MoreIcon />
                        </div>
                    </Tippy>
                )}
            </div>
        </div>
    );
}

export default Messagebox;