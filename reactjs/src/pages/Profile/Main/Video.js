import classNames from "classnames/bind";
import styles from "./Main.module.scss";
import ReactPlayer from 'react-player';
import { useRef, useEffect } from "react";
const cx = classNames.bind(styles);

function Video({ index, data }) {
    const videoRef = useRef();

    useEffect(() => {
        console.log(videoRef)
    })

    return (
        <div className={cx('DivItemContainerV2')}>
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
                                            index={index}
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
            <div className={cx('TagCardDesc')}>
                <a href="/">
                    <div className={cx('TagDivContainer')}>
                        <span className={cx('SpanText')}>{ data.description }</span>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Video;