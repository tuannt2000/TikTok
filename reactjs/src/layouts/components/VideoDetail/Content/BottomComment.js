import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import PropTypes from 'prop-types';
import { TagIcon, EmojiCommentIcon } from "~/components/Icons";
import Tippy from '@tippyjs/react';
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function BottomComment({ video }) {
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [focus, setFocus] = useState(false);

    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current && inputRef.current.focus();
        setFocus(true)
    }

    const handleInput = () => {
        if (inputRef.current.innerText !== '') {
            setShowPlaceholder(false)
        } else {
            setShowPlaceholder(true)
        }
    }

    return (
       <div className={cx('bottom-comment-container')}>
            <div className={cx('div-bottom-comment')}>
                <div className={cx('div-layout-bottom-comment')}>
                    <div className={cx('div-input-area-container', {focus: focus})}>
                        <div className={cx('div-input-editor-container')}>
                            <div className={cx('input-area-container')} onClick={handleClick} >
                                <div className={cx('draft-editor-root')}>
                                    {showPlaceholder && (
                                        <div className={cx('public-draft-editor-placeholder-root')}>
                                            Thêm bình luận...
                                        </div>
                                    )}
                                    <div className={cx('draft-editor-editor-container')}>
                                        <div 
                                            className={cx('public-draft-editor-content')} 
                                            contentEditable={true}
                                            ref={inputRef}
                                            onInput={handleInput}
                                            onBlur={() => setFocus(false)}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       <div>
                            <Tippy 
                                interactive 
                                content={'Dùng ký hiệu "@" để gắn thẻ một người dùng trong bình luận của bạn'}
                            >
                                <div className={cx('div-mention-button')}>
                                    <TagIcon />
                                </div>
                            </Tippy>
                       </div>
                       <div>
                            <Tippy 
                                interactive 
                                content={'Nhấp để thêm emoji'}
                            >
                                <div className={cx('div-emoji-btn')}>
                                    <EmojiCommentIcon />
                                </div>
                            </Tippy>
                       </div>
                    </div>
                </div>
                <div className={cx('div-post-btn', {'has-valid': !showPlaceholder})}>
                    Đăng
                </div>
            </div>
       </div>
    );
}

BottomComment.propTypes = {
    video: PropTypes.object.isRequired
};

export default BottomComment;