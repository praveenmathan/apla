import React, { useEffect } from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { RowDetailsContext, SaveBtnContext, SelectedChannelContext } from '../context/rowDetailsContext';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import CustomTooltip from './customTooltip.jsx';
import CustomStatsToolPanel from './customToolPanel.jsx';

const ActionTable = (props) => {
    let consolidatedRows = [];
    let tableLoading = props.tableLoading;

    const [inventory, setInventory] = React.useState([]);

    const { setRowDetailValue } = React.useContext(RowDetailsContext);
    const { setSaveBtnDisable } = React.useContext(SaveBtnContext);
    const { selectedChannel, selectedMarketPlace } = React.useContext(SelectedChannelContext);

    const actionInventoryColumnJapan = [
        { field: 'Contracts' },
        { field: 'UnassignedZerotoThirtyDaysOut', headerName: 'Unassigned Qty 0_30' },
        { field: 'UnassignedThirtyonetoSixtyDaysOut', headerName: 'Unassigned Qty 31_60' },
        { field: 'UnassignedSixtyonePlusDaysOut', headerName: 'Unassigned Qty 61 Plus' },
        { field: '1083_Contracts', headerName: '1083 Contracts' },
        { field: '1084_Contracts', headerName: '1084 Contracts' },
        { field: '1085_Contracts', headerName: '1085 Contracts' },
        { field: selectedChannel === 'NDDC' ? 'NSO_Contracts' : selectedChannel === 'NSO' ? 'NDDC_Contracts' : null },
        { field: 'WholesaleContract' },
        { field: 'StoreIOH' },
        { field: 'InTransit' },
        { field: 'OnOrder' },
        { field: 'GA_1083', headerName: "GA 1083" },
        { field: 'GA_1084', headerName: "GA 1084" },
        { field: 'GA_1085', headerName: "GA 1085" },
        { field: 'DOMsInventory', headerName: "DOMs Inventory" },
        { field: 'DOMsNDDCInventory', headerName: "DOMs NDDC Inventory" },
        { field: 'DOMsZOZOInventory', headerName: "DOMs ZOZO Inventory" },
        { field: 'DOMsNSOInventory', headerName: "DOMs NSO Inventory" },
        { field: 'DOMsNFSInventory', headerName: "DOMs NFS Inventory" },
        { field: 'DOMsEMPInventory', headerName: "DOMs EMP Inventory" },
        { field: 'DOMsGAInventory', headerName: "DOMs GA Inventory" },
        { field: 'SizeCountOwned' },
        { field: 'SizeCountTotal' },
        { field: 'SizeIntegrity' },
        { field: 'ChannelWOH' },
        { field: 'MarketPlaceWOH' },
        { field: 'RecommendedChaseUnits' },
        { field: 'RecommendedCancelUnits' }
    ];

    const actionInventoryColumnMexico = [
        { field: 'Contracts' },
        { field: 'UnassignedZerotoThirtyDaysOut', headerName: 'Unassigned Qty 0_30' },
        { field: 'UnassignedThirtyonetoSixtyDaysOut', headerName: 'Unassigned Qty 31_60' },
        { field: 'UnassignedSixtyonePlusDaysOut', headerName: 'Unassigned Qty 61 Plus' },
        { field: '1098_Contracts', headerName: '1098 Contracts' },
        { field: selectedChannel === 'NDDC' ? 'NSO_Contracts' : null },
        { field: 'WholesaleContract' },
        { field: 'StoreIOH' },
        { field: 'InTransit' },
        { field: 'OnOrder' },
        { field: 'GA_1098', headerName: "GA 1098" },
        { field: 'DOMsInventory', headerName: "DOMs Inventory" },
        { field: 'DOMsNDDCInventory', headerName: "DOMs NDDC Inventory" },
        { field: 'DOMsNSOInventory', headerName: "DOMs NSO Inventory" },
        { field: 'DOMsEMPInventory', headerName: "DOMs EMP Inventory" },
        { field: 'DOMsGAInventory', headerName: "DOMs GA Inventory" },
        { field: 'SizeCountOwned' },
        { field: 'SizeCountTotal' },
        { field: 'SizeIntegrity' },
        { field: 'ChannelWOH' },
        { field: 'MarketPlaceWOH' },
        { field: 'RecommendedChaseUnits' },
        { field: 'RecommendedCancelUnits' }
    ];

    const onCellValueChanged = (params) => {
        if (!(params.oldValue === null && (params.newValue === undefined || params.newValue === ''))) {
            params.node.data['changed'] = true;
            consolidatedRows.push(params.data);
            setRowDetailValue(consolidatedRows);
            setSaveBtnDisable(false);
        }
    }

    function numberParser(params) {
        // if (typeof (params.value) === 'number' && params.value !== 0) {
        //     if (params.value % 1 != 0) {
        //         var sansDec = params.value.toFixed(0);
        //         var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //         return `${formatted}`;
        //     }
        // }
        if (params.value === null || params.value === 0 || params.value === undefined) {
            return '-'
        }
    }

    useEffect(() => {
        /* If Mexico, Mexico related columns for Inventory */
        if (selectedMarketPlace === 'Mexico') {
            let filteredColumn = actionInventoryColumnMexico.filter(each => each.field != null);
            setInventory(filteredColumn);
        }

        /* If Japan, Japan related columns for Inventory */
        if (selectedMarketPlace === 'Japan') {
            let filteredColumn = actionInventoryColumnJapan.filter(each => each.field != null);
            setInventory(filteredColumn);
        }

        setTimeout(() => { actionTableSaveView(props); }, 2000);


    }, [tableLoading, props.gridColumnApi]);

    function actionTableSaveView(props) {
        let savedColumns = JSON.parse(localStorage.getItem("savedColumns"));
        if (props.gridColumnApi !== null && savedColumns !== null && props.gridColumnApi.columnController !== undefined) {
            let allColumns = props.gridColumnApi.getColumnState();

            let distinctColumn = [];
            allColumns.map((eachColumn) => {
                distinctColumn.push(eachColumn.colId);
            });
            let filteredKeywords = distinctColumn.filter((eachColumn) => !savedColumns.includes(eachColumn));
            props.gridColumnApi.setColumnsVisible([...filteredKeywords], false);

            console.log('filtered columns', filteredKeywords);
            console.log('column state', props.gridColumnApi.getColumnState());
        }
    }

    return (
        <React.Fragment>
            <div className="ag-theme-alpine" style={{ height: '80vh' }}>
                <AgGridReact
                    modules={AllModules}
                    cellClass={(params) => {
                        return params.colDef.type === 'numericColumn' ? 'ag-numeric-cell' : '';
                    }}
                    applyColumnDefOrder={true}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 175,
                        sortable: true,
                        resizable: true,
                        filter: true,
                        enableRowGroup: true,
                        enablePivot: true,
                        tooltipComponent: 'customTooltip',
                        valueFormatter: numberParser,
                    }}
                    icons={{
                        'custom-stats':
                            '<span className="ag-icon ag-icon-custom-stats"></span>',
                    }}
                    sideBar={{
                        toolPanels: [
                            {
                                id: 'columns',
                                labelDefault: 'Columns',
                                labelKey: 'columns',
                                iconKey: 'columns',
                                toolPanel: 'agColumnsToolPanel',
                                toolPanelParams: {
                                    suppressRowGroups: true,
                                    suppressValues: true,
                                    suppressPivots: true,
                                    suppressPivotMode: true,
                                    suppressSideButtons: true
                                },
                            },
                            {
                                id: 'customStats',
                                labelDefault: 'Custom View',
                                labelKey: 'customStats',
                                iconKey: 'custom-stats',
                                toolPanel: 'customStatsToolPanel',
                            },
                        ]
                    }}
                    onGridReady={props.onGridReady}
                    rowData={props.rowData}
                    pagination={true}
                    enableCellTextSelection={true}
                    suppressDragLeaveHidesColumns={true}
                    tooltipShowDelay={0}
                    frameworkComponents={{ customTooltip: CustomTooltip, customStatsToolPanel: CustomStatsToolPanel }}
                >
                    <AgGridColumn headerName="Product">
                        <AgGridColumn field="StyleColor" pinned="left" lockPinned={true} cellClass="lock-pinned"
                            cellRenderer={function (params) {
                                if (params.value !== undefined) {
                                    return "<a target='_blank' href='http://images6.nike.com/is/image/DPILS/"
                                        + params.value
                                        + "-PV'>" + params.value + "</a>";
                                } else {
                                    return null
                                }
                            }} />
                        <AgGridColumn field="Comment"
                            editable={true}
                            cellEditor="agLargeTextCellEditor"
                            onCellValueChanged={onCellValueChanged} />
                        <AgGridColumn field="Description" />
                        <AgGridColumn field="SlimLifecycleSeason" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Recommendation" headerClass='custom-font-color'>
                        <AgGridColumn field="RecommendedAction" headerClass='custom-font-color' headerName="Action" width='200' tooltipField="RecommendedAction" tooltipComponent="customTooltip"
                            tooltipComponentParams={{ color: '#ececec' }} />
                        <AgGridColumn field="SelectedRecommendedActionOverride" headerClass='custom-font-color' headerName="Action Override"
                            width='225'
                            editable={true}
                            cellEditor="agSelectCellEditor"
                            cellEditorParams={function (params) {
                                let givenValue = params.data.RecommendedActionOverride;
                                if (givenValue != null) {
                                    let actionOveride = givenValue.split(',');
                                    actionOveride.push('');
                                    return {
                                        values: actionOveride
                                    }
                                } else {
                                    return {
                                        values: []
                                    }
                                }
                            }}
                            onCellValueChanged={onCellValueChanged}
                        />
                    </AgGridColumn>

                    <AgGridColumn headerName="Calendar">
                        <AgGridColumn field="RetailWeek" />
                        <AgGridColumn field="CurrentSeason" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Product Attribution">
                        <AgGridColumn field="Style" />
                        <AgGridColumn field="Category" />
                        <AgGridColumn field="SubCategory" />
                        <AgGridColumn field="Division" />
                        <AgGridColumn field="Gender" />
                        <AgGridColumn field="CGD" />
                        <AgGridColumn field="Franchise" />
                        <AgGridColumn field="NikeLABIND" />
                        <AgGridColumn field="NRGIND" />
                        <AgGridColumn field="License" />
                        <AgGridColumn field="League" />
                        <AgGridColumn field="Team" />
                        <AgGridColumn field="AthleteName" />
                        <AgGridColumn field="MerchClassification" />
                        <AgGridColumn field="NikeIDIND" />
                        <AgGridColumn field="Silhouette" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Inventory">
                        {inventory.map(column => (
                            <AgGridColumn {...column} key={column.field} />
                        ))}
                    </AgGridColumn>

                    {/* <AgGridColumn headerName="Inventory">
                        <AgGridColumn field="Contracts" />
                        <AgGridColumn field="UnassignedZerotoThirtyDaysOut" headerName='Unassigned Qty 0_30' />
                        <AgGridColumn field="UnassignedThirtyonetoSixtyDaysOut" headerName='Unassigned Qty 31_60' />
                        <AgGridColumn field="UnassignedSixtyonePlusDaysOut" headerName='Unassigned Qty 61 Plus' />
                        {selectedMarketPlace === 'Japan' ? <AgGridColumn field="1083_Contracts" headerName='1083 Contracts' /> : <AgGridColumn hide={hideColumn} />}
                        {selectedMarketPlace === 'Japan' ? <AgGridColumn field="1084_Contracts" headerName='1084 Contracts' /> : <AgGridColumn hide={hideColumn} />}
                        {selectedMarketPlace === 'Japan' ? <AgGridColumn field="1085_Contracts" headerName='1085 Contracts' /> : <AgGridColumn hide={hideColumn} />}
                        {selectedMarketPlace === 'Mexico' ? <AgGridColumn field="1098_Contracts" headerName='1098 Contracts' /> : <AgGridColumn hide={hideColumn} />}
                        {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_Contracts" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_Contracts" /> : <AgGridColumn hide={hideColumn} />}
                        <AgGridColumn field="WholesaleContract" />
                        <AgGridColumn field="StoreIOH" />
                        <AgGridColumn field="InTransit" />
                        <AgGridColumn field="OnOrder" />
                        {selectedMarketPlace === 'Japan' ? <AgGridColumn field="GA_1083" headerName="GA 1083" /> : <AgGridColumn hide={hideColumn} />}
                        {selectedMarketPlace === 'Japan' ? <AgGridColumn field="GA_1084" headerName="GA 1084" /> : <AgGridColumn hide={hideColumn} />}
                        {selectedMarketPlace === 'Japan' ? <AgGridColumn field="GA_1085" headerName="GA 1085" /> : <AgGridColumn hide={hideColumn} />}
                        {selectedMarketPlace === 'Mexico' ? <AgGridColumn field="GA_1098" headerName="GA 1098" /> : <AgGridColumn hide={hideColumn} />}
                        <AgGridColumn field="DOMsInventory" headerName="DOMs Inventory" />
                        <AgGridColumn field="DOMsNDDCInventory" headerName="DOMs NDDC Inventory" />
                        {selectedMarketPlace === 'Japan' ? <AgGridColumn field="DOMsZOZOInventory" headerName="DOMs ZOZO Inventory" /> : <AgGridColumn hide={hideColumn} />}
                        <AgGridColumn field="DOMsNSOInventory" headerName="DOMs NSO Inventory" />
                        {selectedMarketPlace === 'Japan' ? <AgGridColumn field="DOMsNFSInventory" headerName="DOMs NFS Inventory" /> : <AgGridColumn hide={hideColumn} />}
                        <AgGridColumn field="DOMsEMPInventory" headerName="DOMs EMP Inventory" />
                        <AgGridColumn field="DOMsGAInventory" headerName="DOMs GA Inventory" />
                        <AgGridColumn field="SizeCountOwned" />
                        <AgGridColumn field="SizeCountTotal" />
                        <AgGridColumn field="SizeIntegrity" />
                        <AgGridColumn field="ChannelWOH" />
                        <AgGridColumn field="MarketPlaceWOH" />
                        <AgGridColumn field="RecommendedChaseUnits" />
                        <AgGridColumn field="RecommendedCancelUnits" />
                    </AgGridColumn> */}

                    <AgGridColumn headerName="Sales">
                        <AgGridColumn field="NetUnitsLastWeek" />
                        <AgGridColumn field="NetUnitsFourWkAvg" headerName="Net Units 4W Avg" />
                        <AgGridColumn field="NetUnitsFourWkRolling" headerName="Net Units 4W rolling" />
                        <AgGridColumn field="NetUnitsThirteenWkAvg" headerName="Net Units 13W Avg" />
                        <AgGridColumn field="NetUnitsMTD" />
                        <AgGridColumn field="NetUnitsSTD" />
                        <AgGridColumn field="NetSalesLW" />
                        <AgGridColumn field="NetSalesFourWkAvg" headerName="Net Sales 4w avg" />
                        <AgGridColumn field="NetSalesFourWkRolling" headerName="Net Sales 4w rolling" />
                        <AgGridColumn field="NetSalesMTD" />
                        <AgGridColumn field="NetSalesSTD" />
                        <AgGridColumn field="NetAURLW" headerName="Net AUR LW" />
                        <AgGridColumn field="NetAURFourWeekAvg" headerName="Net AUR 4W Avg" />
                        <AgGridColumn field="NetSalesLWUSD" />
                        <AgGridColumn field="NetSalesFourWeekRollingUSD" headerName="Net Sales 4w rolling USD" />
                        <AgGridColumn field="NetSalesFourWeekAvgUSD" headerName="Net Sales 4W Avg USD" />
                        <AgGridColumn field="NetSalesMTDUSD" />
                        <AgGridColumn field="NetSalesSTDUSD" />
                        <AgGridColumn field="NetAURLWUSD" headerName="Net AUR LW USD" />
                        <AgGridColumn field="NetAURFourWeekAvgUSD" headerName="Net AUR 4W Avg USD" />
                        <AgGridColumn field="DemandUnitsLW" />
                        <AgGridColumn field="DemandUnitsFourWeekRolling" headerName="Demand Units 4W rolling" />
                        <AgGridColumn field="DemandUnitsFourWeekAvg" headerName="Demand Units 4W avg" />
                        <AgGridColumn field="DemandUnitsThirteenWeekAvg" headerName="Demand Units 13W avg" />
                        <AgGridColumn field="DemandUnitsMTD" />
                        <AgGridColumn field="DemandUnitsSTD" />
                        <AgGridColumn field="DemandSalesLW" />
                        <AgGridColumn field="DemandSalesFourWeekRolling" headerName="Demand Sales 4W rolling" />
                        <AgGridColumn field="DemandSalesFourWeekAvg" headerName="Demand Sales 4W avg" />
                        <AgGridColumn field="DemandSalesMTD" />
                        <AgGridColumn field="DemandSalesSTD" />
                        <AgGridColumn field="DemandAURLW" headerName="Demand AUR LW" />
                        <AgGridColumn field="DemandAURFourWeekAvg" headerName="Demand AUR 4W avg" />
                        <AgGridColumn field="DemandSalesLWUSD" />
                        <AgGridColumn field="DemandSalesFourWeekRollingUSD" headerName="Demand Sales 4W rolling USD" />
                        <AgGridColumn field="DemandSalesFourWeekAvgUSD" headerName="Demand Sales 4W Avg USD" />
                        <AgGridColumn field="DemandSalesMTDUSD" />
                        <AgGridColumn field="DemandSalesSTDUSD" />
                        <AgGridColumn field="DemandAURLWUSD" headerName="Demand AUR LW USD" />
                        <AgGridColumn field="DemandAURFourWeekAvgUSD" headerName="Demand AUR 4W avg USD" />
                        <AgGridColumn field="FirstOrderDate" />
                        <AgGridColumn field="DaysOnSale" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Web Traffic">
                        <AgGridColumn field='WebTrafficLW' />
                        <AgGridColumn field="WebConversionPct" />
                        <AgGridColumn field="WebConversionFourWeekAvgCGD" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Plan">
                        <AgGridColumn field="LastSeasonPlanned" />
                        <AgGridColumn field="LastSeasonPlannedEndDate" />
                        <AgGridColumn field="InLastFPPlannedSeason" />
                        <AgGridColumn field="ClearanceSeason" />
                        <AgGridColumn field="ClearanceSeasonEndDate" />
                        <AgGridColumn field="Status" />
                        <AgGridColumn field="EPOD" />
                        <AgGridColumn field="LaunchTier" />
                        <AgGridColumn field="LOB" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Price">
                        <AgGridColumn field="MSRP" />
                        <AgGridColumn field="WholesalePriceLocal" />
                        <AgGridColumn field="CurrentLCSellingPrice" />
                        <AgGridColumn field="TotalDiscount" />
                        <AgGridColumn field="LastMDDate" />
                        <AgGridColumn field="MDCount" />
                        <AgGridColumn field="ContributionMargin" />
                        <AgGridColumn field="PriceElasticitySC" />
                        <AgGridColumn field="PriceElasticityConfidence" />
                        <AgGridColumn field="RecommendedMarkPCTElasticity" />
                        <AgGridColumn field="RecommendedMarkPRCElasticity" />
                        <AgGridColumn field="TotalDiscountAfterMarkElasticity" />
                        <AgGridColumn field="RecommendedMarkPCTInterval" />
                        <AgGridColumn field="RecommendedMarkPRCInterval" />
                        <AgGridColumn field="TotalDiscountAfterMarkInterval" />
                    </AgGridColumn>
                </AgGridReact>
            </div>

        </React.Fragment>
    );
}

export default ActionTable;
