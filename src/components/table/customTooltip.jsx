import React, { forwardRef, useImperativeHandle, useState } from 'react';

export default forwardRef((props, ref) => {
    const [data, setData] = useState(
        props.api.getDisplayedRowAtIndex(props.rowIndex).data
    );

    useImperativeHandle(ref, () => {
        return {
            getReactContainerClasses() {
                return ['custom-tooltip'];
            },
        };
    });

    const getToolTipValue = (data.ToolTipValue != null && typeof (data.ToolTipValue) != undefined) ? data.ToolTipValue.split(',').map((each, index) => {
        return <li key={index}>{each}</li>
    }) : null;

    return (
        <div
            className="custom-tooltip"
            style={{ backgroundColor: props.color || 'white' }}
        >
            <div className="custom-tooltip-box">
                <span>{(data.ToolTipValue != null && typeof (data.ToolTipValue) != undefined) ? getToolTipValue : null}</span>
            </div>
        </div>
    );
});
