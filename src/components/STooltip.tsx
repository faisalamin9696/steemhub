import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';


interface TooltipProps {
    title: string | React.ReactNode,
    children: React.ReactNode
}
const STooltip = (props: TooltipProps) => {

    const { title } = props;
    const [bottom, setBottom] = useState(false);
    let titleRef;



    function setTitle(ref) {
        titleRef = ref;
    }

    function updatePosition() {
        if (!titleRef) return;

        const ratio = titleRef.getBoundingClientRect().top / window.innerHeight;

        setBottom(ratio < 0.45);
    }

    function handleVisibleChange(visible) {
        if (!visible) return;

        updatePosition();
    }

    return (
        <Tooltip
            {...props}
            title={<div ref={setTitle}>{title}</div>}
            placement={bottom ? 'bottom' : 'top'}
            onVisibleChange={handleVisibleChange}
        />
    );

}

export default STooltip;
