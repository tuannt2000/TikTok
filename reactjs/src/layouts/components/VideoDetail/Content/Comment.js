import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar/Avatar';
import { AccountOffer } from "~/components/Popper";
import { ChevronDownIcon } from "~/components/Icons";
import { useSelector, useDispatch } from "react-redux";
import { getListComment } from "~/redux/actions/comment";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function Comment({ video }) {
    const listComment = useSelector(state => state.comment.listComment);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getListComment(video.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video])

    return (
        <div className={cx('comment-list-container')}>
            {listComment.length ? listComment.map((result, index) => (
                <div key={index} className={cx('comment-item-container')}>
                    <div className={cx('comment-content-container')}>
                        <AccountOffer home data={result.user} className={'mr-avatar'}>
                            <Avatar
                                data={result.user}
                                size={40}
                            />
                        </AccountOffer>
                        <div className={cx('comment-content-wrapper')}>
                            <Link to={'@' + result.user.nickname} className={cx('author-anchor')}>
                                <span className={cx('browse-username')}>{result.user.full_name}</span>
                            </Link>
                            <p className={cx('comment-text')}>
                                <span>{ result.text }</span>
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
            )) : (
                <span>"Chưa có bình luận nào"</span>
            )}
        </div>
    );
}

Comment.propTypes = {
    video: PropTypes.object.isRequired
};

export default Comment;