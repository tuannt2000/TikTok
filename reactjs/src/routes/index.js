import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Feedback from '~/pages/Feedback';
import Live from '~/pages/Live';
import PageNoteFound from '~/pages/404';
import WebError from '~/pages/500';

import { HeaderOnly } from '~/layouts';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.feedback, component: Feedback, layout: HeaderOnly },
    { path: config.routes.pageNotFound, component: PageNoteFound, layout: HeaderOnly },
    { path: config.routes.webError, component: WebError, layout: HeaderOnly }
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes } 