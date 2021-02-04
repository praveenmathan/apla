import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { RowDetailsContext, SaveBtnContext } from '../context/rowDetailsContext';

const ActionTable = (props) => {
    let consolidatedRows = [];
    const [open, setOpen] = React.useState(false);
    const { setRowDetailValue } = React.useContext(RowDetailsContext);
    const { setSaveBtnDisable } = React.useContext(SaveBtnContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onCellValueChanged = (params) => {
        if (!(params.oldValue === null && params.newValue === undefined)) {
            params.node.data['changed'] = true;
            consolidatedRows.push(params.data);
            setRowDetailValue(consolidatedRows);
            setSaveBtnDisable(false);
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <img src="" />
            </Dialog>
            <div className="ag-theme-alpine" style={{ height: '70vh' }}>
                <AgGridReact
                    defaultColDef={{
                        width: 175,
                        sortable: true,
                        resizable: true,
                        filter: true
                    }}
                    onGridReady={props.onGridReady}
                    rowData={props.rowData}
                    pagination={true}
                >

                    <AgGridColumn headerName="Products">
                        <AgGridColumn field="StyleColor" pinned="left" lockPinned={true} cellClass="lock-pinned" cellRenderer={function (params) {
                            return "<a target='_blank' href='http://images6.nike.com/is/image/DPILS/"
                                + params.value
                                + "-PV'>" + params.value + "</a>";
                        }} />
                        <AgGridColumn field="Comment"
                            editable={true}
                            cellEditor="agLargeTextCellEditor"
                            onCellValueChanged={onCellValueChanged} />
                        <AgGridColumn field="Description" />
                        <AgGridColumn field="SlimLifecycleSeason" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Recommendations" headerClass='custom-font-color' >
                        <AgGridColumn field="RecommendedAction" headerClass='custom-font-color' headerName="Action" width='200' />
                        <AgGridColumn field="SelectedRecommendedActionOverride" headerClass='custom-font-color' headerName="Action Override"
                            width='225'
                            editable={true}
                            cellEditor="agSelectCellEditor"
                            cellEditorParams={function (params) {
                                let givenValue = params.data.RecommendedActionOverride;
                                if (givenValue != null) {
                                    let actionOveride = givenValue.split(',');
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
                        <AgGridColumn field="RPT" />
                        <AgGridColumn field="Franchise" />
                        <AgGridColumn field="NikeLABIND" />
                        <AgGridColumn field="NRGIND" />
                        <AgGridColumn field="League" />
                        <AgGridColumn field="Team" />
                        <AgGridColumn field="AthleteName" />
                        <AgGridColumn field="MerchClassification" />
                        <AgGridColumn field="NikeIDIND" />
                        <AgGridColumn field="Silhouette" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Inventory">
                        <AgGridColumn field="Contracts" />
                        <AgGridColumn field="unassignedZerotoThirtyDaysOut" headerName='Unassigned Qty 0_30' />
                        <AgGridColumn field="UnassignedThirtyonetoSixtyDaysOut" headerName='Unassigned Qty 31_60' />
                        <AgGridColumn field="UnassignedSixtyonePlusDaysOut" headerName='Unassigned Qty 61 Plus' />
                        <AgGridColumn field="1083_Contracts" headerName='1083 Contracts' />
                        <AgGridColumn field="1084_Contracts" headerName='1084 Contracts' />
                        <AgGridColumn field="1085_Contracts" headerName='1085 Contracts' />
                        <AgGridColumn field="NSO_Contracts" />
                        <AgGridColumn field="WholesaleContract" />
                        <AgGridColumn field="StoreIOH" />
                        <AgGridColumn field="InTransit" />
                        <AgGridColumn field="OnOrder" />
                        <AgGridColumn field="GA_1083" headerName="GA 1083" />
                        <AgGridColumn field="GA_1084" headerName="GA 1084" />
                        <AgGridColumn field="GA_1085" headerName="GA 1085" />
                        <AgGridColumn field="SizeCountOwned" />
                        <AgGridColumn field="SizeCountTotal" />
                        <AgGridColumn field="SizeIntegrity" />
                        <AgGridColumn field="ChannelWOS" />
                        <AgGridColumn field="MarketPlaceWOS" />
                        <AgGridColumn field="RecommendedChaseUnits" />
                        <AgGridColumn field="RecommendedCancelUnits" />
                    </AgGridColumn>

                    <AgGridColumn headerName="Sales">
                        <AgGridColumn field="NetUnitsLastWeek" />
                        <AgGridColumn field="NetUnitsFourWkAvg" headerName="Net Units 4W Avg" />
                        <AgGridColumn field="NetUnitsFourWkRolling" headerName="Net Units 4W rolling" />
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
                        <AgGridColumn field="WebConversionPct" />
                        <AgGridColumn field="WebConversionFourWeekAvgRPT" />
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
                        <AgGridColumn field="CurrentSellingPrice" />
                        <AgGridColumn field="TotalDiscount" />
                        <AgGridColumn field="LastMDDate" />
                        <AgGridColumn field="MDCount" />
                        <AgGridColumn field="ContributionMargin" />
                        <AgGridColumn field="PriceElasticitySC" />
                        <AgGridColumn field="PriceElasticityRPT" />
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