import React, { useEffect } from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { RowDetailsContext, SaveBtnContext, SelectedChannelContext } from '../context/rowDetailsContext';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import CustomTooltip from './customTooltip.jsx';
import CustomStatsToolPanel from './customToolPanel.jsx';
import {
    actionInventoryColumnJapan, actionInventoryColumnMexico, actionInventoryColumnIndonesia,
    actionInventoryColumnMalaysia, actionInventoryColumnIndia, actionInventoryColumnPhilippines,
    actionInventoryColumnSingapore, actionInventoryColumnThailand, actionInventoryColumnVietnam,
    actionInventoryColumnSouthEastAsia
} from './customs/Inventorydetails/actionTableInventories'
import { actionSalesColumnCommon, actionSalesColumnSouthEastAsia } from './customs/Salesdetails/actionTableSales';
import { actionPriceColumnEachSea, actionPriceColumnSouthEastAsia } from './customs/Pricedetails/actionTablePrice';

const ActionTable = (props) => {
    let consolidatedRows = [];
    let tableLoading = props.tableLoading;

    const actionSalesColumnDefault = [
        { field: 'NetUnitsLastWeek' },
        { field: 'NetUnitsFourWkAvg', headerName: 'Net Units 4W Avg' },
        { field: 'NetUnitsFourWkRolling', headerName: 'Net Units 4W rolling' },
        { field: 'NetUnitsThirteenWkAvg', headerName: 'Net Units 13W Avg' },
        { field: 'NetUnitsMTD' },
        { field: 'NetUnitsSTD' },
        { field: 'NetSalesLW' },
        { field: 'NetSalesFourWkAvg', headerName: 'Net Sales 4w avg' },
        { field: 'NetSalesFourWkRolling', headerName: 'Net Sales 4w rolling' },
        { field: 'NetSalesMTD' },
        { field: 'NetSalesSTD' },
        { field: 'NetAURLW', headerName: 'Net AUR LW' },
        { field: 'NetAURFourWeekAvg', headerName: 'Net AUR 4W Avg' },
        { field: 'NetSalesLWUSD' },
        { field: 'NetSalesFourWeekRollingUSD', headerName: 'Net Sales 4w rolling USD' },
        { field: 'NetSalesFourWeekAvgUSD', headerName: 'Net Sales 4W Avg USD' },
        { field: 'NetSalesMTDUSD' },
        { field: 'NetSalesSTDUSD' },
        { field: 'NetAURLWUSD', headerName: 'Net AUR LW USD' },
        { field: 'NetAURFourWeekAvgUSD', headerName: 'Net AUR 4W Avg USD' },
        { field: 'DemandUnitsLW' },
        { field: 'DemandUnitsFourWeekRolling', headerName: 'Demand Units 4W rolling' },
        { field: 'DemandUnitsFourWeekAvg', headerName: 'Demand Units 4W avg' },
        { field: 'DemandUnitsThirteenWeekAvg', headerName: 'Demand Units 13W avg' },
        { field: 'DemandUnitsMTD' },
        { field: 'DemandUnitsSTD' },
        { field: 'DemandSalesLW' },
        { field: 'DemandSalesFourWeekRolling', headerName: 'Demand Sales 4W rolling' },
        { field: 'DemandSalesFourWeekAvg', headerName: 'Demand Sales 4W avg' },
        { field: 'DemandSalesMTD' },
        { field: 'DemandSalesSTD' },
        { field: 'DemandAURLW', headerName: 'Demand AUR LW' },
        { field: 'DemandAURFourWeekAvg', headerName: 'Demand AUR 4W avg' },
        { field: 'DemandSalesLWUSD' },
        { field: 'DemandSalesFourWeekRollingUSD', headerName: 'Demand Sales 4W rolling USD' },
        { field: 'DemandSalesFourWeekAvgUSD', headerName: 'Demand Sales 4W Avg USD' },
        { field: 'DemandSalesMTDUSD' },
        { field: 'DemandSalesSTDUSD' },
        { field: 'DemandAURLWUSD', headerName: 'Demand AUR LW USD' },
        { field: 'DemandAURFourWeekAvgUSD', headerName: 'Demand AUR 4W avg USD' },
        { field: 'FirstOrderDate' },
        { field: 'DaysOnSale' },
        { field: 'ApsVsPlan' },
    ];

    const actionPriceColumnDefault = [
        { field: 'MSRP' },
        { field: 'WholesalePriceLocal' },
        { field: 'CurrentLCSellingPrice' },
        { field: 'TotalDiscount' },
        { field: 'LastMDDate' },
        { field: 'MDCount' },
        { field: 'MarkUp' },
        { field: 'ContributionMargin' },
        { field: 'PriceElasticitySC' },
        { field: 'PriceElasticityConfidence' },
        { field: 'RecommendedMarkPCTElasticity' },
        { field: 'RecommendedMarkPRCElasticity' },
        { field: 'TotalDiscountAfterMarkElasticity' },
        { field: 'RecommendedMarkPCTInterval' },
        { field: 'RecommendedMarkPRCInterval' },
        { field: 'TotalDiscountAfterMarkInterval' },
    ];

    const [inventory, setInventory] = React.useState([]);
    const [sales, setSales] = React.useState([]);
    const [price, setPrice] = React.useState([]);

    const { setRowDetailValue } = React.useContext(RowDetailsContext);
    const { setSaveBtnDisable } = React.useContext(SaveBtnContext);
    const { selectedMarketPlace, selectedChannel } = React.useContext(SelectedChannelContext);

    const onCellValueChanged = (params) => {
        if (!(params.oldValue === null && (params.newValue === undefined || params.newValue === ''))) {
            params.node.data['changed'] = true;
            consolidatedRows.push(params.data);
            setRowDetailValue(consolidatedRows);
            setSaveBtnDisable(false);
        }
    }

    function numberParser(params) {
        if (params.value === null || params.value === 0 || params.value === undefined) {
            return '-'
        }
    }

    useEffect(() => {

        setSales(actionSalesColumnCommon);

        /* If selected marketplace is Mexico, Mexico related columns for Inventory */
        if (selectedMarketPlace === 'Mexico') {
            let filteredColumn = actionInventoryColumnMexico.filter(each => each.field != null);
            setInventory(filteredColumn);
        }

        /* If selected marketplace is Japan, Japan related columns for Inventory */
        if (selectedMarketPlace === 'Japan') {
            let filteredColumn = actionInventoryColumnJapan.filter(each => each.field != null);
            setInventory(filteredColumn);
        }

        /* If selected marketplace is Indonesia, Indonesia related columns for Inventory, price */
        if (selectedMarketPlace === 'Indonesia') {
            let filteredColumn = actionInventoryColumnIndonesia.filter(each => each.field != null);
            setInventory(filteredColumn);
            setPrice(actionPriceColumnEachSea);
        }

        /* If selected marketplace is Malaysia, Malaysia related columns for Inventory, price */
        if (selectedMarketPlace === 'Malaysia') {
            let filteredColumn = actionInventoryColumnMalaysia.filter(each => each.field != null);
            setInventory(filteredColumn);
            setPrice(actionPriceColumnEachSea);
        }

        /* If selected marketplace is Philippines, Philippines related columns for Inventory, price */
        if (selectedMarketPlace === 'Philippines') {
            let filteredColumn = actionInventoryColumnPhilippines.filter(each => each.field != null);
            setInventory(filteredColumn);
            setPrice(actionPriceColumnEachSea);
        }

        /* If selected marketplace is India, India related columns for Inventory, price */
        if (selectedMarketPlace === 'India') {
            let filteredColumn = actionInventoryColumnIndia.filter(each => each.field != null);
            setInventory(filteredColumn);
            setPrice(actionPriceColumnEachSea);
        }

        /* If selected marketplace is Thailand, Thailand related columns for Inventory, price */
        if (selectedMarketPlace === 'Thailand') {
            let filteredColumn = actionInventoryColumnThailand.filter(each => each.field != null);
            setInventory(filteredColumn);
            setPrice(actionPriceColumnEachSea);
        }


        /* If selected marketplace is Singapore, Singapore related columns for Inventory, price */
        if (selectedMarketPlace === 'Singapore') {
            let filteredColumn = actionInventoryColumnSingapore.filter(each => each.field != null);
            setInventory(filteredColumn);
            setPrice(actionPriceColumnEachSea);
        }

        /* If selected marketplace is Vietnam, Vietnam related columns for Inventory, price, */
        if (selectedMarketPlace === 'Vietnam') {
            let filteredColumn = actionInventoryColumnVietnam.filter(each => each.field != null);
            setInventory(filteredColumn);
            setPrice(actionPriceColumnEachSea);
        }

        /* If selected marketplace is SEA aggregate, SEA aggregate related columns for Inventory, price, sales */
        if (selectedMarketPlace === 'South East Asia') {
            let filteredColumn = actionInventoryColumnSouthEastAsia.filter(each => each.field != null);
            setInventory(filteredColumn);
            setPrice(actionPriceColumnSouthEastAsia);
            setSales(actionSalesColumnSouthEastAsia);
        }

        setTimeout(() => { actionTableSaveView(props); }, 2000);

    }, [tableLoading, props.gridColumnApi, selectedMarketPlace]);

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
            props.gridColumnApi.moveColumns(savedColumns, 0);
        }
    }

    const orderSavedViewColumns = (e) => {
        let savedColumnsinLs = JSON.parse(localStorage.getItem("savedColumns"));
        if (savedColumnsinLs != null) {
            let draggedColumns = e.columnApi.columnController.allDisplayedColumns;
            let saveViewColumnsOrdered = [];
            draggedColumns.forEach(each => {
                saveViewColumnsOrdered.push(each.colId);
            });

            localStorage.removeItem('savedColumns');
            let arrayStringified = JSON.stringify(saveViewColumnsOrdered);
            localStorage.setItem("savedColumns", arrayStringified);
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
                    onDragStopped={orderSavedViewColumns}
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
                            // {
                            //     id: 'customStats',
                            //     labelDefault: 'Custom View',
                            //     labelKey: 'customStats',
                            //     iconKey: 'custom-stats',
                            //     toolPanel: 'customStatsToolPanel',
                            // },
                        ]
                    }}
                    onGridReady={props.onGridReady}
                    rowData={props.rowData}
                    pagination={true}
                    enableCellTextSelection={true}
                    suppressDragLeaveHidesColumns={true}
                    tooltipShowDelay={0}
                //frameworkComponents={{ customTooltip: CustomTooltip, customStatsToolPanel: CustomStatsToolPanel }}
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

                    <AgGridColumn headerName="Sales">
                        {sales.map(column => (
                            <AgGridColumn {...column} key={column.field} />
                        ))}
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
                        {price.map(column => (
                            <AgGridColumn {...column} key={column.field} />
                        ))}
                        {/* <AgGridColumn field="MSRP" />
                        <AgGridColumn field="WholesalePriceLocal" />
                        <AgGridColumn field="CurrentLCSellingPrice" />
                        <AgGridColumn field="TotalDiscount" />
                        <AgGridColumn field="LastMDDate" />
                        <AgGridColumn field="MDCount" />
                        <AgGridColumn field="MarkUp" />
                        <AgGridColumn field="ContributionMargin" />
                        <AgGridColumn field="PriceElasticitySC" />
                        <AgGridColumn field="PriceElasticityConfidence" />
                        <AgGridColumn field="RecommendedMarkPCTElasticity" />
                        <AgGridColumn field="RecommendedMarkPRCElasticity" />
                        <AgGridColumn field="TotalDiscountAfterMarkElasticity" />
                        <AgGridColumn field="RecommendedMarkPCTInterval" />
                        <AgGridColumn field="RecommendedMarkPRCInterval" />
                        <AgGridColumn field="TotalDiscountAfterMarkInterval" /> */}
                    </AgGridColumn>
                </AgGridReact>
            </div>

        </React.Fragment>
    );
}

export default ActionTable;
