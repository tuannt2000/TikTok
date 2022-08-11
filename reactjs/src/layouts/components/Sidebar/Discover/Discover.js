import classNames from "classnames/bind";
import styles from './Discover.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import Button from '~/components/Button';
import { useSelector} from "react-redux";
import { getIconDiscove } from '~/utils/utility';
import { memo } from 'react';

const cx = classNames.bind(styles);

function Discover () {
    const discove = useSelector(state => state.discove);

    return (  
        <div className={cx('discover')}>
            <p className={cx('title')}>Khám phá</p>
            <div className={cx('discover-list')}>
                {!discove.data.length && <div className={cx('load-icon')}><FontAwesomeIcon icon={faSpinner} className={cx('loading')}/></div>}
                {discove.data.map((result, index) => (
                    <Button
                        to={`${result.type}/${result.link}`}
                        key={index}
                        discover leftIcon={getIconDiscove(result.type)}
                    >
                        {result.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default memo(Discover);