import { Outlet, useLocation, useParams } from 'react-router-dom';
import { UserProfileHeader } from '../components/header/UserProfileHeader';
import { UserProfile } from './UserProfile';
import MainWrapper from '../../../components/wrapper/MainWrapper';
import { useQuery } from 'react-query';
import { getAccountExt } from '../../../libs/SteemApi';


function UserPage({ home }: { home?: boolean }) {
    const location = useLocation();
    const urlArray = location.pathname.split('/');
    const username = urlArray[1]?.replace('@', '');

    const { isLoading, error, data } = useQuery({
        queryKey: ['userData'],
        queryFn: () => getAccountExt(username)


    })
    const leftContent = (
        <div className='flex flex-col'>
            <div> {data?.upvote_mana_percent}% VP</div>
            <div> {data?.upvote_mana_percent}% VP</div>
            <div> {data?.rc_mana_percent}% RC</div>
        </div>
    )

    const rightContent = (
        <div className=''>
            <h2 className='text-xl font-semibold'>Communities</h2>
        </div>
    )
    return (
        <UserProfileHeader account={data!}>
            <MainWrapper leftContent={leftContent}
                rightContent={rightContent}>

                {home ? <UserProfile /> :
                    <Outlet />}
            </MainWrapper>

        </UserProfileHeader>

    )
}

export { UserPage }
