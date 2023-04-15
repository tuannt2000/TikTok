import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import { Link } from 'react-router-dom';
import Button from "~/components/Button";
import PropTypes from 'prop-types';
import Avatar from "~/components/Avatar";
import { AccountOffer } from "~/components/Popper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postFollow } from "~/redux/actions/user";

const cx = classNames.bind(styles);

function Header({ video }) {
    const [follow, setFollow] = useState(video.user.following);
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setFollow(video.user.following);
    }, [video.user.following])

    const handClick = () => {
        dispatch(postFollow({
            user_follower_id: video.user.id
        }));
    }

    return (
        <div className={cx('info-container')}>
            <AccountOffer home data={video.user} className={'mr-avatar'}>
                <Avatar
                    data={video.user}
                    size={40}
                />
            </AccountOffer>
            <Link to={'@' + video.user.nickname} className={cx('author-anchor')}>
                <span className={cx('browse-username')}>{ video.user.full_name }</span>
                <span className={cx('browser-nickname')}>{ video.user.nickname }</span>
            </Link>
            {video.user.id !== user.id && (
                <Button className={cx('follow-btn')} onClick={handClick} outline>{ follow ? 'Đang follow' : 'Follow' }</Button>
            )}
        </div>
    );
}

Header.propTypes = {
    video: PropTypes.object.isRequired
};

export default Header;