import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Menu from "./Menu";

const cx = classNames.bind(styles);
const TABS_MENU = [
    {
        title: "Top",
        link : "/search"
    },
    {
        title: "Tài khoản",
        link : "/search/user"
    },
    {
        title: "Video",
        link : "/search/video"
    }
]

function Search() {

    return (
        <div className={cx('main-container')}>
            <div className={cx('search-container')}>
                <Menu menu={TABS_MENU} />
            </div>
        </div>
    );
}

export default Search;