import { DiscoverStyleTagIcon, DiscoverStyleMusicIcon } from '~/components/Icons';

export const formatNumber = ($number) => {
    if ($number > 1000000) {
        return ($number/1000000).toFixed(1) + 'M';
    }

    if ($number > 1000) {
        return ($number/1000).toFixed(1) + 'K';
    }

    return $number;
};

export const getIconDiscove = ($type) => {
    let Icon = null;
    switch ($type) {
        case 'tag':
            Icon =  <DiscoverStyleTagIcon />;
            break;
        case 'music':
            Icon = <DiscoverStyleMusicIcon />;
            break;
        default:
            break;
    }

    return Icon;
};