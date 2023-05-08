import classNames from "classnames/bind";
import styles from "./Privacy.module.scss";

const cx = classNames.bind(styles);

function Select({ title, description }) {
    return (
        <li className={cx('li-option-container')}>
            <p className={cx('p-option-title')}>{ title }</p>
            <p className={cx('p-option-desc')}>{ description }</p>
        </li>
    );
}

export default Select;
