import {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { gapi } from 'gapi-script';
import { CLIENT_ID, SCOPE } from '~/constants/Login';

function App() {
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
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />
              </Layout>}
            />
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
