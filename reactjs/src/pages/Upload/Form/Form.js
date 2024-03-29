import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import Caption from './Caption';
import { useState, useRef, useEffect } from 'react';
import { TickIcon } from '~/components/Icons';
import Button from "./Button";
import Switch from "./Switch";
import Type from "./Type";
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';
import { uploadVideo } from '~/redux/actions/video';
import { useFormik } from 'formik';
import { formatFilename } from '~/utils/utility';
import { generateVideoThumbnails, dataURLtoBlob } from "~/hooks/useGetThumnail";

const cx = classNames.bind(styles);

const MENU_CHECKBOX = [
    {
        id: 1,
        title: 'Bình luận',
        checked: true
    }
];

function Form({ url, video, handleChange }) {
    const [listCheckBox, setListCheckBox] = useState(MENU_CHECKBOX);
    const [widthThumbnail, setWidthThumbnail] = useState(0);
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const dispatch = useDispatch();

    const videoRef = useRef();
    const thumbnailRef = useRef();
    const videoThumbnailRef = useRef();

    const formik = useFormik({
        initialValues: {
            cover_image: '',
            description: '',
            status: 0
        },
        onSubmit: values => {
            const formData = new FormData();
            formData.append("description", values.description);
            formData.append("status", values.status);
            formData.append("video_file", video);
            formData.append("name", formatFilename(video.name));
            formData.append("comment", listCheckBox[0].checked ? 1 : 0);
            formData.append("cover_image_file", values.cover_image);
            dispatch(uploadVideo(formData));
        },
    });

    useEffect(() => {
        setWidthThumbnail(0)
        if (videoThumbnailRef.current) {
            setWidthThumbnail(thumbnailRef.current.offsetWidth - videoThumbnailRef.current.offsetWidth);
        }
    }, [url]);

    useEffect(() => {
        if (video) {
            generateVideoThumbnails(video, 0).then((thumbs) => {
                setThumbnailUrl(thumbs[0])
                dataURLtoBlob(thumbs[0]).then((data) => {
                    formik.setFieldValue('cover_image', data)
                })
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video]);

    const handleChangeCheckBox = (checkbox) => {
        const newState = [...listCheckBox];
        newState[checkbox.id - 1].checked = !checkbox.checked;
        setListCheckBox(newState);
    };

    const handleDrag = (data) => {
        videoThumbnailRef.current.currentTime = (videoThumbnailRef.current.duration.toFixed(0)) * ((data.layerX/widthThumbnail).toFixed(2))
    }

    const handleStop = () => {
        generateVideoThumbnails(video, videoThumbnailRef.current.currentTime).then((thumbs) => {
            dataURLtoBlob(thumbs[0]).then((data) => {
                formik.setFieldValue('cover_image', data)
            })
        });
    }

    return (
        <div className={cx('container')}>
            <Caption video={video} formik={formik} />
            <div className={cx('cover-image')}>
                <span className={cx('title-cover-image')}>Ảnh bìa</span>
                <div className={cx('cover-image-container-v2')}>
                    <div ref={thumbnailRef} className={cx('cover-image-bg-container-v2', { 'has-thumbnail': !!url })}>
                        {video ?               
                            <>
                                <img src={thumbnailUrl} alt="" />
                                <img src={thumbnailUrl} alt="" />
                                <img src={thumbnailUrl} alt="" />
                                <img src={thumbnailUrl} alt="" />
                                <img src={thumbnailUrl} alt="" />
                                <img src={thumbnailUrl} alt="" />
                                <img src={thumbnailUrl} alt="" />
                                <img src={thumbnailUrl} alt="" />
                            </>
                            :
                            <div className={cx('cover-image-candidate')} />
                        }
                    </div>
                    {url && (
                        <Draggable
                            axis="x"
                            bounds={{left: 0, right: widthThumbnail}}
                            onDrag={handleDrag}
                            onStop={handleStop}
                        >
                            <div 
                                ref={videoRef} 
                                className={cx('chosen-v2')}
                                style={{
                                    transform: 'translate3d(4px, 1px, 0px) scaleX(1.1) scaleY(1.1)'
                                }}
                            >
                                    <div className={cx('choose-thumbnail')}>
                                        <video
                                            ref={videoThumbnailRef}
                                            className={cx('candidate-video-v2')}
                                            src={url}
                                        ></video>
                                    </div>
                            </div>
                        </Draggable>
                    )}
                </div>
            </div>
            <Type formik={formik} />
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
                                <input
                                    type={"checkbox"}
                                    className={cx('css-1pzrh5a')}
                                    checked={result.checked}
                                    onChange={() => handleChangeCheckBox(result)}
                                    value={formik.values.description}
                                />
                                <div className={cx('css-mbgljv', {'checked': result.checked})}>
                                    <TickIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Switch/>
            <Button handleUpload={formik.handleSubmit} handleChange={handleChange} url={url} />
        </div>
    );
}

export default Form;