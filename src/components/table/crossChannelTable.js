import React from 'react';
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';
import { RowDetailsContext, SaveBtnContext, SelectedChannelContext } from '../context/rowDetailsContext';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import CustomTooltip from './customTooltip.jsx';

const CrossChannelTable = (props) => {

    let consolidatedRows = [];
    const { setRowDetailValue } = React.useContext(RowDetailsContext);
    const { setSaveBtnDisable } = React.useContext(SaveBtnContext);
    const { selectedChannel } = React.useContext(SelectedChannelContext);

    const onCellValueChanged = (params) => {
        if (!(params.oldValue === <AgGridColumn></AgGridColumn> && params.newValue === undefined)) {
            params.node.data['changed'] = true;
            consolidatedRows.push(params.data);
            setRowDetailValue(consolidatedRows);
            setSaveBtnDisable(false);
        }
    }

    function numberParser(params) {
        if (typeof (params.value) === 'number' && params.value !== 0) {
            var sansDec = params.value.toFixed(0);
            var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return `${formatted}`;
        }
        if (params.value === null || params.value === 0 || params.value === undefined) {
            return '-'
        }
    }

    return (
        <div className="ag-theme-alpine" style={{ height: '80vh' }}>
            <AgGridReact
                modules={AllModules}
                defaultColDef={{
                    flex: 1,
                    minWidth: 175,
                    sortable: true,
                    resizable: true,
                    filter: true,
                    enableRowGroup: true,
                    enablePivot: true,
                    tooltipComponent: 'customTooltip',
                    valueFormatter: numberParser
                }}
                sideBar={{
                    toolPanels: [
                        {
                            id: 'columns',
                            labelDefault: 'Columns',
                            labelKey: 'columns',
                            iconKey: 'columns',
                            toolPanel: 'agColumnsToolPanel',
                            toolPanelParams: {
                                suppressRowGroups: true,
                                suppressValues: true,
                                suppressPivots: true,
                                suppressPivotMode: true,
                                suppressSideButtons: true
                            },
                        }]
                }}
                onGridReady={props.onGridReady}
                rowData={props.rowData}
                pagination={true}
                enableCellTextSelection={true}
                suppressDragLeaveHidesColumns={true}
                tooltipShowDelay={0}
                frameworkComponents={{ customTooltip: CustomTooltip }}
            >

                <AgGridColumn headerName="Product">
                    <AgGridColumn field="StyleColor" pinned="left" lockPinned={true} cellClass="lock-pinned" cellRenderer={function (params) {
                        if (params.value !== undefined) {
                            return "<a target='_blank' href='http://images6.nike.com/is/image/DPILS/"
                                + params.value
                                + "-PV'>" + params.value + "</a>";
                        } else {
                            return null
                        }
                    }} />
                    <AgGridColumn field="Comment"
                        editable={true}
                        cellEditor="agLargeTextCellEditor"
                        onCellValueChanged={onCellValueChanged} />
                    <AgGridColumn field="Description" />
                    <AgGridColumn field="SlimLifecycleSeason" />
                </AgGridColumn>

                <AgGridColumn headerName="Recommendation" headerClass='custom-font-color' >
                    <AgGridColumn field="RecommendedAction" headerClass='custom-font-color' headerName="Action" width='200' tooltipField="RecommendedAction" tooltipComponent="customTooltip"
                        tooltipComponentParams={{ color: '#ececec' }} />
                    <AgGridColumn field="SelectedRecommendedActionOverride" headerClass='custom-font-color' headerName="Action Override"
                        width='225'
                        editable={true}
                        cellEditor="agSelectCellEditor"
                        cellEditorParams={function (params) {
                            let givenValue = params.data.RecommendedActionOverride;
                            if (givenValue != null) {
                                let actionOveride = givenValue.split(',');
                                actionOveride.push(null);
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
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_RECOMMENDED_ACTION" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_RECOMMENDED_ACTION" /> : <AgGridColumn></AgGridColumn>}
                </AgGridColumn>

                <AgGridColumn headerName="Price">
                    <AgGridColumn field="CurrentLCSellingPrice" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_CURRENT_SELLING_PRICE" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_CURRENT_SELLING_PRICE" /> : <AgGridColumn></AgGridColumn>}
                    <AgGridColumn field="RecommendedMarkPRCElasticity" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_RECOMMENDED_MARK_PRC_ELASTICITY" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_RECOMMENDED_MARK_PRC_ELASTICITY" /> : <AgGridColumn></AgGridColumn>}
                    <AgGridColumn field="RecommendedMarkPRCInterval" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_RECOMMENDED_MARK_PRC_INTERVAL" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_RECOMMENDED_MARK_PRC_INTERVAL" /> : <AgGridColumn></AgGridColumn>}
                </AgGridColumn>

                <AgGridColumn headerName="Inventory">
                    <AgGridColumn field="Contracts" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_CONTRACTS" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_CONTRACTS" /> : <AgGridColumn></AgGridColumn>}
                    <AgGridColumn field="OnOrder" />
                    {selectedChannel === 'NSO' ? <AgGridColumn field="InTransit" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="StoreIOH" /> : <AgGridColumn hide={true}></AgGridColumn>}
                </AgGridColumn>

                <AgGridColumn headerName="Sales">
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetUnitsLW" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_DEMAND_UNITS_LW" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetUnitsFourWkAvg" headerName="Net Units 4W Avg" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_DEMAND_UNITS_4WK_AVG" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetUnitsThirteenWkAvg" headerName="Net Units 13W Avg" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_DEMAND_UNITS_13WK_AVG" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetUnitsSTD" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_DEMAND_UNITS_STD" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NetAURLW" headerName="Net AUR LW" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_DEMAND_AUR_LW" /> : <AgGridColumn hide={true}></AgGridColumn>}

                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandUnitsLW" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_UNITS_LW" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandUnitsFourWeekAvg" headerName="Demand Units 4W avg" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_UNITS_4WK_AVG" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandUnitsThirteenWeekAvg" headerName="Demand Units 13W avg" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_UNITS_13WK_AVG" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandUnitsSTD" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_UNITS_STD" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="DemandAURLW" headerName="Demand AUR LW" /> : <AgGridColumn hide={true}></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_NET_AUR_LW" /> : <AgGridColumn hide={true}></AgGridColumn>}
                </AgGridColumn>

                <AgGridColumn headerName="Plan">
                    <AgGridColumn field="LastSeasonPlanned" />
                    <AgGridColumn field="LastSeasonPlannedEndDate" />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_LAST_SESN_PLND" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_LAST_SESN_PLND" /> : <AgGridColumn></AgGridColumn>}
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_LAST_SESN_PLND_END_DT" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_LAST_SESN_PLND_END_DT" /> : <AgGridColumn></AgGridColumn>}
                </AgGridColumn>

            </AgGridReact>
        </div>
    );
}

export default CrossChannelTable;