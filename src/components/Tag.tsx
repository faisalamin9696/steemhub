import { Discussion } from '@hiveio/dhive'

export default function Tag({ comment }: { comment: Discussion & { community_title?: string } }) {
    return (
        <div className='inline-block font-light float-right text-center'>
            {comment.community_title ?? comment.category}
        </div>
    )
}
