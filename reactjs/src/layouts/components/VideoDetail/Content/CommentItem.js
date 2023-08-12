import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import { useState } from "react";
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar/Avatar';
import { AccountOffer } from "~/components/Popper";
import { ChevronDownIcon, MoreIcon, TrashIcon } from "~/components/Icons";
import { useDispatch, useSelector } from "react-redux";
import Tippy from '@tippyjs/react/headless';
import { deleteComment } from "~/redux/actions/comment";
import { formatTimeComment } from "~/utils/utility";

const cx = classNames.bind(styles);

function CommentItem({ result, video }) {
    const currentUser = useSelector(state => state.user.currentUser)
    const [hover, setHover] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(deleteComment({"id": result.id}))
    }

    const renderResult = (attrs) => (
        <div className={cx('tippy-container')} tabIndex="-1" {...attrs}>
            <div className={cx('div-popup-container')}>
                <p 
                    className={cx('action-item')}
                    onClick={handleSubmit}
                >
                    <TrashIcon />
                    <span className={cx('span-action-text')}>Xóa</span>
                </p>
            </div>
        </div>
    );

    return (
        <div 
            className={cx('comment-item-container')}
            onMouseOut={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={cx('comment-content-container')}>
                <AccountOffer home data={result.user} className={'mr-avatar'}>
                    <Avatar
                        data={result.user}
                        size={40}
                    />
                </AccountOffer>
                <div className={cx('comment-content-wrapper')}>
                    <Link to={'@' + result.user.nickname} className={cx('author-anchor')}>
                        <span className={cx('browse-username')}>{result.user.full_name} </span>
                        { video.user.id === result.user.id && result.user.id !== currentUser.id && (
                            <>
                                 · 
                                <span className={cx('comment-creator')}> Tác giả</span>
                            </>
                        )}
                        { result.user.id === currentUser.id && (
                            <>
                                 · 
                                <span className={cx('comment-creator')}> Bạn</span>
                            </>
                        )}
                    </Link>
                    <p className={cx('comment-text')}>
                        <span>{ result.text }</span>
                    </p>
                    <p className={cx('comment-sub-content')}>
                        <span className={cx('comment-time')}>{formatTimeComment(result.created_at)}</span>
                        <span className={cx('comment-reply')}>Trả lời</span>
                    </p>
                </div>
                {hover && result.user.id === currentUser.id && (
                    <div className={cx('div-action-container')}>
                        <div className={cx('more-container')}>
                            <Tippy
                                interactive
                                render={renderResult}
                                placement='bottom'
                            >
                                <div className={cx('comment-more-icon')}>
                                    <MoreIcon />
                                </div>
                            </Tippy>
                        </div>
                    </div>
                )}
            </div>
            {/* <div className={cx('reply-container')}>
                <div className={cx('reply-action-container')}>
                    <div className={cx('reply-action-text')}>
                        Xem thêm câu trả lời khác (5)
                        <ChevronDownIcon className={cx('reply-chevron-down-icon')} />
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default CommentItem;