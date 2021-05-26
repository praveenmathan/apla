import React, { useEffect } from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { RowDetailsContext, SaveBtnContext, SelectedChannelContext } from '../context/rowDetailsContext';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import CustomTooltip from './customTooltip.jsx';

const ChaseTable = (props) => {
    let consolidatedRows = [];
    const [inventory, setInventory] = React.useState([]);

    const { setRowDetailValue } = React.useContext(RowDetailsContext);
    const { setSaveBtnDisable } = React.useContext(SaveBtnContext);
    const { selectedMarketPlace } = React.useContext(SelectedChannelContext);

    const chaseInventoryColumnJapan = [
        { field: 'RecommendedChaseUnits' },
        { field: 'Contracts' },
        { field: 'UnassignedZerotoThirtyDaysOut', headerName: 'Unassigned Qty 0_30' },
        { field: 'UnassignedThirtyonetoSixtyDaysOut', headerName: 'Unassigned Qty 31_60' },
        { field: 'UnassignedSixtyonePlusDaysOut', headerName: 'Unassigned Qty 61 Plus' },
        { field: '1083_Contracts', headerName: '1083 Contracts' },
        { field: '1084_Contracts', headerName: '1084 Contracts' },
        { field: '1085_Contracts', headerName: '1085 Contracts' },
        { field: 'GA_1083', headerName: "GA 1083" },
        { field: 'GA_1084', headerName: "GA 1084" },
        { field: 'GA_1085', headerName: "GA 1085" },
        { field: 'DOMsInventory', headerName: "DOMs Inventory" },
        { field: 'DOMsNDDCInventory', headerName: "DOMs NDDC Inventory" },
        { field: 'DOMsZOZOInventory', headerName: "DOMs ZOZO Inventory" },
        { field: 'DOMsNSOInventory', headerName: "DOMs NSO Inventory" },
        { field: 'DOMsNFSInventory', headerName: "DOMs NFS Inventory" },
        { field: 'DOMsEMPInventory', headerName: "DOMs EMP Inventory" },
        { field: 'DOMsGAInventory', headerName: "DOMs GA Inventory" },
        { field: 'ChannelWOH' },
        { field: 'MarketPlaceWOH' }
    ];

    const chaseInventoryColumnMexico = [
        { field: 'RecommendedChaseUnits' },
        { field: 'Contracts' },
        { field: 'UnassignedZerotoThirtyDaysOut', headerName: 'Unassigned Qty 0_30' },
        { field: 'UnassignedThirtyonetoSixtyDaysOut', headerName: 'Unassigned Qty 31_60' },
        { field: 'UnassignedSixtyonePlusDaysOut', headerName: 'Unassigned Qty 61 Plus' },
        { field: '1098_Contracts', headerName: '1098 Contracts' },
        { field: 'GA_1098', headerName: "GA 1098" },
        { field: 'DOMsInventory', headerName: "DOMs Inventory" },
        { field: 'DOMsNDDCInventory', headerName: "DOMs NDDC Inventory" },
        { field: 'DOMsNSOInventory', headerName: "DOMs NSO Inventory" },
        { field: 'DOMsNFSInventory', headerName: "DOMs NFS Inventory" },
        { field: 'DOMsEMPInventory', headerName: "DOMs EMP Inventory" },
        { field: 'DOMsGAInventory', headerName: "DOMs GA Inventory" },
        { field: 'ChannelWOH' },
        { field: 'MarketPlaceWOH' }
    ];


    const onCellValueChanged = (params) => {
        if (!(params.oldValue === null && params.newValue === undefined)) {
            params.node.data['changed'] = true;
            consolidatedRows.push(params.data);
            setRowDetailValue(consolidatedRows);
            setSaveBtnDisable(false);
        }
    }

    function numberParser(params) {
        if (params.value === null || params.value === 0 || params.value === undefined) {
            return '-'
        }
    }

    useEffect(() => {
        /* If Mexico, Mexico related columns for Inventory */
        if (selectedMarketPlace === 'Mexico') {
            let filteredColumn = chaseInventoryColumnMexico.filter(each => each.field != null);
            setInventory(filteredColumn);
        }

        /* If Japan, Japan related columns for Inventory */
        if (selectedMarketPlace === 'Japan') {
            let filteredColumn = chaseInventoryColumnJapan.filter(each => each.field != null);
            setInventory(filteredColumn);
        }
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ height: '80vh' }}>
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
                applyColumnDefOrder={true}
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
            >
                <AgGridColumn headerName="Product">
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
                    {inventory.map(column => (
                        <AgGridColumn {...column} key={column.field} />
                    ))}
                </AgGridColumn>

                {/* <AgGridColumn headerName="Inventory">
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
                    <AgGridColumn field="ChannelWOH" />
                    <AgGridColumn field="MarketPlaceWOH" />
                </AgGridColumn> */}

                <AgGridColumn headerName="Sales">
                    <AgGridColumn field="NetSalesLW" />
                    <AgGridColumn field="NetSalesFourWkAvg" headerName="Net Sales 4w avg" />
                    <AgGridColumn field="NetUnitsThirteenWkAvg" headerName="Net Units 13W Avg" />
                    <AgGridColumn field="DemandUnitsLW" />
                    <AgGridColumn field="DemandUnitsFourWeekRolling" headerName="Demand Units 4W rolling" />
                </AgGridColumn>

                <AgGridColumn headerName="Plan">
                    <AgGridColumn field="EPOD" />
                </AgGridColumn>

            </AgGridReact>
        </div >
    );
}

export default ChaseTable;