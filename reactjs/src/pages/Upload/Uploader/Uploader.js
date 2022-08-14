import classNames from "classnames/bind";
import styles from "./Uploader.module.scss";
import images from '~/assets/images';
import Button from '~/components/Button';
// import { useDispatch } from 'react-redux';
import { useState } from 'react';
// import { uploadVideo } from '~/redux/actions/video';
import { useRef } from 'react';
import Preview from './Preview';

const cx = classNames.bind(styles);

function Uploader() {
    const inputFile = useRef();
    const [video, setVideo] = useState('');
    const [url, setUrl] = useState('');
    // const dispatch = useDispatch();

    const hanleClick = () => {
        inputFile.current.click();
    };

    const handleChange = (event) => {
        setVideo(event.target.files[0]);
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setUrl(url);

        // var reader = new FileReader();
        // reader.readAsDataURL(event.target.files[0]);
        // reader.onloadend = function() {
        //     var base64data = reader.result;
        //     dispatch(uploadVideo(base64data));
        // }
    };

    return (
        <>
            {!url ? 
            (
                <div className={cx('container')}>
                    <div className={cx('wrapper')}>
                        <input 
                            type="file" accept="video/*" 
                            onChange={handleChange} 
                            className={cx('input-video')} 
                            ref={inputFile} 
                            value={video}
                        />
                        <div className={cx('before-upload')} onClick={hanleClick}>
                            <img src={images.upload} alt="upload" className={cx('img-upload')} />
                            <div className={cx('text-main')}>
                                <span>Chọn video để tải lên</span>
                            </div>
                            <div className={cx('text-sub')}>
                                <span>Hoặc kéo và thả tập tin</span>
                            </div>
                            <div className={cx('text-video-info')}>
                                <div className={cx('text-video-info-desc')}>
                                    <span>MP4 hoặc WebM</span>
                                </div>
                                <div className={cx('text-video-info-desc')}>
                                    <span>Độ phân giải 720x1280 trở lên</span>
                                </div>
                                <div className={cx('text-video-info-desc')}>
                                    <span>Tối đa 180 giây</span>
                                </div>
                                <div className={cx('text-video-info-desc')}>
                                    <span>Ít hơn 1 GB</span>
                                </div>
                            </div>
                            <div className={cx('button-file')}>
                                <Button className='button-file' primary>Chọn tập tin</Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Preview url={url}/>
            )
            }
        </>
    );
}

export default Uploader;