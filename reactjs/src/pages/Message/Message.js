import classNames from "classnames/bind";
import styles from './Message.module.scss';

const cx = classNames.bind(styles);

function Message() {
    return (  
        <div className={cx('wrapper')}>
            Message
        </div>
    );
}

export default Message;