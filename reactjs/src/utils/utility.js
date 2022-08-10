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

export const formatDate = (current_time) => {
    const format_date = current_time.split(/[T\s]/);
    const day = format_date[0];

    return day;
}

export const formatTextMessage = (room) => {
    let new_text = 'Đã trở thành bạn bè';

    if (room.text) {
        room.text_user_id === room.room_user_id ? new_text = room.text : new_text = 'Bạn: ' + room.text;
    }

    return new_text;
}