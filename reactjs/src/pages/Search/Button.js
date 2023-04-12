import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { ChevronDownIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function Button() {

    return (
        <div className={cx('more-container')}>
            <button className={cx('button-more')}>
                Tải thêm
                <ChevronDownIcon className={cx('chev-down-icon')} />
            </button>
        </div>
    );
}

export default Button;