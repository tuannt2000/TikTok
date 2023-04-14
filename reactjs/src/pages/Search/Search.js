import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Menu from "./Menu";
import Default from "./Default";
import User from "./User";
import Video from "./Video";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const cx = classNames.bind(styles);
const TABS_MENU = [
    {
        title: "Top",
        link : "/search",
        Comp : <Default />
    },
    {
        title: "Tài khoản",
        link : "/search/user",
        Comp : <User />
    },
    {
        title: "Video",
        link : "/search/video",
        Comp : <Video />
    }
]

function Search() {
    const location = useLocation();
    const Comp = () => {
        let Comp = '';
        TABS_MENU.forEach(result => {
            if (location.pathname === result.link) {
                Comp = result.Comp;
            }
        });

        return Comp;
    }

    return (
        <div className={cx('main-container')}>
            <div className={cx('search-container')}>
                <Menu menu={TABS_MENU} />
                <div className={cx('container')}>
                    <Comp />
                    <Button />
                </div>
            </div>
        </div>
    );
}

export default Search;