import React, { useEffect, useState } from 'react';
import { Checkbox, Button } from 'semantic-ui-react';
import CustomSnackbar from '../utilities/customSnackBar';

const totalStyle = { display: 'block' };

export default (props) => {
    let onChangeCheckedColumns = [];
    const [displayColumn, setDisplayColumn] = useState([]);
    const [displayColumnDefs, setDisplayColumnDefs] = useState([]);
    const [columnLoading, setColumnLoading] = useState(false);
    const [status, setStatusBase] = useState("");
    const [message, setMessageBase] = useState("");
    const setStatus = msg => setStatusBase({ msg, date: new Date() });
    const setMessage = msg => setMessageBase(msg);

    const updateTotals = () => {
        let getColumn = props.columnApi.getAllColumns();
        let getColumnDefs = props.api.getColumnDefs();

        setDisplayColumnDefs(getColumnDefs);
        setDisplayColumn(getColumn);
        setColumnLoading(true);
    };

    useEffect(() => {
        props.api.addEventListener('modelUpdated', updateTotals);
        return () => props.api.removeEventListener('modelUpdated', updateTotals);
    }, []);

    const getColumns = () => {
        let content = [];
        let savedColumnsInLs = JSON.parse(localStorage.getItem('savedColumns'));
        if (savedColumnsInLs) {
            onChangeCheckedColumns.push(...savedColumnsInLs);
        };

        for (let idx in displayColumn) {
            const item = displayColumn[idx];
            console.log('each column :', item);
            content.push(
                <React.Fragment>
                    <Checkbox
                        key={item.colId}
                        label={<label className='custom-columns-format'>{props.columnApi.getDisplayNameForColumn(item)}</label>}
                        style={totalStyle}
                        onChange={getCheckedColumns}
                        name={item.colId}
                        defaultChecked={savedColumnsInLs != null ? savedColumnsInLs.includes(item.colId) : false}
                    ></Checkbox>
                </React.Fragment>);
        }
        return content;
    }

    const getCheckedColumns = (e, data) => {
        onChangeCheckedColumns.push(data.name);
    }

    const saveViews = () => {
        let uniqueChars = [];
        onChangeCheckedColumns.forEach((c) => {
            if (!uniqueChars.includes(c)) {
                uniqueChars.push(c);
            }
        });

        if (uniqueChars.length === 0) {
            setStatus('error');
            setMessage('Select columns to save your custom layout');
        } else {
            localStorage.removeItem('savedColumns');
            let cacheStringified = JSON.stringify(uniqueChars);
            localStorage.setItem("savedColumns", cacheStringified);
            setStatus('success');
            setMessage('Successfully saved column layout. Load again to see the changes');
        }
    }

    const removeSaveViews = () => {
        localStorage.removeItem('savedColumns');
        setStatus('success');
        setMessage('Removed column layout. Load again to see the changes');
    }

    return (
        <div>
            {status ? <CustomSnackbar key={status.date} status={status.msg} msg={message} /> : null}
            <span>
                <h2 style={{ textAlign: 'center' }}>
                    <i className="fa fa-calculator"></i> Custom Views
                </h2>
                {columnLoading ?
                    <div>
                        <div className='custom-columns'>
                            {getColumns()}
                        </div>
                        <Button primary onClick={saveViews}>Save View</Button>
                        <Button onClick={removeSaveViews}>Remove</Button>
                    </div>
                    : 'No Data'}
            </span>
        </div>
    );
};
