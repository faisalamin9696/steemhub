import STooltip from "./STooltip";

export default function Reputation({ reputation, decimal }: {
    reputation: string | number,
    decimal?: number;
}) {
    return (<div className='!normal-case  !mt-0 
    py-0 px-2 text-sm bg-slate-400 dark:bg-slate-600 rounded-sm'>
        <STooltip title={'Reputation score: ' + reputation} >
            <p className="text-white">{Number(reputation)?.toFixed(decimal ?? 0)} </p>
        </STooltip>
    </div>
    )
}
