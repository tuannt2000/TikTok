import classNames from "classnames/bind";
import styles from '../VideoDetail.module.scss';
import PropTypes from 'prop-types';
import { TagIcon, EmojiCommentIcon } from "~/components/Icons";
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import { useRef, useState } from "react";
import Picker from 'emoji-picker-react';
import { createComment } from '~/redux/actions/comment';
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);
const MAX_LENGTH_MESSAGE = 150;

function BottomComment({ video }) {
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [focus, setFocus] = useState(false);
    const [textCount, setTextCount] = useState(0);

    const dispatch = useDispatch();

    const inputRef = useRef();
    const inputStyleRef = useRef();

    const handleClick = () => {
        inputRef.current && inputRef.current.focus();
        setFocus(true)
    };

    const handleInput = () => {
        if (inputRef.current.innerText !== '') {
            setShowPlaceholder(false)
            checkMaxLengthMessage()
        } else {
            setShowPlaceholder(true)
        }
    };

    const handleSubmit = () => {
        dispatch(createComment({
            "video_id": video.id,
            "text": inputRef.current.innerText
        }))

        inputRef.current.innerText = ''
        setShowPlaceholder(true);
        setTextCount(0)
    }

    const onEmojiClick = (event, emojiObject) => {
        inputRef.current.innerText += emojiObject.emoji
        setShowPlaceholder(false)
        checkMaxLengthMessage()
    };

    const renderIcons = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Picker onEmojiClick={onEmojiClick} />
        </div>
    )

    const checkMaxLengthMessage = () => {
        if (inputRef.current.innerText.length >= MAX_LENGTH_MESSAGE) {
            inputRef.current.innerText = inputRef.current.innerText.slice(0, MAX_LENGTH_MESSAGE)
        }

        if (inputRef.current.offsetHeight >= parseInt(inputStyleRef.current.style.lineHeight) * 2) {
            setTextCount(inputRef.current.innerText.length);
        } else {
            setTextCount(0)
        }
    }

    return (
       <div className={cx('bottom-comment-container')}>
            <div className={cx('div-bottom-comment')}>
                <div className={cx('div-layout-bottom-comment')}>
                    <div className={cx('div-input-area-container', {focus: focus})}>
                        <div className={cx('div-input-editor-container')}>
                            <div 
                                ref={inputStyleRef} 
                                className={cx('input-area-container')} 
                                onClick={handleClick} 
                                style={{
                                    lineHeight: "17px"
                                }}
                            >
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
                            {!!textCount && <div className={cx('div-text-count', {'max-text': textCount === MAX_LENGTH_MESSAGE })}>{ textCount }/{ MAX_LENGTH_MESSAGE }</div>}
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
                                <div>
                                    <TippyHeadless 
                                        trigger='click'
                                        interactive
                                        delay={[0, 700]}
                                        offset={[12, 8]}
                                        placement='top-end'
                                        render={renderIcons}
                                    >
                                        <div className={cx('div-emoji-btn')}>
                                            <EmojiCommentIcon />
                                        </div>
                                    </TippyHeadless>
                                </div>
                            </Tippy>
                       </div>
                    </div>
                </div>
                <div 
                    className={cx('div-post-btn', {'has-valid': !showPlaceholder})}
                    onClick={handleSubmit}
                >
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