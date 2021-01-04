import { AgGridColumn, AgGridReact } from 'ag-grid-react';

const ActionTable = (props) => {
    return (
        <div className="ag-theme-alpine" style={{ height: '70vh' }}>
            <AgGridReact
                defaultColDef={{
                    width: 150,
                    sortable: true,
                    resizable: true,
                    filter: true,
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

                <AgGridColumn headerName="Recommendations" className="custom-font-color">
                    <AgGridColumn field="recommendedAction" className="custom-font-color" />
                    <AgGridColumn field="recommendedActionOverride" className="custom-font-color"
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
                    <AgGridColumn field="unassignedZerotoThirtyDaysOut" />
                    <AgGridColumn field="unassignedThirtyonetoSixtyDaysOut" />
                    <AgGridColumn field="oneZeroEightThreeContracts" />
                    <AgGridColumn field="oneZeroEightFourContracts" />
                    <AgGridColumn field="oneZeroEightFiveContracts" />
                    <AgGridColumn field="nsoContracts" />
                    <AgGridColumn field="wholesaleContract" />
                    <AgGridColumn field="storeIOH" />
                    <AgGridColumn field="inTransit" />
                    <AgGridColumn field="onOrder" />
                    <AgGridColumn field="gaOneZeroEightThree" />
                    <AgGridColumn field="gaOneZeroEightFour" />
                    <AgGridColumn field="gaOneZeroEightFive" />
                    <AgGridColumn field="sizeCountOwned" />
                    <AgGridColumn field="sizeCountTotal" />
                    <AgGridColumn field="sizeIntegrity" />
                    <AgGridColumn field="slimWOS" />
                    <AgGridColumn field="recommendedChaseUnits" />
                    <AgGridColumn field="recommendedCancelUnits" />
                </AgGridColumn>

                <AgGridColumn headerName="Sales">
                    <AgGridColumn field="netUnitsLastWeek" />
                    <AgGridColumn field="netUnitsFourWkAvg" />
                    <AgGridColumn field="netUnitsFourWkRolling" />
                    <AgGridColumn field="netUnitsMTD" />
                    <AgGridColumn field="netUnitsSTD" />
                    <AgGridColumn field="netSalesLW" />
                    <AgGridColumn field="netSalesFourWkRolling" />
                    <AgGridColumn field="netSalesMTD" />
                    <AgGridColumn field="netSalesSTD" />
                    <AgGridColumn field="netAURLW" />
                    <AgGridColumn field="netAURFourWeekAvg" />
                    <AgGridColumn field="netSalesLWUSD" />
                    <AgGridColumn field="netSalesFourWeekRollingUSD" />
                    <AgGridColumn field="netSalesFourWeekAvgUSD" />
                    <AgGridColumn field="netSalesMTDUSD" />
                    <AgGridColumn field="netSalesSTDUSD" />
                    <AgGridColumn field="netAURLWUSD" />
                    <AgGridColumn field="netAURFourWeekAvgUSD" />
                    <AgGridColumn field="demandUnitsLW" />
                    <AgGridColumn field="demandUnitsFourWeekRolling" />
                    <AgGridColumn field="demandUnitsFourWeekAvg" />
                    <AgGridColumn field="demandUnitsMTD" />
                    <AgGridColumn field="demandUnitsSTD" />
                    <AgGridColumn field="demandSalesLW" />
                    <AgGridColumn field="demandSalesFourWeekRolling" />
                    <AgGridColumn field="demandSalesFourWeekAvg" />
                    <AgGridColumn field="demandSalesMTD" />
                    <AgGridColumn field="demandSalesSTD" />
                    <AgGridColumn field="demandAURLW" />
                    <AgGridColumn field="demandAURFourWeekAvg" />
                    <AgGridColumn field="demandSalesLWUSD" />
                    <AgGridColumn field="demandSalesFourWeekRollingUSD" />
                    <AgGridColumn field="demandSalesFourWeekAvgUSD" />
                    <AgGridColumn field="demandSalesMTDUSD" />
                    <AgGridColumn field="demandSalesSTDUSD" />
                    <AgGridColumn field="demandAURLWUSD" />
                    <AgGridColumn field="demandAURFourWeekAvgUSD" />
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