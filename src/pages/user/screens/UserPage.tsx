import { Outlet, useParams } from 'react-router-dom';
import { UserProfileHeader } from '../components/header/UserProfileHeader';
import { UserProfile } from './UserProfile';
import MainWrapper from '../../../components/wrapper/MainWrapper';


function UserPage({ home }: { home?: boolean }) {
    const params = useParams();
    const { category, username } = params;


    const leftContent = (
        <div>
            <li>Location</li>
            <li>Voting power</li>
            <li>Vote value</li>
            <li>RC</li>
        </div>
    )

    const rightContent = (
        <div className=''>
            <h2 className='text-xl font-semibold'>Communities</h2>
        </div>
    )
    return (
        <UserProfileHeader>
            <MainWrapper leftContent={leftContent}
                rightContent={rightContent}>

                {home ? <UserProfile /> :
                    <Outlet />}
            </MainWrapper>

        </UserProfileHeader>

    )
}

export { UserPage }
