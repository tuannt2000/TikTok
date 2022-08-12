import classNames from "classnames/bind";
import styles from "./Upload.module.scss";
import Uploader from "./Uploader";
import Form from "./Form";

const cx = classNames.bind(styles);

function Upload() {
    return (
        <div className={cx('container')}>
            <div className={cx('layout')}>
                <div className={cx('wrapper')}>
                    <div className={cx('container-v2')}>
                        <span className={cx('main-title')}>Tải video lên</span>
                        <div className={cx('sub-title')}>Đăng video vào tài khoản của bạn</div>
                        <div className={cx('content')}>
                            <Uploader />
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;