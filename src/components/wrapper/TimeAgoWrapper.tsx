/* eslint react/prop-types: 0 */
import moment from 'moment';
import { getTimeFromNow } from '../../utils/time';
import STooltip from '../STooltip';

interface Props {
    date: number;
    withoutUtc?: boolean;
}


export default function TimeAgoWrapper(props: Props) {
    const { date, withoutUtc } = props;

    // const intervalIdRef = useRef<NodeJS.Timer | undefined>();

    // useEffect(() => {
    //     setTimeAgo(getTimeFromNow(date, withoutUtc ?? false));

    //     // return () => clearInterval(intervalIdRef.current);
    // }, [date])
    // Function to update the value in the Redux store
    // const updateReduxValue = () => {
    //     setTimeAgo(getTimeFromNow(date, withoutUtc ?? false));
    // };

    // Set up the interval to run the updateReduxValue function every 60 seconds
    // useEffect(() => {
    //     intervalIdRef.current = setInterval(updateReduxValue, 60000);
    //     return () => clearInterval(intervalIdRef.current);
    // }, []);

    return (
        <div>
            <STooltip title={moment(props.date).format('lll') ?? getTimeFromNow(props.date, props.withoutUtc ?? false)} >
                <span>
                    <p>{getTimeFromNow(props.date, props.withoutUtc ?? false)?.toLowerCase()}</p>

                </span>
            </STooltip>
        </div>

    )
}
