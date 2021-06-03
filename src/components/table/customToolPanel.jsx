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
    const [customLayoutList, setCustomLayoutList] = useState([]);

    const updateTotals = () => {
        let getColumn = props.columnApi.getAllColumns();
        let getColumnDefs = props.api.getColumnDefs();
        setDisplayColumnDefs(getColumnDefs);
        setDisplayColumn(getColumn);
        setColumnLoading(true);

        /* extract the custom layout buttons from LS */
        let customLayoutNameListForButton = JSON.parse(localStorage.getItem('customLayoutNameList'));
        if (customLayoutNameListForButton) {
            setCustomLayoutList(customLayoutNameListForButton);
        }
    };

    useEffect(() => {
        props.api.addEventListener('modelUpdated', updateTotals);
        return () => props.api.removeEventListener('modelUpdated', updateTotals);
    }, []);

    function getNameOfTheCustomLayout() {
        let customLayoutNameList = JSON.parse(localStorage.getItem('customLayoutNameList'));
        if (customLayoutNameList !== null && customLayoutNameList.length !== 0) {
            let lastItem;
            lastItem = customLayoutNameList[customLayoutNameList.length - 1];
            return lastItem;
        }
        return 'customLayout'
    }

    const getColumns = (eachColumnGroup) => {
        let content = [];

        /* extract the saved column in LS for default check */
        let savedColumnsInLs = JSON.parse(localStorage.getItem(getNameOfTheCustomLayout()));
        if (savedColumnsInLs) {
            onChangeCheckedColumns.push(...savedColumnsInLs.fields);
        };

        /* List the field names */
        eachColumnGroup.children.map((each) => {
            let column = props.columnApi.getColumn(each.colId);
            content.push(
                <Checkbox
                    key={each.colId}
                    label={<label className='custom-columns-format'>{props.columnApi.getDisplayNameForColumn(column)}</label>}
                    style={totalStyle}
                    onChange={getCheckedColumns}
                    name={each.colId}
                    defaultChecked={savedColumnsInLs != null ? savedColumnsInLs.fields.includes(each.colId) : false}
                ></Checkbox>
            );
        });

        return content;
    }

    const getCheckedColumns = (e, data) => {
        if (data.checked) {
            onChangeCheckedColumns.push(data.name);
        }

        if (!data.checked && onChangeCheckedColumns.includes(data.name)) {
            onChangeCheckedColumns = onChangeCheckedColumns.filter(each => each !== data.name);
        }
    }

    /*
        Save the new layouts in LS
    */
    const saveNewLayout = () => {
        var nameOfTheCustomLayout = prompt("Please enter a name for custom layout:", "Custom-Layout");
        if (nameOfTheCustomLayout === null || nameOfTheCustomLayout === "") {
            console.log("User cancelled the prompt.");
        } else {
            /* list of fields */
            let uniqueFields = [];
            onChangeCheckedColumns.forEach((each) => {
                if (!uniqueFields.includes(each)) {
                    uniqueFields.push(each);
                }
            });

            /* Creating a JSON to save in the LS of browser */
            let customLayoutObj = {
                name: nameOfTheCustomLayout,
                fields: uniqueFields
            };

            /* stringify the JSON to set it in localhost */
            let customLayoutObjStringified = JSON.stringify(customLayoutObj);
            localStorage.setItem(nameOfTheCustomLayout, customLayoutObjStringified);

            /* create / update the array in the localhost */
            let customLayoutNameList = JSON.parse(localStorage.getItem('customLayoutNameList'));
            customLayoutNameList = customLayoutNameList ? customLayoutNameList : [];
            customLayoutNameList.push(nameOfTheCustomLayout);
            let customLayoutNameListStringified = JSON.stringify(customLayoutNameList);
            localStorage.setItem("customLayoutNameList", customLayoutNameListStringified);

            /* update the state - to display the buttons */
            setCustomLayoutList([...customLayoutList, nameOfTheCustomLayout]);

            setStatus('success');
            setMessage('Successfully saved column layout');
        }
    }

    /* Changing the layout */
    function changeLayout(nameSelected) {
        let customLayoutNameListChangeLayout = JSON.parse(localStorage.getItem('customLayoutNameList'));
        customLayoutNameListChangeLayout = customLayoutNameListChangeLayout.filter(each => each !== nameSelected);
        customLayoutNameListChangeLayout.push(nameSelected);

        let customLayoutNameListChangeLayoutStringified = JSON.stringify(customLayoutNameListChangeLayout);
        localStorage.setItem("customLayoutNameList", customLayoutNameListChangeLayoutStringified);

        setStatus('success');
        setMessage(`Changed to ${nameSelected}. Load again to see the changes`);
    }

    /* To remove the saved views from LS */
    const removeSaveViews = () => {
        localStorage.removeItem('customLayout');
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
                        {customLayoutList.length !== 0 && customLayoutList.map((each, i) => {
                            return <Button key={i} primary onClick={() => changeLayout(each)}>{each}</Button>
                        })}

                        <div className='custom-columns'>
                            {
                                displayColumnDefs.map((eachColumnGroup) => {
                                    return <div key={eachColumnGroup.headerName}>
                                        <span className="headerincustomview">{eachColumnGroup.headerName}</span>
                                        {getColumns(eachColumnGroup)}
                                        <br></br>
                                    </div>
                                })
                            }
                        </div>

                        <Button primary onClick={saveNewLayout}>New Layout</Button>
                        <Button onClick={removeSaveViews}>Remove</Button>
                    </div>
                    : 'No Data'}
            </span>
        </div>
    );
};
