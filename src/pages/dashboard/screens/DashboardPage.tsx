import { useState } from 'react'
import BlogCard from '../../../components/card/BlogsCard';
import MainWrapper from '../../../components/wrapper/MainWrapper';
import { getActivePostsBy } from '../../../libs/SteemApi';
import './Editor.less'
import { useQuery } from 'react-query';
function DashboardPage() {
    const [rows, setRows] = useState<Feed[]>();
    const { data } = useQuery({
        queryKey: 'trendings-posts',
        queryFn: () => getActivePostsBy('Trending'),
        onSuccess(data) {
            setRows(data);
        },
    })


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


    return (
        <div >
            <MainWrapper leftContent={leftContent}
                rightContent={rightContent}>
                <div className='p-1'>
                    {data?.map(comment => (
                        <BlogCard comment={comment} />
                    ))}
                </div>
            </MainWrapper>


        </div>

    )
}

export { DashboardPage }
