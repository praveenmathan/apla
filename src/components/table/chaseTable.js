import React from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { RowDetailsContext, SaveBtnContext } from '../context/rowDetailsContext';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import CustomTooltip from './customTooltip.jsx';

const ChaseTable = (props) => {
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
                modules={AllModules}
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
                defaultColDef={{
                    flex: 1,
                    minWidth: 175,
                    sortable: true,
                    resizable: true,
                    filter: true,
                    enableRowGroup: true,
                    enablePivot: true,
                    tooltipComponent: 'customTooltip',
                }}
            >
                <AgGridColumn headerName="Products">
                    <AgGridColumn field="StyleColor" pinned="left" lockPinned={true} cellClass="lock-pinned"
                        cellRenderer={function (params) {
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
                        onCellValueChanged={onCellValueChanged}
                    />
                    <AgGridColumn field="Description" menuTabs={['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']} />
                    <AgGridColumn field="SlimLifecycleSeason" />
                </AgGridColumn>

                <AgGridColumn headerName="Product Attribution">
                    <AgGridColumn field="CGD" />
                </AgGridColumn>

                <AgGridColumn headerName="Recommendations" headerClass='custom-font-color' >
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
                                console.log('action override', actionOveride);
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

                <AgGridColumn headerName="Inventory">
                    <AgGridColumn field="RecommendedChaseUnits" headerClass='custom-font-color' />
                    <AgGridColumn field="Contracts" />
                    <AgGridColumn field="UnassignedZerotoThirtyDaysOut" headerName='Unassigned Qty 0_30' />
                    <AgGridColumn field="UnassignedThirtyonetoSixtyDaysOut" headerName='Unassigned Qty 31_60' />
                    <AgGridColumn field="UnassignedSixtyonePlusDaysOut" headerName='Unassigned Qty 61 Plus' />
                    <AgGridColumn field="1083_Contracts" headerName='1083 Contracts' />
                    <AgGridColumn field="1084_Contracts" headerName='1084 Contracts' />
                    <AgGridColumn field="1085_Contracts" headerName='1085 Contracts' />
                    <AgGridColumn field="GA_1083" headerName="GA 1083" />
                    <AgGridColumn field="GA_1084" headerName="GA 1084" />
                    <AgGridColumn field="GA_1085" headerName="GA 1085" />
                    <AgGridColumn field="DOMsInventory" headerName="DOMs Inventory" />
                    <AgGridColumn field="DOMsNDDCInventory" headerName="DOMs NDDC Inventory" />
                    <AgGridColumn field="DOMsZOZOInventory" headerName="DOMs ZOZO Inventory" />
                    <AgGridColumn field="DOMsNSOInventory" headerName="DOMs NSO Inventory" />
                    <AgGridColumn field="DOMsNFSInventory" headerName="DOMs NFS Inventory" />
                    <AgGridColumn field="DOMsEMPInventory" headerName="DOMs EMP Inventory" />
                    <AgGridColumn field="DOMsGAInventory" headerName="DOMs GA Inventory" />
                    <AgGridColumn field="ChannelWOS" />
                    <AgGridColumn field="MarketPlaceWOS" />
                </AgGridColumn>

                <AgGridColumn headerName="Sales">
                    <AgGridColumn field="NetSalesLW" />
                    <AgGridColumn field="NetSalesFourWkAvg" headerName="Net Sales 4w avg" />
                    <AgGridColumn field="DemandUnitsLW" />
                    <AgGridColumn field="DemandUnitsFourWeekRolling" headerName="Demand Units 4W rolling" />
                </AgGridColumn>
            </AgGridReact>
        </div >
    );
}

export default ChaseTable;