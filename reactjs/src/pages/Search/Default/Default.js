import classNames from "classnames/bind";
import styles from "./Default.module.scss";

const cx = classNames.bind(styles);

function Default() {

    return (
        <div className={cx('container')}>
            Default
        </div>
    );
}

export default Default;