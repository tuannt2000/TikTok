import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import LoginItem from './LoginItem';
import {
    QrIcon, UserIcon, ShareFaceBookIcon,
    ShareTwitterIcon, GoogleIcon, ShareLineIcon,
    KakaoTalkIcon, AppleIcon, InstagramIcon
} from '~/components/Icons';
import { GoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '~/constants/Login';
import { useDispatch } from "react-redux";
import { postEmailGoogle, loginSuccess } from '~/redux/actions/login';
import { DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { CloseIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Login({ hanleHide }) {
    const dispatch = useDispatch();

    const hanleSussess = (response) => {
        console.log(response);
        dispatch(postEmailGoogle(
            { access_token: response.accessToken },
            (message) => onSuccess(message),
            (message) => onError(message)
        ))
        dispatch(loginSuccess(true));
    };

    const onSuccess = (message) => {
        console.log(message);
    };

    const onError = (message) => {
        console.log(message);
    };

    const hanleFailure = (response) => {
        console.log(response)
    };

    return (
        <>
            <div className={cx('modal-main')}>
                <div className={cx('modal-container')}>
                    <div className={cx('div-modal-container')}>
                        <DialogTitle className={cx('title')}>Đăng nhập vào TikTok</DialogTitle>
                        <LoginItem to='/login/qrcode' Icon={<QrIcon />} title='Sử dụng mã QR' />
                        <LoginItem to='/login/phone-or-email/phone' Icon={<UserIcon />} title='Số điện thoại / Email / TikTok ID' />
                        <LoginItem Icon={<ShareFaceBookIcon height='2rem' width='2rem' />} title='Tiếp tục với Facebook' />
                        <GoogleLogin
                            className={cx('box-container')}
                            render={renderProps => (
                                <LoginItem onClick={renderProps.onClick} Icon={<GoogleIcon />} title='Tiếp tục với Google' />
                            )}
                            clientId={CLIENT_ID}
                            onSuccess={hanleSussess}
                            onFailure={hanleFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                        <LoginItem Icon={<ShareTwitterIcon height='2rem' width='2rem' />} title='Tiếp tục với Twitter' />
                        <LoginItem Icon={<ShareLineIcon height='2rem' width='2rem' />} title='Tiếp tục với Line' />
                        <LoginItem Icon={<KakaoTalkIcon />} title='Tiếp tục với KakaoTalk' />
                        <LoginItem Icon={<AppleIcon />} title='Tiếp tục với Apple' />
                        <LoginItem Icon={<InstagramIcon />} title='Tiếp tục với Instagram' />
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div>Bạn không có tài khoản?</div>
                    <Link to='signup' className={cx('signup')}>
                        <span>Đăng ký</span>
                    </Link>
                </div>
            </div>
            <div onClick={() => hanleHide(false)} className={cx('close-btn')}><CloseIcon /></div>
        </>
    );
}

export default Login;