
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

const CloseOutTable = (props) => {
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

                <AgGridColumn headerName="Calendar">
                    <AgGridColumn field="RetailWeek" />
                    <AgGridColumn field="CurrentSeason" />
                </AgGridColumn>

                <AgGridColumn headerName="Product Attribution">
                    <AgGridColumn field="RPT" />
                </AgGridColumn>

                <AgGridColumn headerName="Inventory">
                    <AgGridColumn field="Contracts" />
                    <AgGridColumn field="unassignedZerotoThirtyDaysOut" headerName='Unassigned Qty 0_30' />
                    <AgGridColumn field="UnassignedThirtyonetoSixtyDaysOut" headerName='Unassigned Qty 31_60' />
                    <AgGridColumn field="UnassignedSixtyonePlusDaysOut" headerName='Unassigned Qty 61 Plus' />
                    <AgGridColumn field="1083_Contracts" headerName='1083 Contracts' />
                    <AgGridColumn field="1084_Contracts" headerName='1084 Contracts' />
                    <AgGridColumn field="1085_Contracts" headerName='1085 Contracts' />
                    <AgGridColumn field="SizeCountOwned" />
                    <AgGridColumn field="SizeCountTotal" />
                    <AgGridColumn field="SizeIntegrity" />
                </AgGridColumn>

                <AgGridColumn headerName="Plan">
                    <AgGridColumn field="LastSeasonPlanned" />
                </AgGridColumn>

                <AgGridColumn headerName="Price">
                    <AgGridColumn field="ContributionMargin" />
                </AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default CloseOutTable;