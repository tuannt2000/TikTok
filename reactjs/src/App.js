import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { gapi } from 'gapi-script';
import { CLIENT_ID, SCOPE } from '~/constants/Login';
import { useDispatch } from "react-redux";
import { getAllLanguages } from '~/redux/actions/language';
import { getInfoUser } from '~/redux/actions/user';
import { getAllDiscoves } from '~/redux/actions/discove';
import Alert from './components/Alert';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: CLIENT_ID,
                scope: SCOPE
            })
        };

        gapi.load('client:auth2', start);

        if (localStorage.getItem("token")) {
            dispatch(getInfoUser());
        }

        dispatch(getAllDiscoves());
        dispatch(getAllLanguages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <div className="App" style={{ position: "relative" }}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (typeof route.layout !== 'undefined') {
                            Layout = route.layout === null ? Fragment : route.layout;
                        }

                        const Page = route.component;
                        return <Route exact={true} key={index} path={route.path} element={
                            <Layout max_width={route.max_width ?? false}>
                                <Page />
                            </Layout>}
                        />
                    })}
                    <Route path='*' exact={true} element={<Navigate to={"/"} />} />
                </Routes>
            </div>
            <Alert />
        </Router>
    );
}

export default App;
