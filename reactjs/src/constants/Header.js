import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faGear,
    faGlobeAsia,
    faKeyboard,
    faQuestionCircle,
    faSignOut,
    faUser
} from "@fortawesome/free-solid-svg-icons";

export const UPLOAD = "Tải lên";
export const LOGIN = "Đăng nhập";
export const MESSAGE = "Tin nhắn";
export const INBOX = "Hộp thư";

export const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faGlobeAsia} />,
        title: 'Tiếng Việt',
        type: 'languages',
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    code: 'en',
                    title: 'English'
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt'
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Phím tắt trên bàn phím'
    }
];

export const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        to: '',
        type: 'profile',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Nhận xu',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        to: '/logout',
        separate: true,
    },
];