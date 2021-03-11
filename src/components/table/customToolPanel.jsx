import React, { useEffect, useState } from 'react';
import { Checkbox } from 'semantic-ui-react'

const totalStyle = { display: 'block' };

export default (props) => {
    let onChangeCheckedColumns = [];
    const [displayColumn, setDisplayColumn] = useState([]);
    const [columnLoading, setColumnLoading] = useState(false);

    const updateTotals = () => {
        let getColumn = props.columnApi.getAllColumns();
        setDisplayColumn(getColumn);
        setColumnLoading(true);
    };

    useEffect(() => {
        props.api.addEventListener('modelUpdated', updateTotals);
        return () => props.api.removeEventListener('modelUpdated', updateTotals);
    }, []);

    const getColumns = () => {
        let content = [];
        for (let idx in displayColumn) {
            const item = displayColumn[idx];
            content.push(
                <Checkbox
                    key={item.colId}
                    label={<label>{item.colId}</label>}
                    style={totalStyle}
                    onChange={getCheckedColumns}
                ></Checkbox>);
        }
        return content;
    }

    const getCheckedColumns = (e) => {
        onChangeCheckedColumns.push(e.target.innerText);
    }

    const saveViews = () => {
        console.log('saved columns :', onChangeCheckedColumns);
        localStorage.removeItem('savedColumns');
        let hiddenColumns = [];
        // displayColumn.map(eachColumn => {
        //     onChangeCheckedColumns.map(eachname => {
        //         if (eachColumn.colId !== eachname) {
        //             hiddenColumns.push(eachColumn.colId);
        //         }
        //     });
        // });
        let cacheStringified = JSON.stringify(onChangeCheckedColumns);
        localStorage.setItem("savedColumns", cacheStringified);
    }

    return (
        <div>
            <span>
                <h2 style={{ textAlign: 'center' }}>
                    <i className="fa fa-calculator"></i> Save Views
                </h2>
                {columnLoading ? <div>
                    {getColumns()}
                </div> : 'its not loading'}
                <button onClick={saveViews}>Save View</button>
            </span>
        </div>
    );
};
