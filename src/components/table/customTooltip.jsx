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
        <div className="custom-tooltip">
            <h4 className=''>{data.RecommendedAction}</h4>
            <ul>{(data.ToolTipValue != null && typeof (data.ToolTipValue) != undefined) ? getToolTipValue : null}</ul>
        </div>
    );
});
