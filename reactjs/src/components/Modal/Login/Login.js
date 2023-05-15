import LoginItem from './LoginItem';
import {
    QrIcon, UserIcon, ShareFaceBookIcon,
    ShareTwitterIcon, GoogleIcon, ShareLineIcon,
    KakaoTalkIcon, AppleIcon, InstagramIcon
} from '~/components/Icons';
import { useGoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { CLIENT_ID, FACEBOOK_APP_ID } from '~/constants/Login';
import { useDispatch, useSelector } from "react-redux";
import { postEmailGoogle, setAccessToken, setLoading } from '~/redux/actions/login';
import { useEffect } from 'react';
import "./login-facebook.css";

function Login({ handleSetMenu, data }) {
    const accessToken = useSelector(state => state.login.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken !== "") {
            dispatch(setLoading(true))
            dispatch(postEmailGoogle(
                {access_token: accessToken},
                (message) => onSuccess(message),
                (message) => onError(message)
            ));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

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
            dispatch(setAccessToken(response.accessToken));
        },
        onFailure: response => console.log(response),
        cookiePolicy: 'single_host_origin',
        autoLoad: false
    })

    const responseFacebook = (response) => {
        console.log(response);
        // dispatch(setAccessToken(response.accessToken));
    }

    return (
        <>
            <LoginItem to='/login/qrcode' Icon={<QrIcon />} title='Sử dụng mã QR' />
            <LoginItem to='/login/phone-or-email/phone' Icon={<UserIcon />} title='Số điện thoại / Email / TikTok ID' />
            <FacebookLogin
                appId={FACEBOOK_APP_ID}
                // xfbml={true}
                // cookie={true}
                // version={'v16.0'}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                icon={<ShareFaceBookIcon height='2rem' width='2rem' />}
                textButton={"Tiếp tục với Facebook"}
                tag={"div"}
                cssClass={"login-facebook"}
            />
            <LoginItem onClick={signIn} Icon={<GoogleIcon />} title='Tiếp tục với Google' />
            <LoginItem Icon={<ShareTwitterIcon height='2rem' width='2rem' />} title='Tiếp tục với Twitter' />
            <LoginItem Icon={<ShareLineIcon height='2rem' width='2rem' />} title='Tiếp tục với Line' />
            <LoginItem Icon={<KakaoTalkIcon />} title='Tiếp tục với KakaoTalk' />
            <LoginItem Icon={<AppleIcon />} title='Tiếp tục với Apple' />
            <LoginItem Icon={<InstagramIcon />} title='Tiếp tục với Instagram' />
        </>
    );
}

export default Login;