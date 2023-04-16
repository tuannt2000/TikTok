import classNames from "classnames/bind";
import styles from "./Form.module.scss";

const cx = classNames.bind(styles);

function Button({ handleUpload, handleChange, url }) {

    return (
        <div className={cx('button-row')}>
            <div className={cx('btn-cancel')}>
                <button 
                    className={cx('css-35jbna')}
                    onClick={() => handleChange('')}
                >
                    <div className={cx('css-1db5cpb')}>
                        <div className={cx('css-1z070dx')}>Hủy bỏ</div>
                    </div>
                </button>
            </div>
            <div className={cx('btn-post')}>
                <button
                    type="submit"
                    disabled={!Boolean(url)} 
                    className={cx('css-y1m958')}
                    onClick={handleUpload}
                >
                    <div className={cx('css-1db5cpb')}>
                        <div className={cx('css-1z070dx')}>Đăng</div>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Button;