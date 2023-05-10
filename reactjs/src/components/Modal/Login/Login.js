import LoginItem from './LoginItem';
import {
    QrIcon, UserIcon, ShareFaceBookIcon,
    ShareTwitterIcon, GoogleIcon, ShareLineIcon,
    KakaoTalkIcon, AppleIcon, InstagramIcon
} from '~/components/Icons';
import { useGoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '~/constants/Login';
import { useDispatch, useSelector } from "react-redux";
import { postEmailGoogle, setAccessToken } from '~/redux/actions/login';

function Login({ handleSetMenu, data }) {
    const accessToken = useSelector(state => state.login.accessToken)
    const dispatch = useDispatch();

    const loginByGoogle = () => {
        dispatch(postEmailGoogle(
            {access_token: accessToken},
            (message) => onSuccess(message),
            (message) => onError(message)
        ));
    }

    const onSuccess = (message) => {
        console.log(message);
        window.location.reload();
    };

    const onError = (message) => {
        console.log(message);
        handleSetMenu(data);
    };

    const { signIn } =  useGoogleLogin({
        clientId: CLIENT_ID,
        onSuccess: response => dispatch(setAccessToken(response.accessToken)),
        onFailure: response => console.log(response),
        cookiePolicy: 'single_host_origin',
        isSignedIn: true
    })

    return (
        <>
            <LoginItem to='/login/qrcode' Icon={<QrIcon />} title='Sử dụng mã QR' />
            <LoginItem to='/login/phone-or-email/phone' Icon={<UserIcon />} title='Số điện thoại / Email / TikTok ID' />
            <LoginItem Icon={<ShareFaceBookIcon height='2rem' width='2rem' />} title='Tiếp tục với Facebook' />
            <LoginItem onClick={loginByGoogle} Icon={<GoogleIcon />} title='Tiếp tục với Google' />
            <LoginItem Icon={<ShareTwitterIcon height='2rem' width='2rem' />} title='Tiếp tục với Twitter' />
            <LoginItem Icon={<ShareLineIcon height='2rem' width='2rem' />} title='Tiếp tục với Line' />
            <LoginItem Icon={<KakaoTalkIcon />} title='Tiếp tục với KakaoTalk' />
            <LoginItem Icon={<AppleIcon />} title='Tiếp tục với Apple' />
            <LoginItem Icon={<InstagramIcon />} title='Tiếp tục với Instagram' />
        </>
    );
}

export default Login;