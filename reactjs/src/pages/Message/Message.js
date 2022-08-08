import classNames from "classnames/bind";
import styles from './Message.module.scss';

import { useState } from 'react';
import Pusher from 'pusher-js';
import ListConversation from './ListConversation';
import ChatBox from './ChatBox';

const cx = classNames.bind(styles);

function Message() {
    const [idRoom, setIdRoom] = useState(-1);

    const handleClick = (idRoom) => {
        setIdRoom(idRoom);
    }

    return (
        <div className={cx('content')}>
            <ListConversation handleClick={handleClick} />
            <ChatBox idRoom={idRoom} />
        </div>
    );
}

export default Message;