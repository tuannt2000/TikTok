import classNames from "classnames/bind";
import styles from "./Uploader.module.scss";
import Avatar from "~/components/Avatar";
import { useSelector } from "react-redux";
import images from "~/assets/images";
import { useEffect, useRef, useState } from "react";
import { formatTime } from '~/utils/utility';
import { Upload } from '~/components/Modal';

const cx = classNames.bind(styles);

function Preview({ name, url }) {
    const [play, setPlay] = useState(true);
    const [mute, setMute] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const user = useSelector(state => state.user.currentUser);
    const videoRef = useRef();
    const videoControlRef = useRef();
    const progessRef = useRef();
    const circleRef = useRef();
    const barRef = useRef();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setDuration(videoRef.current.duration)
    });

    useEffect(() => {
        play ? videoRef.current.play() : videoRef.current.pause();
    }, [play]);

    useEffect(() => {
        videoRef.current.muted = !mute;
    }, [mute]);

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
        const pos = progessRef.current.offsetWidth * videoRef.current.currentTime / videoRef.current.duration + 'px';
        circleRef.current.style.left = pos;
        barRef.current.style.width = pos;
    };

    return (
        <div className={cx('preview-container')}>
            <div
                className={cx('preview-container-v2')}
                onMouseEnter={() => videoControlRef.current.style.opacity = 1}
                onMouseLeave={() => videoControlRef.current.style.opacity = 0}
            >
                <video
                    src={url}
                    autoPlay={true}
                    preload="auto"
                    className={cx('player')}
                    loop={true}
                    muted={true}
                    ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                />
                <div className={cx('video-control')} ref={videoControlRef}>
                    <div className={cx('video-control-v2')}>
                        <div className={cx('video-detail')}>
                            <div className={cx('video-left')}>
                                <span className={cx('video-play')} onClick={() => setPlay(!play)}>
                                    <img src={play ? images.pauseIcon : images.playIcon} alt='video-play' />
                                </span>
                                <span className={cx('video-time')}>{formatTime(currentTime)}/ {formatTime(duration)}</span>
                            </div>
                            <div className={cx('video-right')}>
                                <span className={cx('video-volume')} onClick={() => setMute(!mute)}>
                                    <img src={mute ? images.muteOnIcon : images.muteOffIcon} alt='volume'/>
                                </span>
                                <span className={cx('video-maximize')} onClick={() => videoRef.current.requestFullscreen()} >
                                    <img src={images.fullScreenIcon} alt='maximize'/>
                                </span>
                            </div>
                        </div>
                        <div className={cx('video-progess-wrap')}>
                            <div className={cx('video-progress-bar')} ref={progessRef}/>
                            <div 
                                className={cx('video-circle')} 
                                ref={circleRef}
                                style={
                                    {
                                        left: 0
                                    }
                                }
                            />
                            <div 
                                className={cx('video-bar')} 
                                ref={barRef}
                                style={
                                    {
                                        width: 0
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('preview-title')}>
                    <div className={cx('preview-following')}>Đang Follow</div>
                    <div className={cx('preview-for-you')}>Dành cho bạn</div>
                </div>
                <div className={cx('meta-data')}>
                    <div className={cx('meta-username')}>
                        @{user.first_name} {user.last_name}
                    </div>
                    <div className={cx('meta-caption')}>TikTok - Make Your Day - Google Chrome 2022-08-12</div>
                    <div className={cx('meta-sound-container')}>
                        <div className={cx('meta-music-icon')}>
                            <img src={images.musicIcon} alt="music-icon" />
                        </div>
                        <div className={cx('meta-sound')}>
                            <div className={cx('meta-marquee')}>
                                <p>Âm thanh gốc - Tuấn Nguyễn<span>&nbsp;</span></p>
                                <p>Âm thanh gốc - Tuấn Nguyễn<span>&nbsp;</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Avatar
                    data={user}
                    to={false}
                    size={40}
                    className='video'
                />
                <Avatar
                    data={user}
                    to={false}
                    size={40}
                    className='album'
                    album
                />
                <div className={cx('music-bar-icon')}>
                    <img src={images.iconBarRight} alt="" />
                </div>
                <div className={cx('music-symbols')}>
                    <div
                        className={cx('music-symbol1')}
                        style={{
                            backgroundImage: 'url(' + images.musicSymbol1 + ')'
                        }}
                    />
                    <div
                        className={cx('music-symbol2')}
                        style={{
                            backgroundImage: 'url(' + images.musicSymbol2 + ')'
                        }}
                    />
                    <div
                        className={cx('music-symbol3')}
                        style={{
                            backgroundImage: 'url(' + images.musicSymbol3 + ')'
                        }}
                    />
                </div>
                <div
                    className={cx('tiktok-app-frame')}
                    style={{
                        backgroundImage: 'url(' + images.app + ')'
                    }}
                />
            </div>
            <div className={cx('change-video-btn')}>
                <div className={cx('file')}>
                    <img src={images.checkIcon} alt={'check-icon'} />
                    <div className={cx('file-text')}>{name}</div>
                </div>
                <Upload />
            </div>
        </div>
    );
}

export default Preview;