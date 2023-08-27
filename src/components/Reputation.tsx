import Tooltip from "@mui/material/Tooltip";

export default function Reputation({ reputation, decimal }: {
    reputation: string | number,
    decimal?: number;
}) {
    return (<div className='!normal-case  !mt-0 
    py-0 px-2 text-sm bg-slate-600 rounded-sm'>
        <Tooltip title={'Reputation score: ' + reputation} >
            <p>{Number(reputation)?.toFixed(decimal ?? 0)} </p>
        </Tooltip>
    </div>
    )
}
