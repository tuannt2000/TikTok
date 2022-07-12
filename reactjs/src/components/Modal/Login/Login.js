import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Modal from 'react-bootstrap/Modal';
import { CloseIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import { useState } from "react";
import Button from '~/components/Button';
import { LOGIN } from '~/constants/Header';
import LoginItem from './LoginItem';
import {
    QrIcon, UserIcon, ShareFaceBookIcon,
    ShareTwitterIcon, GoogleIcon, ShareLineIcon,
    KakaoTalkIcon, AppleIcon, InstagramIcon
} from '~/components/Icons';

const cx = classNames.bind(styles);

function Login() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} primary>{LOGIN}</Button>
            <Modal className={cx('container')} show={show} onHide={handleClose}>
                <div className={cx('modal-mask')} />
                <div className={cx('wrapper')} >
                    <div className={cx('login-modal')}>
                        <div className={cx('login-container')}>
                            <div className={cx('div-login-container')}>
                                <div className={cx('title')}>Đăng nhập vào TikTok</div>
                                <LoginItem to='/login/qrcode' Icon={<QrIcon />} title='Sử dụng mã QR'/>
                                <LoginItem to='/login/phone-or-email/phone' Icon={<UserIcon />} title='Số điện thoại / Email / TikTok ID'/>
                                <LoginItem Icon={<ShareFaceBookIcon height='2rem' width='2rem' />} title='Tiếp tục với Facebook'/>
                                <LoginItem Icon={<GoogleIcon />} title='Tiếp tục với Google'/>
                                <LoginItem Icon={<ShareTwitterIcon height='2rem' width='2rem' />} title='Tiếp tục với Twitter'/>
                                <LoginItem Icon={<ShareLineIcon height='2rem' width='2rem' />} title='Tiếp tục với Line'/>
                                <LoginItem Icon={<KakaoTalkIcon />} title='Tiếp tục với KakaoTalk'/>
                                <LoginItem Icon={<AppleIcon />} title='Tiếp tục với Apple'/>
                                <LoginItem Icon={<InstagramIcon />} title='Tiếp tục với Instagram'/>
                            </div>
                        </div>
                        <div className={cx('footer')}>
                            <div>Bạn không có tài khoản?  </div>
                            <Link to='signup' className={cx('signup')}>
                                <span>Đăng ký</span>
                            </Link>
                        </div>
                    </div>
                    <div onClick={handleClose} className={cx('close-btn')}><CloseIcon /></div>
                </div>
            </Modal>
        </>
    );
}
export default Login;