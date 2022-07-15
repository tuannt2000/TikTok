import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { DialogTitle} from "@mui/material";
import { Link } from "react-router-dom";
import { CloseIcon, ArrowLeftIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Signup({ hanleHide }) {
    return (
        <>
            <div onClick={() => hanleHide(true)} className={cx('div-back')}>
                <ArrowLeftIcon />
            </div>
            <div className={cx('modal-main')}>
                <div className={cx('modal-container')}>
                    <div className={cx('div-modal-container')}>
                        <DialogTitle className={cx('title')}>Đăng ký</DialogTitle>
                        <div className={cx('title')}>Ngày sinh của bạn là ngày nào?</div>
                        <div className={cx('description')}>Ngày sinh của bạn sẽ không được hiển thị công khai.</div>
                        <button className={cx('btn')} disabled>Tiếp</button>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div>Bạn đã có tài khoản?</div>
                    <Link to='login' className={cx('signup')}>
                        <span>Đăng nhập</span>
                    </Link>
                </div>
            </div>
            <div onClick={() => hanleHide(false)} className={cx('close-btn')}><CloseIcon /></div>
        </>
    );
}

export default Signup;