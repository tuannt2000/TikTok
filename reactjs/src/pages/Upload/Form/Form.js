import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import Caption from './Caption';

const cx = classNames.bind(styles);

function Form() {
    return (
        <div className={cx('container')}>
            <Caption />
        </div>
    );
}

export default Form;