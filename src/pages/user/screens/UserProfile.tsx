import React, { useEffect, useState } from 'react'
import BlogCard from '../../../components/card/BlogsCard'
import { Discussion } from '@hiveio/dhive';
import { getDiscussionBy } from '../../../libs/Condensor';
function UserProfile() {

    const [data, setData] = useState<Discussion[]>();

    const fetchDiscussion = async () => {
        const data = await getDiscussionBy('faisalamin', 'faisalamin');
        if (data) { setData(data); }

    }

    useEffect(() => {
        fetchDiscussion();

    }, []);
    return (
        <div className='flex flex-col space-y-2'>

            {data ? data.map(comment => (
                <BlogCard comment={comment} />
            )) : null}

        </div>
    )
}

export { UserProfile }