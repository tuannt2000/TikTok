import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { CloseIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Button from '~/components/Button';
import { LOGIN } from '~/constants/Header';
import LoginItem from './LoginItem';
import {
    QrIcon, UserIcon, ShareFaceBookIcon,
    ShareTwitterIcon, GoogleIcon, ShareLineIcon,
    KakaoTalkIcon, AppleIcon, InstagramIcon
} from '~/components/Icons';
import { DialogTitle, Alert } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '~/constants/Login';
import { Modal } from '~/components/Modal';

const cx = classNames.bind(styles);

function Login() {
    const [show, setShow] = useState(false);
    const [loginFail, setLoginFail] = useState(false);

    useEffect(() => {
        const time = setTimeout(() => {
            setLoginFail(false);
        }, 3000);

        return () => {
            clearTimeout(time);
        };
    });

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const hanleSussess = (response) => {
        console.log(response);
    };

    const hanleFailure = () => {
        setLoginFail(true);
    };

    return (
        <>
            <Button onClick={handleShow} primary>{LOGIN}</Button>
            <Modal handleClose={handleClose} show={show}>
                {loginFail && (
                    <Alert variant="filled" severity="error">
                        Login Fail
                    </Alert>
                )}
                <div className={cx('login-modal')}>
                    <div className={cx('login-container')}>
                        <div className={cx('div-login-container')}>
                            <DialogTitle className={cx('title')}>Đăng nhập vào TikTok</DialogTitle>
                            <LoginItem to='/login/qrcode' Icon={<QrIcon />} title='Sử dụng mã QR'/>
                            <LoginItem to='/login/phone-or-email/phone' Icon={<UserIcon />} title='Số điện thoại / Email / TikTok ID'/>
                            <LoginItem Icon={<ShareFaceBookIcon height='2rem' width='2rem' />} title='Tiếp tục với Facebook'/>
                            <GoogleLogin
                                className={cx('box-container')}
                                render={renderProps => (
                                    <LoginItem onClick={renderProps.onClick} Icon={<GoogleIcon />} title='Tiếp tục với Google'/>
                                )}
                                clientId={CLIENT_ID}
                                onSuccess={hanleSussess}
                                onFailure={hanleFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />
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
            </Modal>
        </>
    );
}
export default Login;