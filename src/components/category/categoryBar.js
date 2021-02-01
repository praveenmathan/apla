import React, { useState, useEffect, useContext } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import './categoryBar.css';
import { Form, Select } from 'semantic-ui-react';
import Skeleton from '@material-ui/lab/Skeleton';
import { RowDetailsContext, SaveBtnContext } from '../context/rowDetailsContext';

/* eslint-disable */
const CategoryBar = (props) => {
    let isLoading = props.isLoading;

    const [isFetching, setIsFetching] = useState(false);
    const [marketPlaceOptions, setMarketPlaceOptions] = useState([]);
    const [marketPlaceValue, setMarketPlaceValue] = useState('');
    const [marketPlaceError, setMarketPlaceError] = useState(false);

    const [retailWeekOptions, setRetailWeekOptions] = useState([]);
    const [retailWeekValue, setRetailWeekValue] = useState('');
    const [retailWeekError, setRetailWeekError] = useState(false);

    const [channelOptions, setChannelOptions] = useState([]);
    const [channelValue, setChannelValue] = useState('');
    const [channelError, setChannelError] = useState(false);

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [categoryValue, setCategoryValue] = useState([]);
    const [categoryError, setCategoryError] = useState(false);

    const [genderOptions, setGenderOptions] = useState([]);
    const [genderValue, setGenderValue] = useState('');
    const [genderError, setGenderError] = useState(false);

    const [divisionOptions, setDivisionOptions] = useState([]);
    const [divisionValue, setDivisionValue] = useState('');
    const [divisionError, setDivisionError] = useState(false);

    const [tableOptions, setTableOptions] = useState([]);
    const [tableValue, setTableValue] = useState('');
    const [tableError, setTableError] = useState(false);

    /* Context */
    const { rowDetailValue } = useContext(RowDetailsContext);
    const { setCategoryBarLoading } = useContext(SaveBtnContext);
    const { saveBtnDisable } = useContext(SaveBtnContext);

    const canBeSubmitted = () => {
        return retailWeekValue != '' && channelValue != '' && divisionValue != '' && genderValue != '' && categoryValue.length != 0 && tableValue != '';
    }

    const isEnabled = canBeSubmitted();
    console.log('isEnabled', isEnabled);

    useEffect(() => {
        /* To initialise marketplace options */
        let marketPlaceOptions = [];
        if (isLoading) {
            props.auth.userAccessDetails.map(eachitem => marketPlaceOptions.push({
                key: eachitem.marketplaceDescription,
                value: eachitem.marketplaceDescription,
                text: eachitem.marketplaceDescription
            }));
        }
        setMarketPlaceOptions(marketPlaceOptions);

        /* To initialise retailweek options */
        let retailWeekOptions = [];
        if (isLoading) {
            props.data.selectionFilters.retailWeek.map(eachitem => retailWeekOptions.push({
                key: eachitem.weekDescription,
                value: eachitem.weekDescription,
                text: eachitem.weekDescription
            }));
        }
        setRetailWeekOptions(retailWeekOptions);

        /* To initialise catergory options */
        let categoryOptions = [];
        if (isLoading) {
            props.data.selectionFilters.category.map(eachitem => categoryOptions.push({
                key: eachitem.categoryDescription,
                value: eachitem.categoryDescription,
                text: eachitem.categoryDescription
            }));
        }
        setCategoryOptions(categoryOptions);

        /* To initialise gender options */
        let genderOptions = [];
        if (isLoading) {
            props.data.selectionFilters.gender.map(eachitem => genderOptions.push({
                key: eachitem.genderDescription,
                value: eachitem.genderDescription,
                text: eachitem.genderDescription
            }));
        }
        setGenderOptions(genderOptions);

        /* To initialise division options */
        let divisionOptions = [];
        if (isLoading) {
            props.data.selectionFilters.division.map(eachitem => divisionOptions.push({
                key: eachitem.divisionDescription,
                value: eachitem.divisionDescription,
                text: eachitem.divisionDescription
            }));
        }
        setDivisionOptions(divisionOptions);

        /* To initialise table options */
        let tableOptions = [];
        if (isLoading) {
            props.data.selectionFilters.formattedTableData.map(eachitem => tableOptions.push({
                key: eachitem.tableDescription,
                value: eachitem.tableDescription,
                text: eachitem.tableDescription
            }));
        }
        setTableOptions(tableOptions);
    }, [isLoading, props]);

    /* To handle marketplace change */
    const handleMarketPlaceChange = (e, { value }) => {
        if (value != '') {
            setMarketPlaceError(false);
            setMarketPlaceValue(value);
            setIsFetching(true);
            props.auth.userAccessDetails.map(eachitem => {
                if (eachitem.marketplaceDescription === value) {
                    let tempChannel = [];
                    eachitem.channels.map(eachChannel => {
                        tempChannel.push({
                            key: eachChannel.channelDescription,
                            value: eachChannel.channelDescription,
                            text: eachChannel.channelDescription
                        });
                        setChannelOptions(tempChannel);
                        setIsFetching(false);
                    });
                } else {
                    return;
                }
            });
        } else {
            setMarketPlaceValue(value);
            setMarketPlaceError(true);
        }
    };

    /* To handle retail week change */
    const handleRetailWeekChange = (e, { value }) => {
        if (value != '') {
            setRetailWeekError(false);
            setRetailWeekValue(value);
        } else {
            setRetailWeekError(true);
            setRetailWeekValue(value);
        }
    };

    /* To handle channel change */
    const handleChannelChange = (e, { value }) => {
        if (value != '') {
            setChannelError(false);
            setChannelValue(value);
        } else {
            setChannelError(true);
            setChannelValue(value);
        }
    };

    /* To handle category change */
    const handleCategoryChange = (e, { value }) => {
        if (value.length != 0) {
            setCategoryError(false);
            setCategoryValue(value);
        } else {
            setCategoryError(true);
            setCategoryValue(value);
        }
    };

    /* To handle gender change */
    const handleGenderChange = (e, { value }) => {
        if (value != '') {
            setGenderError(false);
            setGenderValue(value);
        } else {
            setGenderError(true);
            setGenderValue(value);
        }
    };

    /* To handle division change */
    const handleDivisionChange = (e, { value }) => {
        if (value != '') {
            setDivisionError(false);
            setDivisionValue(value);
        } else {
            setDivisionError(true);
            setDivisionValue(value);
        }
    };

    /* To handle table change */
    const handleTableChange = (e, { value }) => {
        if (value != '') {
            setTableError(false);
            setTableValue(value);
        } else {
            setTableError(true);
            setTableValue(value);
        }
    };

    /* Handle Load/submit button */
    const handleSubmit = () => {
        if (rowDetailValue.length !== 0) {
            alert('Table Rows have been modified, Please Save');
        } else {
            const selectionFilterDataUpdated = {
                marketPlace: marketPlaceValue,
                retailWeek: retailWeekValue,
                channel: channelValue,
                category: categoryValue,
                gender: genderValue,
                division: divisionValue,
                action: tableValue
            };
            props.onCatergorySubmit(selectionFilterDataUpdated);
        }
    }

    function getFilteredArray(rows) {
        let arr = rows;
        let ids = arr.map(o => o.StyleColor);
        let filtered = arr.filter(({ StyleColor }, index) => !ids.includes(StyleColor, index + 1));
        return filtered;
    }

    /* Handle Save button */
    const handleSave = () => {
        setCategoryBarLoading(true);
        let filteredArray = getFilteredArray(rowDetailValue)
        props.OnTableRowSave(filteredArray);
    }

    /* Handle Export to excel */
    const handleExportToExcel = () => {
        setCategoryBarLoading(true);
        props.onExportToExcel();
    }

    return (<>
        <Form>
            <Form.Group widths='equal'>
                <Grid columns='equal' className="center">
                    <Grid.Column width={2}>
                        <Segment>
                            {isLoading ? <Form.Field
                                control={Select}
                                options={marketPlaceOptions}
                                placeholder='Marketplace'
                                search
                                searchInput={{ id: 'form-select-control-marketplace' }}
                                onChange={handleMarketPlaceChange}
                                error={marketPlaceError ? {
                                    content: 'Please choose a Market Place',
                                    pointing: 'above',
                                } : false}
                            /> : <Skeleton variant="rect" width={130} height={40} />}
                            <h1>MARKETPLACE</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Segment>
                            {isLoading ? <Form.Field
                                control={Select}
                                options={retailWeekOptions}
                                placeholder='Week'
                                clearable
                                search
                                searchInput={{ id: 'form-select-control-week' }}
                                onChange={handleRetailWeekChange}
                                error={retailWeekError ? {
                                    content: 'Please choose a Retail Week',
                                    pointing: 'above',
                                } : false}
                            /> : <Skeleton variant="rect" width={130} height={40} />}
                            <h1>RETAIL WEEK</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Segment>
                            {isLoading ? <Form.Field
                                control={Select}
                                options={channelOptions}
                                placeholder='Channel'
                                clearable
                                loading={isFetching}
                                search
                                searchInput={{ id: 'form-select-control-channel' }}
                                onChange={handleChannelChange}
                                error={channelError ? {
                                    content: 'Please choose a Channel',
                                    pointing: 'above',
                                } : false}
                            /> : <Skeleton variant="rect" width={130} height={40} />}
                            <h1>CHANNEL</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <Grid columns='equal' >
                                <Grid.Column width={5}>
                                    {isLoading ? <Form.Field
                                        control={Select}
                                        options={divisionOptions}
                                        placeholder='Division'
                                        clearable
                                        search
                                        searchInput={{ id: 'form-select-control-division' }}
                                        onChange={handleDivisionChange}
                                        error={divisionError ? {
                                            content: 'Please choose a Division',
                                            pointing: 'above',
                                        } : false}
                                    /> : <Skeleton variant="rect" width={130} height={40} />}
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    {isLoading ? <Form.Field
                                        control={Select}
                                        options={genderOptions}
                                        placeholder='Gender'
                                        clearable
                                        search
                                        searchInput={{ id: 'form-select-control-gender' }}
                                        onChange={handleGenderChange}
                                        error={genderError ? {
                                            content: 'Please choose a gender',
                                            pointing: 'above',
                                        } : false}
                                    /> : <Skeleton variant="rect" width={130} height={40} />}
                                </Grid.Column>
                                <Grid.Column>
                                    {isLoading ? <Form.Field
                                        control={Select}
                                        options={categoryOptions}
                                        placeholder='Category'
                                        clearable
                                        multiple
                                        fluid
                                        selection
                                        searchInput={{ id: 'form-select-control-category' }}
                                        onChange={handleCategoryChange}
                                        error={categoryError ? {
                                            content: 'Please choose a category',
                                            pointing: 'above',
                                        } : false}
                                    /> : <Skeleton variant="rect" width={130} height={40} />}
                                </Grid.Column>
                            </Grid>
                            <h1>MERCHANDISE HIERARCHY</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Segment>
                            {isLoading ? <Form.Field
                                control={Select}
                                options={tableOptions}
                                placeholder='Action'
                                clearable
                                search
                                searchInput={{ id: 'form-select-control-action' }}
                                onChange={handleTableChange}
                                error={tableError ? {
                                    content: 'Please choose an Action',
                                    pointing: 'above',
                                } : false}
                            /> : <Skeleton variant="rect" width={130} height={40} />}
                            <h1>TABLE</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Form.Button fluid primary onClick={handleSubmit} disabled={!isEnabled}>LOAD</Form.Button>
                        <Form.Button fluid primary onClick={handleSave} disabled={saveBtnDisable}>SAVE</Form.Button>
                        <Form.Button fluid primary onClick={handleExportToExcel} disabled={!isEnabled}>E2E</Form.Button>
                    </Grid.Column>
                </Grid>
            </Form.Group>
        </Form>
    </>);
}

export default CategoryBar;