import Header from "~/layouts/components/Header";
import Sidebar from "../components/Sidebar";
import DownloadApp from '~/components/DownloadApp';
import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import VideoDetail from "../components/VideoDetail";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [showVideoDetail, setShowVideoDetail] = useState(false)
    const video = useSelector(state => state.video);

    useEffect(() => {
        setShowVideoDetail(Object.keys(video.video_detail).length ? true : false)
    }, [video.video_detail]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>
                    {children}
                    <DownloadApp />
                </div>
                {showVideoDetail && <VideoDetail video={video.video_detail} />}
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;