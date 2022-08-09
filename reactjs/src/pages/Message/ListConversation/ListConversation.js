import classNames from "classnames/bind";
import styles from './ListConversation.module.scss';
import { BackIcon, SettingIcon } from '~/components/Icons';
import ListItem from './ListItem';
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from '~/redux/actions/room';
import { useEffect } from "react";

const cx = classNames.bind(styles);

function ListConversation({ idRoom, handleClick, roomGetMess }) {
    const user_id = useSelector(state => state.user.currentUser.id);
    const rooms = useSelector(state => state.room.data);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user_id) {
            dispatch(getAllRooms(user_id));
        }
    }, [dispatch, user_id]);

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
                        <ListItem 
                            room={ Object.keys(roomGetMess).length > 0 && roomGetMess.room_id === room.room_id && roomGetMess.user_id === room.user_id ? roomGetMess : room } 
                            idRoom={idRoom} 
                            key={index} 
                            handleClick={handleClick} 
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ListConversation;