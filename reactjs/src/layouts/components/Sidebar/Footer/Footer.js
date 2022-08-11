import classNames from "classnames/bind";
import styles from './Footer.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { memo } from 'react';

const cx = classNames.bind(styles);

const MENU_FOOTERS = [
    [
        {
            title: 'Giới thiệu',
            link: 'https://www.tiktok.com/about?lang=vi-VN'
        },
        {
            title: 'TikTok Browse',
            link: 'https://www.tiktok.com/browse'
        },
        {
            title: 'Bảng tin',
            link: 'https://newsroom.tiktok.com/'
        },
        {
            title: 'Liên hệ',
            link: 'https://www.tiktok.com/about/contact?lang=vi-VN'
        },
        {
            title: 'Sự nghiệp',
            link: 'https://careers.tiktok.com'
        },
        {
            title: 'ByteDance',
            link: 'https://www.bytedance.com/'
        }
    ],
    [
        {
            title: 'TikTok for Good',
            link: 'https://www.tiktok.com/forgood'
        },
        {
            title: 'Quảng cáo',
            link: 'https://www.tiktok.com/business/?attr_medium=tt_official_site_guidance&attr_source=tt_official_site&refer=tiktok_web'
        },
        {
            title: 'Developers',
            link: 'https://developers.tiktok.com/?refer=tiktok_web'
        },
        {
            title: 'Transparency',
            link: 'https://www.tiktok.com/transparency?lang=vi-VN'
        },
        {
            title: 'TikTok Rewards',
            link: 'https://www.tiktok.com/tiktok-rewards/vi-VN'
        },  
    ],
    [
        {
            title: 'Trợ giúp',
            link: 'https://support.tiktok.com/vi-VN'
        },
        {
            title: 'An toàn',
            link: 'https://www.tiktok.com/safety?lang=vi-VN'
        },
        {
            title: 'Điều khoản',
            link: 'https://www.tiktok.com/legal/terms-of-service?lang=vi-VN'
        },
        {
            title: 'Quyền riêng tư',
            link: 'https://www.tiktok.com/legal/privacy-policy-row?lang=vi-VN'
        },
        {
            title: 'Creator Portal',
            link: 'https://www.tiktok.com/creators/creator-portal/en-us/'
        },
        {
            title: 'Hướng dẫn Cộng đồng',
            link: 'https://www.tiktok.com/community-guidelines?lang=vi-VN'
        },
    ]
];

function Footer() {
    return (  
        <div className={cx('footer')}>
            {MENU_FOOTERS.map((menu_footer, menu_footer_index) => (
                <div className={cx('div-link')} key={menu_footer_index}>
                    {menu_footer.map((result, index) => (
                        <a target="_blank" rel="noreferrer" href={result.link} className={cx('footer-item')} key={index}>
                            {result.title}
                        </a>
                    ))}
                </div>
            ))}
            <div className={cx('more')}>
                <Tippy
                    className={cx('footer-tippy')}
                    interactive
                    content="NGUYÊN TẮC THỰC THI PHÁP LUẬT CỦA TIKTOK"
                    placement='top-start'
                    maxWidth={200}
                >
                    <button className={cx('more-text')}>Thêm</button>
                </Tippy>
            </div>
            <span className={cx('copyright')}>© 2022 TikTok</span>
        </div>
    );
}

export default memo(Footer);