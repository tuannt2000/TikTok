import classNames from "classnames/bind";
import styles from "./Video.module.scss";
import ReactPlayer from 'react-player';
import { useRef, useEffect } from "react";
import Avatar from "../Avatar";
import { PlaySearchIcon } from "../Icons";
const cx = classNames.bind(styles);

function Video({ data, search = false, className }) {
    const videoRef = useRef();

    useEffect(() => {
        console.log(videoRef)
    })

    const classes = cx('wrapper', {
        [className]: className,
        search
    });

    return (
        <div className={classes}>
            <div className={cx('StyledDivContainerV2')}>
                <div style={{
                    paddingTop: '132.653%'
                }}>
                    <div className={cx('DivWrapper')}>
                        <div className={cx('DivPlayerContainer')}>
                            <div className={cx('VideoDivContainer')}>
                                <div className={cx('DivBasicPlayerWrapper')}>
                                    <div className={cx('xgplayer-container')}>
                                        <ReactPlayer
                                            ref={videoRef}
                                            loop
                                            className={cx('video')}
                                            url={data.url}
                                            controls={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
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