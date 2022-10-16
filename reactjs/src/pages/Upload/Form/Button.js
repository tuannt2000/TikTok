import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import { useDispatch } from 'react-redux';
import { uploadVideo } from '~/redux/actions/video';

const cx = classNames.bind(styles);

function Button({event, url, hanleChange}) {
    const dispatch = useDispatch();
    
    const handleUpload = () => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = function() {
            dispatch(uploadVideo({url: reader.result, name: event.target.files[0].name}));
        }
    }

    return (
        <div className={cx('button-row')}>
            <div className={cx('btn-cancel')}>
                <button 
                    className={cx('css-35jbna')}
                    onClick={() => hanleChange()}
                >
                    <div className={cx('css-1db5cpb')}>
                        <div className={cx('css-1z070dx')}>Hủy bỏ</div>
                    </div>
                </button>
            </div>
            <div className={cx('btn-post')}>
                <button 
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