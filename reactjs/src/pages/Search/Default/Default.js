import classNames from "classnames/bind";
import styles from "./Default.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopVideo } from "~/redux/actions/search";
import { useSearchParams } from "react-router-dom";
import Video from "~/components/Video";

const cx = classNames.bind(styles);

function Default() {
    const topVideoList = useSelector(state => state.search.search_top_video);
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getTopVideo({q: searchParams.get('q')}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    return (
        <div className={cx('container')}>
            <div className={cx('video-feed')}>
                <div className={cx('block-container')}>
                    <div className={cx('title-container')}>
                        <h2 className={cx('top-video-title')}>Video</h2>
                    </div>
                </div>
                {topVideoList.map((result, index) => (
                    <Video key={index} data={result} search />
                ))}
            </div>
        </div>
    );
}

export default Default;