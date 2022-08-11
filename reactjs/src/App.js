import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { gapi } from 'gapi-script';
import { CLIENT_ID, SCOPE } from '~/constants/Login';
import {useDispatch, useSelector} from "react-redux";
import { getAllLanguages } from '~/redux/actions/language';
import { getInfoUser } from '~/redux/actions/user';
import { getUserOffer, getUserFollowing } from '~/redux/actions/user';
import { getAllDiscoves } from '~/redux/actions/discove';

function App() {
    const pathname = window.location.pathname;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: CLIENT_ID,
                scope: SCOPE
            })
        };

        gapi.load('client:auth2', start);
    });

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getInfoUser());
        }

        dispatch(getAllDiscoves());
        dispatch(getAllLanguages());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (user.currentUser.id) {
            dispatch(getUserOffer(user.currentUser.id));
            dispatch(getUserFollowing(user.currentUser.id));
        }

        dispatch(getAllLanguages());
    }, [dispatch, user.currentUser.id]);


    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout === null ? Fragment : route.layout;
                        }

                        const Page = route.component;
                        return <Route exact={true} key={index} path={route.path} element={
                            <Layout>
                                <Page />
                            </Layout>}
                        />
                    })}
                    <Route path='*' exact={true} element={<Navigate to={"/404?fromUrl=" + pathname} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
