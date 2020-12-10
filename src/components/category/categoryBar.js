import React, { useState, useEffect } from 'react'
import { Grid, Segment } from 'semantic-ui-react';
import './categoryBar.css';
import { Form, Button, Select } from 'semantic-ui-react';

const actionOptions = [
    { value: 'markdown', text: 'Markdown' },
    { value: 'closeout', text: 'Close Out' },
    { value: 'cancel', text: 'Cancel' }
];

const CategoryBar = (props) => {
    const formType = {
        marketPlace: '',
        retailWeek: '',
        channel: '',
        category: [],
        gender: '',
        division: ''
    }

    const [isFetching, setIsFetching] = useState(false);
    const [channelOptions, setChannelOptions] = useState([]);
    const [marketPlaceOptions, setMarketPlaceOptions] = useState([]);
    const [marketPlaceValue, setMarketPlaceValue] = useState('');
    // const [retailWeekValue, setRetailWeekValue] = useState('');
    // const [channelValue, setChannelValue] = useState('');
    // const [categoryValue, setCategoryValue] = useState('');
    // const [genderValue, setGenderValue] = useState('');
    // const [divisionValue, setDivisionValue] = useState('');
    const [consolidatedForm, setConsolidatedForm] = useState(formType);

    useEffect(() => {
        /* To initialise marketplace options */
        let marketPlaceOptions = [];
        props.auth.userAccessDetails.map(eachitem => marketPlaceOptions.push({
            key: eachitem.marketplaceId,
            value: eachitem.marketplaceId,
            text: eachitem.marketplaceDescription
        }));
        setMarketPlaceOptions(marketPlaceOptions);
    }, []);

    /* To handle marketplace change */
    const handleMarketPlaceChange = (e, { value }) => {
        setMarketPlaceValue(value);
        setIsFetching(true);
        props.auth.userAccessDetails.map(eachitem => {
            if (eachitem.marketplaceId === value) {
                let tempChannel = [];
                eachitem.channels.map(eachChannel => {
                    tempChannel.push({
                        key: eachChannel.channelId,
                        value: eachChannel.channelId,
                        text: eachChannel.channelDescription
                    });
                    setChannelOptions(tempChannel);
                    setIsFetching(false);
                });
            } else {
                return;
            }
        });
    };

    const handleSubmit = () => {
        setConsolidatedForm({ marketPlace: marketPlaceValue });
        console.log(consolidatedForm);
    }

    return (<>
        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Grid columns='equal'>
                    <Grid.Column>
                        <Segment>
                            <Form.Field
                                control={Select}
                                options={marketPlaceOptions}
                                placeholder='Marketplace'
                                search
                                searchInput={{ id: 'form-select-control-marketplace' }}
                                onChange={handleMarketPlaceChange}
                            />
                            <h1>MARKETPLACE</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Form.Field
                                control={Select}
                                options={actionOptions}
                                placeholder='Week'
                                search
                                searchInput={{ id: 'form-select-control-week' }}
                            />
                            <h1>RETAIL WEEK</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Form.Field
                                control={Select}
                                options={channelOptions}
                                placeholder='Channel'
                                loading={isFetching}
                                search
                                searchInput={{ id: 'form-select-control-channel' }}
                            />
                            <h1>CHANNEL</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <Grid columns='equal' >
                                <Grid.Column>
                                    <Form.Field
                                        control={Select}
                                        options={actionOptions}
                                        placeholder='Category'
                                        clearable
                                        fluid
                                        multiple
                                        selection
                                        search
                                        searchInput={{ id: 'form-select-control-category' }}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field
                                        control={Select}
                                        options={actionOptions}
                                        placeholder='Gender'
                                        search
                                        searchInput={{ id: 'form-select-control-gender' }}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field
                                        control={Select}
                                        options={actionOptions}
                                        placeholder='Division'
                                        search
                                        searchInput={{ id: 'form-select-control-division' }}
                                    />
                                </Grid.Column>
                            </Grid>
                            <h1>MERCHANDISE HIERARCHY</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Form.Field
                                control={Select}
                                options={actionOptions}
                                placeholder='Action'
                                search
                                searchInput={{ id: 'form-select-control-action' }}
                            />
                            <h1>TABLE</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Button>Load</Form.Button>
                        <Button>Save</Button>
                    </Grid.Column>
                </Grid>
            </Form.Group>
        </Form>
    </>);
}

export default CategoryBar;