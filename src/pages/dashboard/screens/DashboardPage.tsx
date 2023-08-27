import React, { useEffect, useState } from 'react'
import { getDiscussionBy } from '../../../libs/Condensor'
import { Discussion } from '@hiveio/dhive';
import BlogCard from '../../../components/card/BlogsCard';
import MainWrapper from '../../../components/wrapper/MainWrapper';

function DashboardPage() {
    const [data, setData] = useState<Discussion[]>();

    const fetchDiscussion = async () => {
        const data = await getDiscussionBy('faisalamin', 'faisalamin');
        if (data) { setData(data); }

    }

    

    const leftContent = (
        <div>
            <li>Location</li>
            <li>Voting power</li>
            <li>Vote value</li>
            <li>RC</li>
        </div>
    )

    const rightContent = (
        <div>
            <h2 className='text-xl font-semibold'>Communities</h2>
        </div>
    )

    useEffect(() => {
        fetchDiscussion();

    }, []);

    return (
        <div>
            <MainWrapper leftContent={leftContent}
                rightContent={rightContent}>

                {data ? data.map(comment => (
                    <BlogCard comment={comment} />
                )) : null}
            </MainWrapper>


        </div>

    )
}

export { DashboardPage }
