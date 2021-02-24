import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

const colDefs = [
    { field: "StyleColor", headerName: "Products", pinned: "left", lockPinned: true, cellClass: "lock-pinned" },
    { field: "Comment", headerName: "Products", subHeaderName: "Comments" },
    { field: "Description", headerName: "Products" },
    { field: "SlimLifecycleSeason", headerName: "Products" },
    { field: "RecommendedAction", headerName: "Recommendations", subHeaderName: "Action" },
    { field: "RecommendedActionOverride", headerName: "Recommendations", subHeaderName: "Action Override" },
    { field: "RetailWeek", headerName: "Calendar" },
    { field: "CurrentSeason", headerName: "Calendar" },
    { field: "Style", headerName: "Product Attribution" },
    { field: "Category", headerName: "Product Attribution" },
    { field: "SubCategory", headerName: "Product Attribution" },
    { field: "Division", headerName: "Product Attribution" },
    { field: "Gender", headerName: "Product Attribution" },
    { field: "CGD", headerName: "Product Attribution" },
    { field: "Franchise", headerName: "Product Attribution" },
    { field: "NikeLABIND", headerName: "Product Attribution" },
    { field: "NRGIND", headerName: "Product Attribution" },
    { field: "League", headerName: "Product Attribution" },
    { field: "Team", headerName: "Product Attribution" },
    { field: "AthleteName", headerName: "Product Attribution" },
    { field: "MerchClassification", headerName: "Product Attribution" },
    { field: "NikeIDIND", headerName: "Product Attribution" },
    { field: "Contracts", headerName: "Inventory" },
    { field: "UnassignedZerotoThirtyDaysOut", headerName: "Inventory", subHeaderName: "Unassigned 0_30 DaysOut" },
    { field: "UnassignedThirtyonetoSixtyDaysOut", headerName: "Inventory", subHeaderName: "Unassigned 31_60 DaysOut" },
    { field: "UnassignedSixtyonePlusDaysOut", headerName: "Inventory", subHeaderName: "Unassigned 61+ DaysOut" },
    { field: "1083_Contracts", headerName: "Inventory" },
    { field: "1084_Contracts", headerName: "Inventory" },
    { field: "1085_Contracts", headerName: "Inventory" },
    { field: "NSO_Contracts", headerName: "Inventory" },
    { field: "WholesaleContract", headerName: "Inventory" },
    { field: "StoreIOH", headerName: "Inventory" },
    { field: "InTransit", headerName: "Inventory" },
    { field: "OnOrder", headerName: "Inventory" },
    { field: "GA_1083", headerName: "Inventory" },
    { field: "GA_1084", headerName: "Inventory" },
    { field: "GA_1085", headerName: "Inventory" },
    { field: "SizeCountOwned", headerName: "Inventory" },
    { field: "SizeCountTotal", headerName: "Inventory" },
    { field: "SizeIntegrity", headerName: "Inventory" },
    { field: "SlimWOS", headerName: "Inventory" },
    { field: "RecommendedChaseUnits", headerName: "Inventory" },
    { field: "RecommendedCancelUnits", headerName: "Inventory" },
    { field: "NetUnitsLastWeek", headerName: "Sales" },
    { field: "NetUnitsFourWkAvg", headerName: "Sales" },
    { field: "NetUnitsFourWkRolling", headerName: "Sales" },
    { field: "NetUnitsMTD", headerName: "Sales" },
    { field: "NetUnitsSTD", headerName: "Sales" },
    { field: "NetSalesLW", headerName: "Sales" },
    { field: "NetSalesFourWkAvg", headerName: "Sales" },
    { field: "NetSalesFourWkRolling", headerName: "Sales" },
    { field: "NetSalesMTD", headerName: "Sales" },
    { field: "NetSalesSTD", headerName: "Sales" },
    { field: "NetAURLW", headerName: "Sales" },
    { field: "NetAURFourWeekAvg", headerName: "Sales" },
    { field: "NetSalesLWUSD", headerName: "Sales" },
    { field: "NetSalesFourWeekAvgUSD", headerName: "Sales", subHeaderName: "Net Sales 4W Avg USD" },
    { field: "NetSalesFourWeekRollingUSD", headerName: "Sales", subHeaderName: "Net Sales 4W Rolling USD" },
    { field: "NetSalesMTDUSD", headerName: "Sales" },
    { field: "NetSalesSTDUSD", headerName: "Sales" },
    { field: "NetAURLWUSD", headerName: "Sales", subHeaderName: "Net AUR LW USD" },
    { field: "NetAURFourWeekAvgUSD", headerName: "Sales", subHeaderName: "Net AUR 4W Avg USD" },
    { field: "DemandUnitsLW", headerName: "Sales" },
    { field: "DemandUnitsFourWeekAvg", headerName: "Sales", subHeaderName: "Demand Units 4W Avg" },
    { field: "DemandUnitsFourWeekRolling", headerName: "Sales", subHeaderName: "Demand Units 4W Rolling" },
    { field: "DemandUnitsMTD", headerName: "Sales" },
    { field: "DemandUnitsSTD", headerName: "Sales" },
    { field: "DemandSalesLW", headerName: "Sales" },
    { field: "DemandSalesFourWeekAvg", headerName: "Sales", subHeaderName: "Demand Sales 4W Avg" },
    { field: "DemandSalesFourWeekRolling", headerName: "Sales", subHeaderName: "Demand Sales 4W Avg Rolling" },
    { field: "DemandSalesMTD", headerName: "Sales" },
    { field: "DemandSalesSTD", headerName: "Sales" },
    { field: "DemandAURLW", headerName: "Sales", subHeaderName: "Demand AUR LW" },
    { field: "DemandAURFourWeekAvg", headerName: "Sales" },
    { field: "DemandSalesLWUSD", headerName: "Sales" },
    { field: "DemandSalesFourWeekAvgUSD", headerName: "Sales" },
    { field: "DemandSalesFourWeekRollingUSD", headerName: "Sales" },
    { field: "DemandSalesMTDUSD", headerName: "Sales" },
    { field: "DemandSalesSTDUSD", headerName: "Sales" },
    { field: "DemandAURLWUSD", headerName: "Sales" },
    { field: "DemandAURFourWeekAvgUSD", headerName: "Sales" },
    { field: "FirstOrderDate", headerName: "Sales" },
    { field: "DaysOnSale", headerName: "Sales" },
    { field: "WebConversionPct", headerName: "Web Traffic" },
    { field: "WebConversionFourWeekAvgCGD", headerName: "Web Traffic" },
    { field: "LastSeasonPlanned", headerName: "Plan" },
    { field: "LastSeasonPlannedEndDate", headerName: "Plan" },
    { field: "InLastFPPlannedSeason", headerName: "Plan" },
    { field: "ClearanceSeason", headerName: "Plan" },
    { field: "ClearanceSeasonEndDate", headerName: "Plan" },
    { field: "Status", headerName: "Plan" },
    { field: "EPOD", headerName: "Plan" },
    { field: "LaunchTier", headerName: "Plan" },
    { field: "MSRP", headerName: "Price" },
    { field: "WholesalePriceLocal", headerName: "Price" },
    { field: "CurrentSellingPrice", headerName: "Price" },
    { field: "TotalDiscount", headerName: "Price" },
    { field: "LastMDDate", headerName: "Price" },
    { field: "MDCount", headerName: "Price" },
    { field: "ContributionMargin", headerName: "Price" },
    { field: "PriceElasticitySC", headerName: "Price" },
    { field: "PriceElasticityCGD", headerName: "Price" },
    { field: "PriceElasticityConfidence", headerName: "Price" },
    { field: "RecommendedMarkPCTElasticity", headerName: "Price" },
    { field: "RecommendedMarkPRCElasticity", headerName: "Price" },
    { field: "TotalDiscountAfterMarkElasticity", headerName: "Price" },
    { field: "RecommendedMarkPCTInterval", headerName: "Price" },
    { field: "RecommendedMarkPRCInterval", headerName: "Price" },
    { field: "TotalDiscountAfterMarkInterval", headerName: "Price" }
];

const CommonTable = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [columns, setColumns] = useState(colDefs);

    const [forceRefresh, setForceRefresh] = useState(false);

    useEffect(() => {
        if (forceRefresh) {
            gridApi.refreshCells({ force: true });
            setForceRefresh(false);
        }
    }, [forceRefresh]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div className="test-container">
                <div className="test-header">
                    <div
                        style={{
                            height: '70vh',
                            width: "100%"
                        }}
                        className="ag-theme-alpine test-grid"
                    >
                        <AgGridReact
                            rowData={props.rowData}
                            onGridReady={props.onGridReady}
                            defaultColDef={{
                                initialWidth: 150,
                                sortable: true,
                                resizable: true,
                                filter: true
                            }}
                            applyColumnDefOrder={true}
                            pagination={true}
                        >
                            {columns.map(column => (
                                <AgGridColumn headerName={column.headerName} key={column.field}>
                                    <AgGridColumn {...column} headerName={column.subHeaderName} />
                                </AgGridColumn>
                            ))}
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonTable;