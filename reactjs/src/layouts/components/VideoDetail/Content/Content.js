import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import BottomComment from "./BottomComment";
import Comment from "./Comment";
import Header from "./Header";
import Main from "./Main";

const cx = classNames.bind(styles);

function Content({ video }) {

    return (
        <div className={cx('content-container')}>
            <Header video={video} />
            <Main video={video} />
            { video.comment ? (
                <>
                    <Comment video={video} />
                    <BottomComment video={video} />
                </>
            ) : (
                <div className={cx('div-error-message')}>Bình luận đã bị tắt</div>
            )}
        </div>
    );
}

export default Content;