import UserPage, { UserProfile } from '../user'
import { Route, Routes } from 'react-router-dom';
import BlogCard from '../../components/card/BlogsCard';
import MiddleWare from '../../navigation/MiddleWare';
import Card from '@mui/material/Card';
import DashboardPage from '../dashboard';


export default function AppRoutes() {
    return <Routes>
        <Route path='/' Component={DashboardPage} />

        {/* use cases
        trendings/(tag, community)
        tag/@username/permlink
        @username
        @username/(comments, followers, followings, wallet) */}


        <Route path=':category' Component={MiddleWare} >
            <Route Component={UserPage} />
            <Route path=':username' Component={UserPage} />
            <Route path=':username/:permlink' Component={UserPage} />
            <Route path='comments' Component={() => <div>comments</div>} />
            <Route path='followers' Component={() => <div>Followers</div>} />
            <Route path='followings' Component={() => <div>Followings</div>} />
            <Route path='wallet' Component={() => <div>Wallet</div>} />
        </Route>

        <Route path='*' Component={() => <div className="h-screen w-full flex justify-center items-center">
            <Card className="flex w-40 h-40 items-center justify-center">
                <p className='text-xl font-bold'>Error 404</p>
            </Card>
        </div>} />
    </Routes>
}
