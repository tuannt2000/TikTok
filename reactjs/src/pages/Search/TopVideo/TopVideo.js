import classNames from "classnames/bind";
import styles from "./Video.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTopVideo } from "~/redux/actions/search";
import { useSearchParams } from "react-router-dom";
import Video from "~/components/Video";
import { setListVideoDetail } from "~/redux/actions/video";

const cx = classNames.bind(styles);

function TopVideo() {
    const topVideoList = useSelector(state => state.search.search_top_video);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getTopVideo({q: searchParams.get('q')}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const handleShowVideoDetail = (data) => {
        window.history.replaceState(null, "", '/@' + data.user.nickname + '/video/' + data.id)
        dispatch(setListVideoDetail({
            list_video_detail: topVideoList,
            data: data
        }));
    }

    return (
        <div className={cx('container')}>
            <div className={cx('video-feed')}>
                <div className={cx('block-container')}>
                    <div className={cx('title-container')}>
                        <h2 className={cx('top-video-title')}>Video</h2>
                    </div>
                </div>
                {topVideoList.map((result, index) => (
                    <Video onClick={handleShowVideoDetail} key={index} data={result} search />
                ))}
            </div>
        </div>
    );
}

export default TopVideo;