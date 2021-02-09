import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { SelectedChannelContext } from '../context/rowDetailsContext';

const ReleaseTable = (props) => {

    const { selectedChannel } = React.useContext(SelectedChannelContext);

    return (
        <div className="ag-theme-alpine" style={{ width: '100%', height: '70vh' }}>
            <AgGridReact
                defaultColDef={{
                    width: 275,
                    sortable: true,
                    resizable: true,
                    filter: true,
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
                    <AgGridColumn field="RecommendedAction" headerClass='custom-font-color' headerName="Action" />
                </AgGridColumn>

                <AgGridColumn headerName="Plan">
                    <AgGridColumn field="Status" />
                </AgGridColumn>

                <AgGridColumn headerName="Inventory">
                    <AgGridColumn field="Contracts" />
                    <AgGridColumn field="UnassignedZerotoThirtyDaysOut" headerName='Unassigned Qty 0_30' />
                    <AgGridColumn field="UnassignedThirtyonetoSixtyDaysOut" headerName='Unassigned Qty 31_60' />
                    <AgGridColumn field="UnassignedSixtyonePlusDaysOut" headerName='Unassigned Qty 61 Plus' />
                    <AgGridColumn field="1083_Contracts" headerName='1083 Contracts' />
                    <AgGridColumn field="1084_Contracts" headerName='1084 Contracts' />
                    <AgGridColumn field="1085_Contracts" headerName='1085 Contracts' />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_Contracts" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_Contracts" /> : <AgGridColumn hide={true} />}
                    <AgGridColumn field="WholesaleContract" />
                    <AgGridColumn field="GA_1083" headerName="GA 1083" />
                    <AgGridColumn field="GA_1084" headerName="GA 1084" />
                    <AgGridColumn field="GA_1085" headerName="GA 1085" />
                </AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default ReleaseTable;