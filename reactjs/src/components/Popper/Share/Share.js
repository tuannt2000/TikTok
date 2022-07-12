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
import { useState } from 'react';

const cx = classNames.bind(styles);

const MENU_SHARES = [
    {
        icon: <ShareDipIcon />,
        title: 'Nhúng'
    },
    {
        icon: <ShareSendIcon />,
        title: 'Gửi đến bạn bè'
    },
    {
        icon: <ShareFaceBookIcon />,
        title: 'Chia sẻ với Facebook'
    },
    {
        icon: <ShareWhatsAppIcon />,
        title: 'Chia sẻ với WhatsApp'
    },
    {
        icon: <ShareCopyLinkIcon />,
        title: 'Sao chép liên kết'
    }
];

const MENU_SHARES_MORE = [
    {
        icon: <ShareTwitterIcon />,
        title: 'Chia sẻ với Twitter'
    },
    {
        icon: <ShareLinkedInIcon />,
        title: 'Chia sẻ với LinkedIn'
    },
    {
        icon: <ShareRedditIcon />,
        title: 'Chia sẻ với Reddit'
    },
    {
        icon: <ShareTelegramIcon />,
        title: 'Chia sẻ với Telegram'
    },
    {
        icon: <ShareEmailIcon />,
        title: 'Chia sẻ với Email'
    },
    {
        icon: <ShareLineIcon />,
        title: 'Chia sẻ với Line'
    },
    {
        icon: <SharePinterestIcon />,
        title: 'Chia sẻ với Pinterest'
    }
];

function Share({ children }) {
    const [menu, setMenu] = useState(MENU_SHARES);
    const [more, setMore] = useState(false);

    const handleMore = (e) => {
        e.preventDefault();
        setMore(true);
        setMenu(prev => [...prev, ...MENU_SHARES_MORE]);
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('share-group')}>   
                    {menu.map((result, index) => (
                        <Button key={index} className={cx('share-button')} to='#' leftIcon={result.icon} >{result.title}</Button>
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
                placement='top-start'
                offset={[-30, 0]}
                render={renderResult}
                onHide={() => {
                    setMenu(MENU_SHARES);
                    setMore(false);
                }}
            >
                {children}
            </Tippy>
        </div>
    );
}

Share.propTypes = {
    children: PropTypes.node.isRequired
};

export default Share;