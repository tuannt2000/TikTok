import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import Caption from './Caption';
import { useState, useRef } from 'react';
import { TickIcon } from '~/components/Icons';
import VideoThumbnail from 'react-video-thumbnail';
import Button from "./Button";
import Switch from "./Switch";
import Type from "./Type";

const cx = classNames.bind(styles);

const MENU_CHECKBOX = [
    {
        id: 1,
        title: 'Bình luận',
        checked: true
    },
    {
        id: 2,
        title: 'Duet',
        checked: true
    },
    {
        id: 3,
        title: 'Stitch',
        checked: true
    }
];

function Form({ event, url, video, hanleChange }) {
    const [listCheckBox, setListCheckBox] = useState(MENU_CHECKBOX);
    const videoRef = useRef();
    const thumbnailRef = useRef();


    const handleChangeCheckBox = (checkbox) => {
        const newState = [...listCheckBox];
        newState[checkbox.id - 1].checked = !checkbox.checked;
        setListCheckBox(newState);
    };

    const handleDrag= (e) => {
        console.log(e.screenX, thumbnailRef.current.getBoundingClientRect().x)
        const transform = e.pageX - thumbnailRef.current.getBoundingClientRect().x
        videoRef.current.style.transform = 'translate3d(' + transform + 'px, 1px, 0px) scaleX(1.1) scaleY(1.1)';
    }

    const handleDragOver = (e) => {
        event.preventDefault();
    }

    return (
        <div className={cx('container')}>
            <Caption video={video} />
            <div className={cx('cover-image')}>
                <span className={cx('title-cover-image')}>Ảnh bìa</span>
                <div className={cx('cover-image-container-v2')}>
                    <div ref={thumbnailRef} className={cx('cover-image-bg-container-v2', { 'has-thumbnail': !!url })}>
                        {!!url ?  
                            <>
                                <VideoThumbnail videoUrl={url} width={674} height={379} />
                                <VideoThumbnail videoUrl={url} width={674} height={379} />
                                <VideoThumbnail videoUrl={url} width={674} height={379} />
                                <VideoThumbnail videoUrl={url} width={674} height={379} />
                                <VideoThumbnail videoUrl={url} width={674} height={379} />
                                <VideoThumbnail videoUrl={url} width={674} height={379} />
                                <VideoThumbnail videoUrl={url} width={674} height={379} />
                                <VideoThumbnail videoUrl={url} width={674} height={379} />
                            </>
                            :
                            <div className={cx('cover-image-candidate')} />
                        }
                    </div>
                    {!!url && (
                        <div 
                            ref={videoRef} 
                            className={cx('chosen-v2')}
                            style={{
                                transform: 'translate3d(4px, 1px, 0px) scaleX(1.1) scaleY(1.1)'
                            }}
                        >
                            <div className={cx('choose-thumbnail')}>
                                <video 
                                    draggable 
                                    onDrag={handleDrag} 
                                    onDragOver={handleDragOver} 
                                    className={cx('candidate-video-v2')} 
                                    src={url}
                                ></video>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Type/>
            <div className={cx('access-title')}>
                <span>Cho phép người dùng:</span>
            </div>
            <div className={cx('checkbox-container')}>
                {listCheckBox.map(result => (
                    <div key={result.id} className={cx('checkbox')}>
                        <div className={cx('css-ypesld')}>
                            <label className={cx('checkbox-title')} onClick={() => handleChangeCheckBox(result)}>
                                <span>{result.title}</span>
                            </label>
                            <div className={cx('css-4pkwts')}>
                                <input type={"checkbox"} className={cx('css-1pzrh5a')} checked={result.checked} onChange={() => handleChangeCheckBox(result)} />
                                <div className={cx('css-mbgljv', {'checked': result.checked})}>
                                    <TickIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Switch/>
            <Button event={event} url={url} hanleChange={hanleChange} />
        </div>
    );
}

export default Form;