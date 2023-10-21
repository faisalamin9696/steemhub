import React from 'react'
import { useLocation } from 'react-router-dom'
import MainWrapper from '../../../components/wrapper/MainWrapper';
import { useQuery } from 'react-query';
import { getActivePostsBy } from '../../../libs/SteemApi';
import BlogCard from '../../../components/card/BlogsCard';

function CommunityPage() {
    const location = useLocation();
    const urlArray = location.pathname.split('/');
    const category = urlArray[1];
    const community = urlArray[2];

    const { isLoading, error, data } = useQuery({
        queryKey: ['communityData'],
        queryFn: () => getActivePostsBy('Created')
    })


    const leftContent = () => {
        return <div>Left Content</div>
    }


    const rightContent = () => {
        return <div>Right COntent</div>
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <MainWrapper leftContent={leftContent()} rightContent={rightContent()}>

            {data?.map((comment) => (<BlogCard comment={comment} />))}

        </MainWrapper>
    )
}

export { CommunityPage }
