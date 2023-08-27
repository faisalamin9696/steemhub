import { getResizedAvatar } from "../utils/imageApi"

export default function Avatar({ username, quality, size }: {
    username: string,
    quality?: 'small' | 'large' | 'medium',
    size?: number
}) {
    return (<img
        sizes='sm'
        loading='lazy'
        className={`${size ? `max-w-[${size}px] max-h-[${size}px]` : 'w-[40px] h-[40px]'}  rounded-full`}
        src={`${getResizedAvatar(username, quality ?? 'small')}`}
        alt="avatar"
    />
    )
}
