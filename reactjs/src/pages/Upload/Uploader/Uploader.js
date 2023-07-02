import classNames from "classnames/bind";
import styles from "./Uploader.module.scss";
import images from '~/assets/images';
import Button from '~/components/Button';
import { useRef } from 'react';
import Preview from './Preview';
import { useDispatch } from "react-redux";
import { setAlertMessage } from "~/redux/actions/user";

const cx = classNames.bind(styles);

function Uploader({video, url, handleChange}) {
    const inputFile = useRef();
    const dispatch = useDispatch();

    const hanleClick = () => {
        inputFile.current.click();
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        const file_size = file.size/(1024*1024);
        if (file_size > 20) {
            dispatch(setAlertMessage("Hãy chọn video có kích thước không quá 20MB"));
        } else {
            const url = URL.createObjectURL(file);
            handleChange(url, file);
        }
    };

    return (
        <>
            {!url ? 
            (
                <div className={cx('container')}>
                    <div className={cx('wrapper')}>
                        <input 
                            type="file" accept="video/*" 
                            onChange={handleUpload} 
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
                <Preview name={video.name} url={url}/>
            )
            }
        </>
    );
}

export default Uploader;