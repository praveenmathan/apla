import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { RowDetailsContext, SaveBtnContext } from '../context/rowDetailsContext';

const ImproveTrafficTable = (props) => {
    let consolidatedRows = [];
    const { setRowDetailValue } = React.useContext(RowDetailsContext);
    const { setSaveBtnDisable } = React.useContext(SaveBtnContext);

    const onCellValueChanged = (params) => {
        if (!(params.oldValue === null && params.newValue === undefined)) {
            params.node.data['changed'] = true;
            consolidatedRows.push(params.data);
            setRowDetailValue(consolidatedRows);
            setSaveBtnDisable(false);
        }
    }

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
                    <AgGridColumn field="Comment"
                        editable={true}
                        cellEditor="agLargeTextCellEditor"
                        onCellValueChanged={onCellValueChanged} />
                    <AgGridColumn field="Description" />
                    <AgGridColumn field="SlimLifecycleSeason" />
                </AgGridColumn>

                <AgGridColumn headerName="Product Attribution">
                    <AgGridColumn field="RPT" />
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

                <AgGridColumn headerName="Web Traffic">
                    <AgGridColumn field="WebConversionPct" />
                    <AgGridColumn field="WebConversionFourWeekAvgRPT" />
                </AgGridColumn>

                <AgGridColumn headerName="Sales">
                    <AgGridColumn field="FirstOrderDate" />
                    <AgGridColumn field="DaysOnSale" />
                </AgGridColumn>

                <AgGridColumn headerName="Inventory">
                    <AgGridColumn field="ChannelWOS" />
                    <AgGridColumn field="MarketPlaceWOS" />
                </AgGridColumn>
            </AgGridReact>
        </div>
    );
}
export default ImproveTrafficTable;
