import { Discussion } from '@hiveio/dhive'
import { useNavigate, useNavigation } from 'react-router-dom'
import STooltip from './STooltip';

export default function Tag({ comment }: { comment: Feed | Post }) {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/trendings/${comment.category}`)
    }
    return (
        <div onClick={handleOnClick} className='inline-block font-light float-right text-center'>
            <STooltip title={comment.community ?? comment.category}>
                {comment.community ?? comment.category}
            </STooltip>
        </div>
    )
}
