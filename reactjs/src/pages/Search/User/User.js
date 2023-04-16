import classNames from "classnames/bind";
import styles from "./User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getTopUser } from "~/redux/actions/search";
import { useEffect } from "react";
import UserItem from "./UserItem";

const cx = classNames.bind(styles);

function User() {
    const topUserList = useSelector(state => state.search.search_top_user);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getTopUser({q: searchParams.get('q') }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    return (
        <div className={cx('container')}>
            {topUserList.map((result, index) => (
                <UserItem key={index} data={result} />
            ))}
        </div>
    );
}

export default User;