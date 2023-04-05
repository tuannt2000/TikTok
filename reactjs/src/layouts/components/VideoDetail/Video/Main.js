import classNames from "classnames/bind";
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Main({ video }) {
    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('div-container')}>
                <img src={video.cover_image} className={cx('img-poster')} alt="" />
                <div className={cx('div-basic-player-wrapper')}>
                    <video src={video.url}></video>
                </div>
            </div>
        </div>
    );
}

export default Main;