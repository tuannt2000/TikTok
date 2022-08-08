import classNames from "classnames/bind";
import styles from './ListConversation.module.scss';
import { BackIcon, SettingIcon } from '~/components/Icons';
import ListItem from './ListItem';
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from '~/redux/actions/room';
import { useEffect } from "react";

const cx = classNames.bind(styles);

function ListConversation({ idRoom, handleClick }) {
    const user = useSelector(state => state.user.currentUser);
    const rooms = useSelector(state => state.room.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRooms(user.id));
    }, [dispatch, user]);

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('back-icon')}>
                <BackIcon />
            </div>
            <div className={cx('header')}>
                <h3 className={cx('title')}>Tin nhắn</h3>
                <SettingIcon className={cx('setting-icon')} />
            </div>
            <div className={cx('content')}>
                {rooms.length > 0 &&
                    rooms.map((room, index) => (
                        <ListItem room={room} idRoom={idRoom} key={index} handleClick={handleClick} />
                    ))
                }
            </div>
        </div>
    );
}

export default ListConversation;