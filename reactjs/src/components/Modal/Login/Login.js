import LoginItem from './LoginItem';
import {
    QrIcon, UserIcon, ShareFaceBookIcon,
    ShareTwitterIcon, GoogleIcon, ShareLineIcon,
    KakaoTalkIcon, AppleIcon, InstagramIcon
} from '~/components/Icons';
import { useGoogleLogin } from 'react-google-login';
import { CLIENT_ID } from '~/constants/Login';
import { useDispatch, useSelector } from "react-redux";
import { postEmailGoogle, setAccessToken, setLoading } from '~/redux/actions/login';
import { useEffect, useState } from 'react';

function Login({ handleSetMenu, data }) {
    const accessToken = useSelector(state => state.login.accessToken);
    const [click, setClick] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken !== "") {
            dispatch(setLoading(true))
            dispatch(postEmailGoogle(
                {access_token: accessToken},
                (message) => onSuccess(message),
                (message) => onError(message)
            ));
            setClick(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    useEffect(() => {
        if (click) {
            signIn();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [click])

    const onSuccess = (message) => {
        console.log(message);
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    };

    const onError = (message) => {
        console.log(message);
        // handleSetMenu(data);
    };

    const { signIn } = useGoogleLogin({
        clientId: CLIENT_ID,
        onSuccess: response => {
            click && dispatch(setAccessToken(response.accessToken))
        },
        onFailure: response => console.log(response),
        cookiePolicy: 'single_host_origin',
        isSignedIn: true
    })

    return (
        <>
            <LoginItem to='/login/qrcode' Icon={<QrIcon />} title='Sử dụng mã QR' />
            <LoginItem to='/login/phone-or-email/phone' Icon={<UserIcon />} title='Số điện thoại / Email / TikTok ID' />
            <LoginItem Icon={<ShareFaceBookIcon height='2rem' width='2rem' />} title='Tiếp tục với Facebook' />
            <LoginItem onClick={() => setClick(true)} Icon={<GoogleIcon />} title='Tiếp tục với Google' />
            <LoginItem Icon={<ShareTwitterIcon height='2rem' width='2rem' />} title='Tiếp tục với Twitter' />
            <LoginItem Icon={<ShareLineIcon height='2rem' width='2rem' />} title='Tiếp tục với Line' />
            <LoginItem Icon={<KakaoTalkIcon />} title='Tiếp tục với KakaoTalk' />
            <LoginItem Icon={<AppleIcon />} title='Tiếp tục với Apple' />
            <LoginItem Icon={<InstagramIcon />} title='Tiếp tục với Instagram' />
        </>
    );
}

export default Login;