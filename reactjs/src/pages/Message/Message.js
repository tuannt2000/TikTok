import classNames from "classnames/bind";
import styles from './Message.module.scss';

import { useState } from 'react';
import Pusher from 'pusher-js';
import ListConversation from './ListConversation';
import ChatBox from './ChatBox';
import { useDispatch } from "react-redux";
import { getAllMessages } from '~/redux/actions/room';

const cx = classNames.bind(styles);

function Message() {
    const [idRoom, setIdRoom] = useState(-1);
    const dispatch = useDispatch();

    const handleClick = (idRoom) => {
        setIdRoom(idRoom);
        dispatch(getAllMessages(idRoom));
    };

    return (
        <div className={cx('content')}>
            <ListConversation idRoom={idRoom} handleClick={handleClick} />
            <ChatBox idRoom={idRoom} />
        </div>
    );
}

export default Message;