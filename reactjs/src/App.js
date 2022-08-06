import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { gapi } from 'gapi-script';
import { CLIENT_ID, SCOPE } from '~/constants/Login';

function App() {
    const pathname = window.location.pathname;

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: CLIENT_ID,
                scope: SCOPE
            })
        };

        gapi.load('client:auth2', start);
    });

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
