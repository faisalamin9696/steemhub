import { useLocation } from 'react-router-dom'
import UserPage from '../pages/user';
import { isCommunity } from '../utils/steemUtils';

export default function MiddleWare() {
    const location = useLocation();
    const urlArray = location.pathname.split('/')
    const urlLength = location.pathname.split('/').length;
    const _isUser = urlLength <= 3 && urlArray[1].startsWith('@');
    const _isCommunity = urlLength === 3 && isCommunity(urlArray[2]);
    const _isPost = urlLength === 4;

    if (_isUser) {
        return <UserPage home={urlLength <= 2} />;
    }
    if (_isCommunity) {
        return <div>Community</div>
    }

    if (_isPost) {
        return <div>{urlArray.reverse()[1] + '/' + urlArray[0]}</div>
    }
    // If slug doesn't start with '@', it's a tag route
    return (<div className='h-full'>Tags</div>);
}
