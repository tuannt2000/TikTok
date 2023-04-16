import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function Menu({ menu }) {
    const [newMenu, setNewMenu] = useState(menu);
    const location = useLocation();
    const navigate = useNavigate();

    const line = useRef();
    const currentActive = useRef();
    
    useEffect(() => {
        const menuActive = menu.map(result => {
            result.active = false;
            if (location.pathname === result.pathname) {
                result.active = true;
            }

            return result;
        });

        setNewMenu(menuActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        if (line.current && currentActive.current) {
            line.current.style.left = currentActive.current.offsetLeft + "px";
            line.current.style.width = currentActive.current.clientWidth + "px";
        }
    });

    const handleHover = (e) => {
        line.current.style.left = e.currentTarget.childNodes[0].offsetLeft + "px";
        line.current.style.width = e.currentTarget.childNodes[0].clientWidth + "px";
    }

    const handleHoverOut = () => {
        line.current.style.left = currentActive.current.offsetLeft + "px";
        line.current.style.width = currentActive.current.clientWidth + "px";
    }

    const handleClick = (link) => {
        navigate(link);
    }

    return (
        <div className={cx('tabs-container')}>
           <div className={cx('tabs-wrappper')}>
                <div className={cx('tabs-nav-wrappper')}>
                    <div className={cx('tabs-nav-list')}>
                        { newMenu.map((result, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className={cx('div-tab', { active: result.active })}
                                    onMouseOver={handleHover}
                                    onMouseOut={handleHoverOut}
                                    onClick={() => handleClick(result.link)}
                                >
                                    <div ref={result.active ? currentActive : null}>{ result.title }</div>
                                </div>
                            )
                        })}
                    </div>
                    <div 
                        className={cx('tab-nav-ink')} 
                        ref={line} 
                        style={
                            {
                                width: 0,
                                left: 0
                            }
                        }
                    ></div>
                </div>
           </div>
        </div>
    );
}

export default Menu;