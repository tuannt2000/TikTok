import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginNormal, register } from '~/redux/actions/login';
import { ErrorIcon, HidePasswordIcon, ShowPasswordIcon } from '~/components/Icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

const registerFormik = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
}

const loginFormik = {
    email: "",
    password: "",
}

const registerValidate = {
    first_name: Yup
        .string()
        .required('Trường bắt buộc'),
    last_name: Yup
        .string()
        .required('Trường bắt buộc'),
    email: Yup
        .string()
        .email('Nhập địa chỉ email hợp lệ'),
    password: Yup
        .string()
        .min(8, "Password tối thiểu 8 ký tự")
        .max(20, "Password tối đa 20 ký tự"),
}

const loginValidate = {
    email: Yup
        .string()
        .email('Nhập địa chỉ email hợp lệ'),
    password: Yup
        .string()
        .min(8, "Password tối thiểu 8 ký tự")
        .max(20, "Password tối đa 20 ký tự"),
}

function Signup({ registerState }) {
    const [focusEmail, setFocusEmail] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: registerState ? registerFormik : loginFormik,
        validationSchema: Yup.object(registerState ? registerValidate : loginValidate),
        onSubmit: values => {
            if (registerState) {
                dispatch(register(
                    {email: values.email, password: values.password, first_name: values.first_name, last_name: values.last_name},
                    (message) => onSuccess(message),
                    (message) => onError(message)
                ));  
            } else {
                dispatch(loginNormal(
                    {email: values.email, password: values.password},
                    (message) => onSuccess(message),
                    (message) => onError(message)
                ));  
            }
        }
    });

    const onSuccess = (message) => {
        console.log(message);
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    };

    const onError = (message) => {
        console.log(message);
        registerState ? formik.setErrors({email:"Email đã tồn tại"}) : formik.setErrors({email:"Email không chính xác"})
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            {registerState && (
                <div className={cx('d-flex')}>
                    <div className={cx('div-email-container', {'pe-1': true})}>
                        <div className={cx('div-description')}>First name</div>
                        <div className={cx('div-input-container')}>
                            <input 
                                type="text" 
                                placeholder="First name"
                                name="first_name" 
                                className={cx('input-container', {'invalid': formik.errors.first_name && formik.touched.first_name})} 
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                            />
                            <div className={cx('div-icon-container')}>
                                {formik.errors.first_name && formik.touched.first_name && (
                                    <ErrorIcon />
                                )}
                            </div>
                        </div>
                        {formik.errors.first_name && formik.touched.first_name && (
                            <div className={cx('div-text-container', {'invalid': true})}>
                                <span>{formik.errors.first_name}</span>
                            </div>
                        )}
                    </div>
                    <div className={cx('div-email-container', {'ps-1': true})}>
                        <div className={cx('div-description')}>Last name</div>
                        <div className={cx('div-input-container')}>
                            <input 
                                type="text" 
                                placeholder="Last name"
                                name="last_name" 
                                className={cx('input-container', {'invalid': formik.errors.last_name && formik.touched.last_name})} 
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                            />
                            <div className={cx('div-icon-container')}>
                                {formik.errors.last_name && formik.touched.last_name && (
                                    <ErrorIcon />
                                )}
                            </div>
                        </div>
                        {formik.errors.last_name && formik.touched.last_name && (
                            <div className={cx('div-text-container', {'invalid': true})}>
                                <span>{formik.errors.last_name}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className={cx('div-description')}>Email</div>
            <div className={cx('div-email-container')}>
                <div className={cx('div-input-container')}>
                    <input 
                        type="text" 
                        placeholder="Địa chỉ email" 
                        autoComplete="email" 
                        name="email" 
                        className={cx('input-container', {'invalid': !focusEmail && formik.errors.email && formik.touched.email})} 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onFocus={() => setFocusEmail(true) }
                        onBlur={() => setFocusEmail(false) }
                    />
                    <div className={cx('div-icon-container')}>
                        {!focusEmail && formik.errors.email && formik.touched.email && (
                            <ErrorIcon />
                        )}
                    </div>
                </div>
                {!focusEmail && formik.errors.email && formik.touched.email && (
                    <div className={cx('div-text-container', {'invalid': true})}>
                        <span>{formik.errors.email}</span>
                    </div>
                )}
            </div>
            <div className={cx('div-description')}>Password</div>
            <div className={cx('div-container')}>
                <div className={cx('div-input-container')}>
                    <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"  
                        autoComplete="new-password"  
                        name="password" 
                        className={cx('input-container', {'invalid': !focusPassword && formik.errors.password && formik.touched.password})}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onFocus={() => setFocusPassword(true) }
                        onBlur={() => setFocusPassword(false) }
                    />
                    <div className={cx('div-icon-container')}>
                        {!focusPassword && formik.errors.password && formik.touched.password && (
                            <ErrorIcon />
                        )}
                        <i 
                            className={cx('password-icon')}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {!showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                        </i>
                    </div>
                </div>
                {!focusPassword && formik.errors.password && formik.touched.password && (
                    <div className={cx('div-text-container', {'invalid': true})}>
                        <span>{formik.errors.password}</span>
                    </div>
                )}
            </div>
            <button className={cx('btn')} disabled={!formik.values.email || !formik.values.password} type="submit">{ registerState ? 'Đăng ký' : 'Đăng nhập'}</button>
        </form>
    );
}

export default Signup;