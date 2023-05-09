import classNames from "classnames/bind";
import styles from "./Privacy.module.scss";

const cx = classNames.bind(styles);

function Select({ item, handleChangeSelectMenu }) {
    return (
        <li 
            className={cx('li-option-container')}
            onClick={() => handleChangeSelectMenu(item.video_status)}
        >
            <p className={cx('p-option-title')}>{ item.title }</p>
            <p className={cx('p-option-desc')}>{ item.description }</p>
        </li>
    );
}

export default Select;
