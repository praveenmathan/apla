import { AgGridColumn, AgGridReact } from 'ag-grid-react';

const ActionTable = (props) => {
    return (
        <div className="ag-theme-alpine" style={{ height: '70vh' }}>
            <AgGridReact
                defaultColDef={{
                    width: 150,
                    sortable: true,
                    resizable: true,
                    filter: true
                }}
                onGridReady={props.onGridReady}
                rowData={props.rowData}
                pagination={true}
            >

                <AgGridColumn headerName="Products">
                    <AgGridColumn field="styleColor" pinned="left" lockPinned={true} cellClass="lock-pinned" cellRenderer={function (params) {
                        return "<a target='_blank' href='http://images6.nike.com/is/image/DPILS/"
                            + params.value
                            + "-PV'>" + params.value + "</a>";
                    }} />
                    <AgGridColumn field="comment" />
                    <AgGridColumn field="description" />
                    <AgGridColumn field="slimLifecycleSeason" />
                </AgGridColumn>

                <AgGridColumn headerName="Recommendations" headerClass='custom-font-color'>
                    <AgGridColumn field="recommendedAction" headerClass='custom-font-color' width='225' />
                    <AgGridColumn field="recommendedActionOverride" headerClass='custom-font-color'
                        width='300'
                    // editable={true}
                    // cellEditor="agSelectCellEditor"
                    // cellEditorParams={function (params) {
                    //     let givenValue = params.data.recommendedActionOverride;
                    //     if (givenValue != null) {
                    //         let actionOveride = givenValue.split(',');
                    //         return {
                    //             values: actionOveride
                    //         }
                    //     } else {
                    //         return {
                    //             values: []
                    //         }
                    //     }
                    // }} 
                    />
                </AgGridColumn>

                <AgGridColumn headerName="Calendar">
                    <AgGridColumn field="retailWeek" />
                    <AgGridColumn field="currentSeason" />
                </AgGridColumn>

                <AgGridColumn headerName="Product Attribution">
                    <AgGridColumn field="style" />
                    <AgGridColumn field="category" />
                    <AgGridColumn field="subCategory" />
                    <AgGridColumn field="division" />
                    <AgGridColumn field="gender" />
                    <AgGridColumn field="rpt" />
                    <AgGridColumn field="franchise" />
                    <AgGridColumn field="nikeLABIND" />
                    <AgGridColumn field="nrgind" />
                    <AgGridColumn field="league" />
                    <AgGridColumn field="team" />
                    <AgGridColumn field="athleteName" />
                    <AgGridColumn field="merchClassification" />
                    <AgGridColumn field="nikeIDIND" />
                </AgGridColumn>

                <AgGridColumn headerName="Inventory">
                    <AgGridColumn field="contracts" />
                    <AgGridColumn field="unassignedSixtyonePlusDaysOut" headerName='Unassigned Qty 61 Plus' />
                    <AgGridColumn field="unassignedZerotoThirtyDaysOut" headerName='Unassigned Qty 0_30' />
                    <AgGridColumn field="unassignedThirtyonetoSixtyDaysOut" headerName='Unassigned Qty 31_60' />
                    <AgGridColumn field="oneZeroEightThreeContracts" headerName='1083 Contracts' />
                    <AgGridColumn field="oneZeroEightFourContracts" headerName='1084 Contracts' />
                    <AgGridColumn field="oneZeroEightFiveContracts" headerName='1085 Contracts' />
                    <AgGridColumn field="nsoContracts" />
                    <AgGridColumn field="wholesaleContract" />
                    <AgGridColumn field="storeIOH" />
                    <AgGridColumn field="inTransit" />
                    <AgGridColumn field="onOrder" />
                    <AgGridColumn field="gaOneZeroEightThree" headerName="GA 1083" />
                    <AgGridColumn field="gaOneZeroEightFour" headerName="GA 1084" />
                    <AgGridColumn field="gaOneZeroEightFive" headerName="GA 1085" />
                    <AgGridColumn field="sizeCountOwned" />
                    <AgGridColumn field="sizeCountTotal" />
                    <AgGridColumn field="sizeIntegrity" />
                    <AgGridColumn field="slimWOS" />
                    <AgGridColumn field="recommendedChaseUnits" />
                    <AgGridColumn field="recommendedCancelUnits" />
                </AgGridColumn>

                <AgGridColumn headerName="Sales">
                    <AgGridColumn field="netUnitsLastWeek" />
                    <AgGridColumn field="netUnitsFourWkAvg" headerName="Net Units 4W Avg" />
                    <AgGridColumn field="netUnitsFourWkRolling" headerName="Net Units 4W rolling" />
                    <AgGridColumn field="netUnitsMTD" />
                    <AgGridColumn field="netUnitsSTD" />
                    <AgGridColumn field="netSalesLW" />
                    <AgGridColumn field="netSalesFourWkRolling" headerName="Net Sales 4w rolling" />
                    <AgGridColumn field="netSalesMTD" />
                    <AgGridColumn field="netSalesSTD" />
                    <AgGridColumn field="netAURLW" headerName="Net AUR LW" />
                    <AgGridColumn field="netAURFourWeekAvg" headerName="Net AUR 4W Avg" />
                    <AgGridColumn field="netSalesLWUSD" />
                    <AgGridColumn field="netSalesFourWeekRollingUSD" headerName="Net Sales 4w rolling USD" />
                    <AgGridColumn field="netSalesFourWeekAvgUSD" headerName="Net Sales 4W Avg USD" />
                    <AgGridColumn field="netSalesMTDUSD" />
                    <AgGridColumn field="netSalesSTDUSD" />
                    <AgGridColumn field="netAURLWUSD" headerName="Net AUR LW USD" />
                    <AgGridColumn field="netAURFourWeekAvgUSD" headerName="Net AUR 4W Avg USD" />
                    <AgGridColumn field="demandUnitsLW" />
                    <AgGridColumn field="demandUnitsFourWeekRolling" headerName="Demand Units 4W rolling" />
                    <AgGridColumn field="demandUnitsFourWeekAvg" headerName="Demand Units 4W avg" />
                    <AgGridColumn field="demandUnitsMTD" />
                    <AgGridColumn field="demandUnitsSTD" />
                    <AgGridColumn field="demandSalesLW" />
                    <AgGridColumn field="demandSalesFourWeekRolling" headerName="Demand Sales 4W rolling" />
                    <AgGridColumn field="demandSalesFourWeekAvg" headerName="Demand Sales 4W avg" />
                    <AgGridColumn field="demandSalesMTD" />
                    <AgGridColumn field="demandSalesSTD" />
                    <AgGridColumn field="demandAURLW" headerName="Demand AUR LW" />
                    <AgGridColumn field="demandAURFourWeekAvg" headerName="Demand AUR 4W avg" />
                    <AgGridColumn field="demandSalesLWUSD" />
                    <AgGridColumn field="demandSalesFourWeekRollingUSD" headerName="Demand Sales 4W rolling USD" />
                    <AgGridColumn field="demandSalesFourWeekAvgUSD" headerName="Demand Sales 4W Avg USD" />
                    <AgGridColumn field="demandSalesMTDUSD" />
                    <AgGridColumn field="demandSalesSTDUSD" />
                    <AgGridColumn field="demandAURLWUSD" headerName="Demand AUR LW USD" />
                    <AgGridColumn field="demandAURFourWeekAvgUSD" headerName="Demand AUR 4W avg USD" />
                    <AgGridColumn field="firstOrderDate" />
                    <AgGridColumn field="daysOnSale" />
                </AgGridColumn>

                <AgGridColumn headerName="Web Traffic">
                    <AgGridColumn field="webConversionPct" />
                    <AgGridColumn field="webConversionFourWeekAvgRPT" />
                </AgGridColumn>

                <AgGridColumn headerName="Plan">
                    <AgGridColumn field="lastSeasonPlanned" />
                    <AgGridColumn field="lastSeasonPlannedEndDate" />
                    <AgGridColumn field="inLastFPPlannedSeason" />
                    <AgGridColumn field="clearanceSeason" />
                    <AgGridColumn field="clearanceSeasonEndDate" />
                    <AgGridColumn field="status" />
                    <AgGridColumn field="epod" />
                    <AgGridColumn field="launchTier" />
                </AgGridColumn>

                <AgGridColumn headerName="Price">
                    <AgGridColumn field="msrp" />
                    <AgGridColumn field="wholesalePriceLocal" />
                    <AgGridColumn field="currentSellingPrice" />
                    <AgGridColumn field="totalDiscount" />
                    <AgGridColumn field="lastMDDate" />
                    <AgGridColumn field="mdCount" />
                    <AgGridColumn field="contributionMargin" />
                    <AgGridColumn field="priceElasticitySC" />
                    <AgGridColumn field="priceElasticityRPT" />
                    <AgGridColumn field="priceElasticityConfidence" />
                    <AgGridColumn field="recommendedMarkPCTElasticity" />
                    <AgGridColumn field="recommendedMarkPRCElasticity" />
                    <AgGridColumn field="totalDiscountAfterMarkElasticity" />
                    <AgGridColumn field="recommendedMarkPCTInterval" />
                    <AgGridColumn field="recommendedMarkPRCInterval" />
                    <AgGridColumn field="totalDiscountAfterMarkInterval" />
                </AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default ActionTable;