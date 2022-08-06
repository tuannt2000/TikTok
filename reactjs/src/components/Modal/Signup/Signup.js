import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { postEmailGoogle } from '~/redux/actions/login';

const cx = classNames.bind(styles);

function Signup() {
    const accessToken = useSelector(state => state.login.accessToken);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            birthday: ""
        },
        validationSchema: Yup.object({
            birthday: Yup.date()
                .required("Required!"),
        }),
        onSubmit: values => {
            dispatch(postEmailGoogle(
                {access_token: accessToken, birthday: values.birthday},
                (message) => onSuccess(message),
                (message) => onError(message)
            ));  
        }
    });

    const onSuccess = (message) => {
        console.log(message);
        window.location.reload();
    };

    const onError = (message) => {
        console.log(message);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className={cx('title')}>Ngày sinh của bạn là ngày nào?</div>
                <div className={cx('description')}>Ngày sinh của bạn sẽ không được hiển thị công khai.</div>
                <div>
                    <input
                        type="date"
                        name="birthday"
                        value={formik.values.birthday}
                        onChange={formik.handleChange}
                    />
                </div>
                {formik.errors.birthday && formik.touched.birthday && (
                    <p>{formik.errors.birthday}</p>
                )}
                <button className={cx('btn')} type="submit">Đăng ký</button>
            </form>
        </>
    );
}

export default Signup;