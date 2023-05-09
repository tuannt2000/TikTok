import classNames from "classnames/bind";
import styles from "./Video.module.scss";
import { useState } from "react";
import Avatar from "../Avatar";
import { LockIconNotFill, PlaySearchIcon, TwoPersonIcon } from "../Icons";
const cx = classNames.bind(styles);

const defaultFn = () => {};

function Video({ data, search = false, className, onClick = defaultFn }) {
    const [hover, setHover] = useState(false);

    const classes = cx('wrapper', {
        [className]: className,
        search
    });

    const renderStatus = () => {
        if (data.status === 1) {
            return <TwoPersonIcon className={cx('private')} />
        } else if (data.status === 2) {
            return <LockIconNotFill width={'1.8rem'} height={'1.8rem'} className={cx('private')} />
        }
    }

    return (
        <div 
            className={classes}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={() => onClick(data)}
        >
            <div 
                className={cx('StyledDivContainerV2')}
            >
                <div style={{
                    paddingTop: '132.653%'
                }}>
                    <div className={cx('DivWrapper')}>
                        <a href={'/@' + data.user.nickname + '/video/' + data.id} onClick={e => e.preventDefault()}>
                            <canvas className={cx('canvas-placeholder')} />
                            <div className={cx('DivPlayerContainer')}>
                                <div className={cx('VideoDivContainer')}>
                                    <img src={data.cover_image} alt="" className={cx('img-poster')}/>
                                    { hover && (
                                        <div className={cx('DivBasicPlayerWrapper')}>
                                            <div className={cx('xgplayer-container')}>
                                                <video src={data.url} autoPlay loop muted className={cx('video')}></video>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={cx('div-card-footer')}>
                                    { renderStatus() }
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className={cx('div-video-search-card')}>
                <div className={cx('card-bottom-info')}>
                    <div className={cx('TagCardDesc')}>
                        <a href="/">
                            <div className={cx('TagDivContainer')}>
                                <span className={cx('SpanText')}>{ data.description }</span>
                            </div>
                        </a>
                    </div>
                    { search && (
                        <div className={cx('div-play-line')}>
                            <Avatar
                                data={data.user}
                                size={24}
                                info
                                to
                            />
                            <div className={cx('div-play-icon')}>
                                <PlaySearchIcon />
                                <strong className={cx('video-count')}>{data.likes_count}</strong>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Video;