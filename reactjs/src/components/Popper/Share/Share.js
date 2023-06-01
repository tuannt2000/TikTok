import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './Share.module.scss';
import PropTypes from 'prop-types';
import Button from '~/components/Button';
import { 
    ShareDipIcon, ShareSendIcon, ShareFaceBookIcon, 
    ShareWhatsAppIcon, ShareCopyLinkIcon, ShareTwitterIcon,
    ShareLinkedInIcon, ShareRedditIcon, ShareTelegramIcon,
    ShareArrowIcon, ShareEmailIcon, ShareLineIcon, SharePinterestIcon
} from '~/components/Icons'; 
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalShare } from '~/redux/actions/modal';

const cx = classNames.bind(styles);

const MENU_SHARES = [
    {
        id: 1,
        icon: <ShareDipIcon />,
        title: 'Nhúng'
    },
    {
        id: 2,
        icon: <ShareSendIcon />,
        title: 'Gửi đến bạn bè',
    },
    {
        id: 3,
        icon: <ShareFaceBookIcon />,
        title: 'Chia sẻ với Facebook'
    },
    {
        id: 4,
        icon: <ShareWhatsAppIcon />,
        title: 'Chia sẻ với WhatsApp'
    },
    {
        id: 5,
        icon: <ShareCopyLinkIcon />,
        title: 'Sao chép liên kết'
    }
];

const MENU_SHARES_MORE = [
    {
        id: 6,
        icon: <ShareTwitterIcon />,
        title: 'Chia sẻ với Twitter'
    },
    {
        id: 7,
        icon: <ShareLinkedInIcon />,
        title: 'Chia sẻ với LinkedIn'
    },
    {
        id: 8,
        icon: <ShareRedditIcon />,
        title: 'Chia sẻ với Reddit'
    },
    {
        id: 9,
        icon: <ShareTelegramIcon />,
        title: 'Chia sẻ với Telegram'
    },
    {
        id: 10,
        icon: <ShareEmailIcon />,
        title: 'Chia sẻ với Email'
    },
    {
        id: 11,
        icon: <ShareLineIcon />,
        title: 'Chia sẻ với Line'
    },
    {
        id: 12,
        icon: <SharePinterestIcon />,
        title: 'Chia sẻ với Pinterest'
    }
];

function Share({ children, profile = false }) {
    const [menu, setMenu] = useState(MENU_SHARES);
    const [more, setMore] = useState(false);
    const dispatch = useDispatch();

    const tippyRef = useRef();

    const handleMore = (e) => {
        e.preventDefault();
        setMore(true);
        setMenu(prev => [...prev, ...MENU_SHARES_MORE]);
    };

    const handleShare = (id) => {
        tippyRef.current.hide();
        if (id === 2) {
            dispatch(setModalShare(true))
        }
    }

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('share-group')}>   
                    {menu.map((result, index) => (
                        <Button key={index} className={cx('share-button')} onClick={() => handleShare(result.id)} to='#' leftIcon={result.icon} >{result.title}</Button>
                    ))}  
                    {!more && (
                        <a 
                            href="/" 
                            className={cx('arrow-button')}
                            onClick={handleMore}
                        >
                            <ShareArrowIcon />
                        </a>
                    )}              
                </div>
            </PopperWrapper>
        </div>
    );
                       
    return (
        <div>
            <Tippy
                trigger="click mouseenter"
                interactive
                placement={profile ? 'top-end' : 'top-start'}
                offset={profile ? [30, 0] : [-30, 0]}
                render={renderResult}
                onHide={() => {
                    setMenu(MENU_SHARES);
                    setMore(false);
                }}
                onShow={instance => {
                    tippyRef.current = instance;
                }
            }
            >
                {children}
            </Tippy>
        </div>
    );
}

Share.propTypes = {
    children: PropTypes.node.isRequired,
    profile: PropTypes.bool
};

export default Share;