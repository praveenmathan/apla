import { AgGridColumn, AgGridReact } from 'ag-grid-react';

const ExcludeTable = (props) => {

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
            </AgGridReact>
        </div>
    );
}

export default ExcludeTable;