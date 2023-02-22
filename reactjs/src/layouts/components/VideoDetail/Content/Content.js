import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import Header from "./Header";
import Main from "./Main";

const cx = classNames.bind(styles);

function Content({ video }) {

    return (
        <div className={cx('content-container')}>
            <Header video={video} />
            <Main video={video} />
        </div>
    );
}

export default Content;