import Avatar from '../Avatar'
import Reputation from '../Reputation'
import { catchImageFromMetadata, getProxyImageURL } from '../../utils/imageApi'
import Card from '@mui/material/Card'
import { Discussion } from '@hiveio/dhive'
import Tag from '../Tag'

interface BlogProps {
    comment: Discussion;
}
export default function BlogCard(props: BlogProps) {
    const { comment } = props;
    const thumbnail = catchImageFromMetadata(comment.json_metadata);

    return (
        <Card className='!bg-inherit !text-inherit !m-0'>
            <div className='flex flex-col items-start'>
                <div className='p-4 flex flex-col w-full'>
                    <div className='  items-center flex flex-row space-x-2'>
                        <Avatar username='faisalamin' />
                        <div className='flex flex-col w-full  '>
                            <div className=' flex flex-row items-center space-x-2 '>
                                <p>{comment.author}</p>
                                <Reputation reputation={comment.author_reputation} />
                                <div className='!ml-auto bg-slate-600 rounded px-2 hover:bg-slate-500 cursor-pointer'>
                                    <Tag comment={comment} />
                                </div>
                            </div>

                            <time className='text-sm'>{comment.created}</time>

                        </div>
                    </div>
                    <h1 className='mt-5 font-bold'>{comment.title}</h1>


                </div>
                {thumbnail && <img className='' src={getProxyImageURL(thumbnail)}
                    sizes='sm' />}

                <div className='p-4 flex flex-col'>

                    <p className='text-sm'>{comment.body.substring(0, 250)}</p>


                </div>
            </div>

        </Card>
    )
}


export { BlogCard }