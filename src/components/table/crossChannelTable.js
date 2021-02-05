import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { RowDetailsContext, SaveBtnContext, SelectedChannelContext } from '../context/rowDetailsContext';

const CrossChannelTable = (props) => {
    let consolidatedRows = [];
    const { setRowDetailValue } = React.useContext(RowDetailsContext);
    const { setSaveBtnDisable } = React.useContext(SaveBtnContext);
    const { selectedChannel } = React.useContext(SelectedChannelContext);

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
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_RECOMMENDED_ACTION" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_RECOMMENDED_ACTION" /> : null}
                </AgGridColumn>

                <AgGridColumn headerName="Price">
                    <AgGridColumn field="CurrentSellingPrice" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_CURRENT_SELLING_PRICE" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_CURRENT_SELLING_PRICE" /> : null}
                    <AgGridColumn field="RecommendedMarkPRCElasticity" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_RECOMMENDED_MARK_PRC_ELASTICITY" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_RECOMMENDED_MARK_PRC_ELASTICITY" /> : null}
                    <AgGridColumn field="RecommendedMarkPRCInterval" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_RECOMMENDED_MARK_PRC_INTERVAL" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_RECOMMENDED_MARK_PRC_INTERVAL" /> : null}
                </AgGridColumn>

                <AgGridColumn headerName="Inventory">
                    <AgGridColumn field="Contracts" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_CONTRACTS" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_CONTRACTS" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="InTransit" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="OnOrder" /> : null}
                    <AgGridColumn field="StoreIOH" />
                </AgGridColumn>

                <AgGridColumn headerName="Sales">
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetUnitsLastWeek" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_NET_UNITS_LW" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetUnitsFourWkAvg" headerName="Net Units 4W Avg" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_NET_UNITS_4WK_AVG" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetUnitsSTD" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_NET_UNITS_STD" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetAURLW" headerName="Net AUR LW" /> : null}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_NET_AUR_LW" /> : null}

                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandUnitsLW" /> : null}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_UNITS_LW" /> : null}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandUnitsFourWeekAvg" headerName="Demand Units 4W avg" /> : null}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_UNITS_4WK_AVG" /> : null}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandUnitsSTD" /> : null}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_UNITS_STD" /> : null}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandAURLW" headerName="Demand AUR LW" /> : null}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_AUR_LW" /> : null}
                </AgGridColumn>

                <AgGridColumn headerName="Plan">
                    <AgGridColumn field="LastSeasonPlanned" />
                    <AgGridColumn field="LastSeasonPlannedEndDate" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_LAST_SESN_PLND" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_LAST_SESN_PLND" /> : null}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_LAST_SESN_PLND_END_DT" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_LAST_SESN_PLND_END_DT" /> : null}
                </AgGridColumn>

            </AgGridReact>
        </div>
    );
}

export default CrossChannelTable;