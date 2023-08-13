import moment from 'moment/moment';
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
    current_time = current_time ?? moment().format('YYYY-MM-DD HH:mm:ss');
    const format_date = current_time.split(/[T\s]/);
    const day = format_date[0];

    return day;
}

export const formatTextMessage = (room) => {
    let new_text = 'Đã trở thành bạn bè';

    if (room.text) {
        room.text_user_id === room.room_user_id ? new_text = room.text : new_text = 'Bạn: ' + room.text;
    } else if (room.video_id && room.video_id !== 0) {
        const message = "Đã chia sẻ một video";
        room.text_user_id === room.room_user_id ? new_text = message : new_text = 'Bạn: ' + message;
    }

    return new_text;
}

export const formatTime = (time) => {
    if(!time) {
        return '00:00';
    }
    const timewithdate = new Date(time.toFixed(0) * 1000).toISOString().substr(11, 8);
    return timewithdate.slice(3);
}

export const formatFilename = (filename) => {
    filename = filename.substring(0, filename.lastIndexOf('.'));

    return filename;
}

export const formatTimeComment = (time) => {
    time = Date.parse(time)
    time = moment(time).format('YYYY-MM-DD')
    return moment(time, "YYYYMMDD").fromNow();
}

export const getNotificationNotRead = (notifications) => {
    const result = notifications.filter((notification) => !notification.checked);
    return result.length;
}