import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import PropTypes from 'prop-types';
import Button from "~/components/Button";
import { DiscoverStyleMusicIcon } from "~/components/Icons";
import { useRef } from "react";
import { setAlertMessage } from '~/redux/actions/user';
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

function Main({ video }) {
    const dispatch = useDispatch();
    
    const linkRef = useRef();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(linkRef.current.innerText);
        dispatch(setAlertMessage('Đã sao chép'))
    }

    return (
        <div className={cx('main-content')}>
            <div className={cx('main-content-wrapper')}>
                <div className={cx('main-content-text')}>
                    <div className={cx('main-content-overflow')}>
                        <span className={cx('main-content-span-text')}>{ video.description }</span>
                    </div>
                </div>
            </div>
            <h4 className={cx('video-music')}>
                <Button to='test' className={cx('video-music-btn')} leftIcon={<DiscoverStyleMusicIcon />}>オリジナル楽曲 - りみー(RiMy) / ASOBI同盟</Button>
            </h4>
            <div className={cx('main-content-container')}>
                <div className={cx('main-content-icon')}>

                </div>
                <div className={cx('main-content-copy-link')}>
                    <p className={cx('browse-video-link')} ref={linkRef}>
                        { window.location.href + '/@' + video.user.nickname + '/video/' + video.id  }
                    </p>
                    <button className={cx('browse-copy')} onClick={handleCopyLink}>Sao chép liên kết</button>
                </div>
            </div>
        </div>
    );
}

Main.propTypes = {
    video: PropTypes.object.isRequired
};

export default Main;