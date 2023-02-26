import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar/Avatar';
import { AccountOffer } from "~/components/Popper";
import { ChevronDownIcon } from "~/components/Icons"

const cx = classNames.bind(styles);

function Comment({ video }) {

    return (
       <div className={cx('comment-list-container')}>
            <div className={cx('comment-item-container')}>
                <div className={cx('comment-content-container')}>
                    <AccountOffer home data={video.user} className={'mr-avatar'}>
                        <Avatar
                            data={video.user}
                            size={40}
                        />
                    </AccountOffer>
                    <div className={cx('comment-content-wrapper')}>
                        <Link to={'@' + video.user.nickname} className={cx('author-anchor')}>
                            <span className={cx('browse-username')}>{ video.user.full_name }</span>
                        </Link>
                        <p className={cx('comment-text')}>
                            <span>review serum ganier đi ạ</span>
                        </p>
                        <p className={cx('comment-sub-content')}>
                            <span className={cx('comment-time')}>1ngày trước</span>
                            <span className={cx('comment-reply')}>Trả lời</span>
                        </p>
                    </div>
                </div>
                <div className={cx('reply-container')}>
                    <div className={cx('reply-action-container')}>
                        <div className={cx('reply-action-text')}>
                            Xem thêm câu trả lời khác (5)
                            <ChevronDownIcon className={cx('reply-chevron-down-icon')} />
                        </div>
                    </div>
                </div>
            </div>
       </div>
    );
}

Comment.propTypes = {
    video: PropTypes.object.isRequired
};

export default Comment;