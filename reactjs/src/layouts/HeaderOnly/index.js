import Header from "~/layouts/components/Header";
import styles from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoDetail from "../components/VideoDetail";
import Report from "~/components/Modal/Report";

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    const [showVideoDetail, setShowVideoDetail] = useState(false)
    const video = useSelector(state => state.video);

    useEffect(() => {
        setShowVideoDetail(Object.keys(video.video_detail).length ? true : false)
    }, [video.video_detail]);

    return (
        <div>
            <Header max_width />
            <div className={cx('container')}>
                {children}
                {showVideoDetail && <VideoDetail video={video.video_detail} />}
                <Report />
            </div>
        </div>
    );
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired
};

export default HeaderOnly;