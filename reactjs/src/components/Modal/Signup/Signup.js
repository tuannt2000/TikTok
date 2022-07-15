import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { Modal } from '~/components/Modal';
import { useDispatch } from "react-redux";
import { loginSuccess } from '~/redux/actions/login';
import { GoogleLogout } from "react-google-login";
import { CLIENT_ID } from '~/constants/Login';

const cx = classNames.bind(styles);

function Signup() {
    const dispatch = useDispatch();

    const handleClose = (renderProps) => {
        renderProps.onClick();
    };

    return (
        <GoogleLogout
            clientId={CLIENT_ID}
            render={renderProps => (
                <Modal
                    onClose={() => handleClose(renderProps)}
                    open={true}
                    title='Đăng ký'
                    signup
                >
                    <div className={cx('title')}>Ngày sinh của bạn là ngày nào?</div>
                    <div className={cx('description')}>Ngày sinh của bạn sẽ không được hiển thị công khai.</div>
                    <button className={cx('btn')} disabled>Tiếp</button>
                </Modal>
            )}
            onLogoutSuccess={() => {
                console.log('Logout google success');
                dispatch(loginSuccess());
            }}
        />
    );
}

export default Signup;