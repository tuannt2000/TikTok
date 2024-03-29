import config from '~/config';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Feedback from '~/pages/Feedback';
import Message from '~/pages/Message';
import PageNoteFound from '~/pages/404';
import WebError from '~/pages/500';
import Search from '~/pages/Search/Search';

import { HeaderOnly } from '~/layouts';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Home },
    { path: config.routes.profile, component: Profile, max_width: true },
    { path: config.routes.search, component: Search, max_width: true },
    { path: config.routes.searchType, component: Search, max_width: true },
    { path: config.routes.messages, component: Message, layout: HeaderOnly },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.feedback, component: Feedback, layout: HeaderOnly },
    { path: config.routes.pageNotFound, component: PageNoteFound, layout: HeaderOnly },
    { path: config.routes.webError, component: WebError, layout: HeaderOnly }
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes } 