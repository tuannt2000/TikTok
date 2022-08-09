import classNames from "classnames/bind";
import styles from './ChatBox.module.scss';
import Messagebox from "./Messagebox";
import { useSelector } from "react-redux";
import Avatar from '~/components/Avatar';
import ChatBottom from "./ChatBottom";

const cx = classNames.bind(styles);

function ChatBox({ room }) {
    const user_id = useSelector(state => state.user.currentUser.id);
    const listMessages = useSelector(state => state.room.listMessages);
    const room_id = room.room_id;

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
                    <ChatBottom room_id={room_id} user_id={user_id} />           
                </>
            )}
        </div>
    );
}

export default ChatBox;