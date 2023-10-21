import { useEffect, useState } from 'react'
import BlogCard from '../../../components/card/BlogsCard'
import { getActiveAuthorPosts, getActivePostsBy } from '../../../libs/SteemApi';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
function UserProfile() {
    const location = useLocation();
    const urlArray = location.pathname.split('/');
    const username = urlArray[1]?.replace('@', '');

    const { isLoading, error, data } = useQuery({
        queryKey: ['postsData'],
        queryFn: () => getActiveAuthorPosts(username)
    });

    if (isLoading) return <div>Loading...</div>

    return (
        <div className='flex flex-col space-y-2'>

            {data ? data.map(comment => (
                <div className='rounded'>
                    <BlogCard comment={comment} />
                </div>
            )) : null}

        </div>
    )
}

export { UserProfile }