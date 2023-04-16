import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Menu from "./Menu";
import User from "./User";
import TopVideo from "./TopVideo";
import { useLocation, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { useMemo } from "react";

const cx = classNames.bind(styles);
const TABS_MENU = [
    {
        title: "Video",
        link : "/search",
        pathname: "/search",
        Comp : <TopVideo />
    },
    {
        title: "Tài khoản",
        link : "/search/user",
        pathname: "/search/user",
        Comp : <User />
    }
]

function Search() {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const new_menu = useMemo(() => {
        const menu = TABS_MENU.map(result => {
            if (searchParams.get('q')) {
                result.link = result.pathname + '?q=' + searchParams.get('q');
            }
    
            return result;
        });

        return menu;
    }, [searchParams]);

    const Comp = () => {
        let Comp = '';
        new_menu.forEach(result => {
            if (location.pathname === result.link) {
                Comp = result.Comp;
            }
        });

        return Comp;
    }

    return (
        <div className={cx('main-container')}>
            <div className={cx('search-container')}>
                <Menu menu={new_menu} />
                <div className={cx('container')}>
                    <Comp />
                    <Button />
                </div>
            </div>
        </div>
    );
}

export default Search;