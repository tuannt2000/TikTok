import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Feedback from '~/pages/Feedback';
import Message from '~/pages/Message';
import Live from '~/pages/Live';
import PageNoteFound from '~/pages/404';
import WebError from '~/pages/500';
import Search from '~/pages/Search/Search';

import { HeaderOnly, DefaultLayoutMaxWidth } from '~/layouts';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile, layout: DefaultLayoutMaxWidth },
    { path: config.routes.search, component: Search, layout: DefaultLayoutMaxWidth },
    { path: config.routes.searchType, component: Search, layout: DefaultLayoutMaxWidth },
    { path: config.routes.messages, component: Message, layout: HeaderOnly },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.feedback, component: Feedback, layout: HeaderOnly },
    { path: config.routes.pageNotFound, component: PageNoteFound, layout: HeaderOnly },
    { path: config.routes.webError, component: WebError, layout: HeaderOnly }
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes } 