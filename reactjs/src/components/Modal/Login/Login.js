import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import LoginItem from './LoginItem';
import {
    QrIcon, UserIcon, ShareFaceBookIcon,
    ShareTwitterIcon, GoogleIcon, ShareLineIcon,
    KakaoTalkIcon, AppleIcon, InstagramIcon
} from '~/components/Icons';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '~/constants/Login';
import { hideModalLogin} from '~/redux/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin } from '~/redux/slices/loginSlice';
import { Modal } from '~/components/Modal';

const cx = classNames.bind(styles);

function Login() {
    const modalSlice = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const hanleSussess = (response) => {
        console.log(response);
        dispatch(checkLogin());
        dispatch(hideModalLogin());
    };

    const hanleFailure = (response) => {
        console.log(response)
    };

    return (
        <>
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={() => console.log('Logout oke')}
            />
            <Modal
                onClose={() => dispatch(hideModalLogin())}
                open={modalSlice.modalLogin}
                title='Đăng nhập vào TikTok'
                login
            >
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
            </Modal>
        </>
    );
}

export default Login;