import Avatar from '../Avatar'
import Reputation from '../Reputation'
import Card from '@mui/material/Card'
import Tag from '../Tag'
import { FormattedRelativeTime } from 'react-intl'
import { selectUnit } from '@formatjs/intl-utils'
import BodyShort from '../story/BodyShort'
import { getProxyImageURL } from '../../utils/helpers/image'
import TimeAgoWrapper from '../wrapper/TimeAgoWrapper'


interface BlogProps {
    comment: Feed | Post;
}
export default function BlogCard(props: BlogProps) {
    const { comment } = props;
    const thumbnail = JSON.parse(comment.json_images ?? '{}')[0] ?? undefined;

    return (
        <Card className='!bg-inherit !text-inherit m-0 !mb-4'>
            <div className='flex flex-col items-start'>
                <div className='p-4 flex flex-col w-full'>
                    <div className='  items-center flex flex-row space-x-2'>
                        <Avatar username={comment.author} />
                        <div className='flex flex-col w-full  '>
                            <div className=' flex flex-row items-center space-x-2 '>
                                <p>{comment.author}</p>
                                <Reputation reputation={comment.author_reputation} decimal={2} />
                                <div className='!ml-auto  bg-slate-400 dark:bg-slate-600  text-white rounded px-2 
                                hover:bg-slate-500 cursor-pointer'>
                                    <Tag comment={comment} />
                                </div>
                            </div>
                            <TimeAgoWrapper date={comment.created * 1000} />


                        </div>
                    </div>
                    <h1 className='mt-5 font-bold'>{comment.title}</h1>


                </div>
                {thumbnail && <img className='' src={getProxyImageURL(thumbnail)}
                    sizes='sm' />}

                <div className='p-4 flex flex-col'>

                    <BodyShort body={comment.body} />


                </div>
            </div>

        </Card>
    )
}


export { BlogCard }