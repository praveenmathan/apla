
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

const CmReviewTable = (props) => {
    return (
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
                    <AgGridColumn field="Comment" />
                    <AgGridColumn field="Description" />
                    <AgGridColumn field="SlimLifecycleSeason" />
                </AgGridColumn>

                <AgGridColumn headerName="Product Attribution">
                    <AgGridColumn field="RPT" />
                </AgGridColumn>

                <AgGridColumn headerName="Recommendations" headerClass='custom-font-color' >
                    <AgGridColumn field="RecommendedAction" headerClass='custom-font-color' headerName="Action" width='200' />
                    <AgGridColumn field="RecommendedActionOverride" headerClass='custom-font-color' headerName="Action Override"
                        width='225'
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

                <AgGridColumn headerName="Sales">
                    <AgGridColumn field="NetUnitsLastWeek" />
                    <AgGridColumn field="NetUnitsFourWkAvg" headerName="Net Units 4W Avg" />
                    <AgGridColumn field="NetAURLW" headerName="Net AUR LW" />
                    <AgGridColumn field="DemandUnitsLW" />
                    <AgGridColumn field="DemandUnitsFourWeekRolling" headerName="Demand Units 4W rolling" />
                    <AgGridColumn field="DemandAURLW" headerName="Demand AUR LW" />
                </AgGridColumn>

                <AgGridColumn headerName="Price">
                    <AgGridColumn field="MSRP" />
                    <AgGridColumn field="WholesalePriceLocal" />
                    <AgGridColumn field="CurrentSellingPrice" />
                    <AgGridColumn field="TotalDiscount" />
                </AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default CmReviewTable;