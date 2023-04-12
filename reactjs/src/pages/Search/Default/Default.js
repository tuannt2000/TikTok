import classNames from "classnames/bind";
import styles from "./Default.module.scss";

const cx = classNames.bind(styles);

function Default() {

    return (
        <div className={cx('container')}>
            <div className={cx('video-feed')}>
                <div className={cx('block-container')}>
                    <div className={cx('title-container')}>
                        <h2 className={cx('top-video-title')}>Video</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Default;