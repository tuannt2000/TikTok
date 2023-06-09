import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { getListComment } from "~/redux/actions/comment";
import { useEffect } from "react";
import CommentItem from "./CommentItem";

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
                <CommentItem result={result} key={index} video={video} />
            )) : (
                <div className={cx('div-empty')}>Hãy là người đầu tiên bình luận!</div>
            )}
        </div>
    );
}

Comment.propTypes = {
    video: PropTypes.object.isRequired
};

export default Comment;