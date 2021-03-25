import './App.css';
import React, { useState, useEffect } from 'react';
import MenuAppBar from '../navigation/navigation';
import CategoryBar from '../category/categoryBar';
import authorisationAPI from '../services/authorisationAPI';
import categoryService from '../services/categoryService';
import actionTableService from '../services/actionTableService';
import cancelTableService from '../services/cancelTableService';
import closeOutTableService from '../services/closeOutTableService';
import cmReviewTableService from '../services/cmReviewTableService';
import chaseTableService from '../services/chaseTableService';
import exceptionTableService from '../services/exceptionTableService';
import excludeTableService from '../services/excludeTableService';
import markdownTableService from '../services/markdownTableService';
import improveConversionTraficService from '../services/improveConversionTraficService';
import { Route, useHistory, Switch } from "react-router-dom";
import ActionTable from "../table/actionTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import CustomSnackbar from '../utilities/customSnackBar';
import NotFound from '../utilities/notFoundPage';
import CancelTable from '../table/cancelTable';
import ChaseTable from '../table/chaseTable';
import CloseOutTable from '../table/closeOutTable';
import CmReviewTable from '../table/cmReviewTable';
import ExceptionTable from '../table/exceptionTable';
import ExcludeTable from '../table/exclude';
import ReleaseTable from '../table/releaseTable';
import ImproveConversionTable from '../table/improveConversionTable';
import ImproveTrafficTable from '../table/improveTrafficTable';
import MarkdownTable from '../table/markdownTable';
import { RowDetailsContext, SaveBtnContext, SelectedChannelContext } from '../context/rowDetailsContext';
import saveTableRowService from '../services/saveTableRowService';
import LinearProgress from '@material-ui/core/LinearProgress';
import exportToExcelService from '../services/exportToExcelService';
import LoginModal from '../utilities/loginModal';
import { SecureRoute, LoginCallback } from '@okta/okta-react';
import Profile from '../navigation/profile';
import { useOktaAuth } from '@okta/okta-react';
import releaseTableService from '../services/releaseTableService';
import CrossChannelTable from '../table/crossChannelTable';
import crossChannelTableService from '../services/crossChannelTableService';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/* eslint-disable */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  backgroudTransperancy: {
    background: 'transparent'
  }
}));

/**
 * Application Main Layout
 */
function App() {
  const [authorisationApi, setAuthorisationApi] = useState({});
  const [loading, setLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [categoryApi, setCategoryApi] = useState({});
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  const [status, setStatusBase] = useState("");
  const [message, setMessageBase] = useState("");
  const setStatus = msg => setStatusBase({ msg, date: new Date() });
  const setMessage = msg => setMessageBase(msg);
  const [openLogin, setOpenLogin] = useState(false);
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [rowDetailValue, setRowDetailValue] = React.useState([]);
  const [categoryBarLoading, setCategoryBarLoading] = React.useState(false);
  const [saveBtnDisable, setSaveBtnDisable] = React.useState(true);
  const [selectionFilterForSave, setSelectionFilterForSave] = React.useState(null);
  const [selectedChannel, setSelectedChannel] = React.useState(null);
  const [selectedMarketPlace, setSelectedMarketPlace] = React.useState(null);
  const [isActionTableLoading, setIsActionTableLoading] = useState(false);
  const [expanded, setExpanded] = React.useState('panel1');

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setOpenLogin(true);
      setUserInfo(null);
    } else {
      setOpenLogin(false);
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
        getAuthorisation(info);
      });
    }
  }, [authState, oktaAuth]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function getAuthorisation(userInfoOkta) {
    if (userInfoOkta.groups === undefined) {
      setStatus('error');
      setMessage(`${userInfoOkta.given_name} is not authorized. Contact support : APLA_DSM_SLIM_SUPP@nike.com`);
    } else {
      /* Get CUP roles, Marketplace and Channel details  */
      let requestData = {
        query: { adGroupNames: userInfoOkta.groups.toString() },
        accessToken: '',
      };
      authorisationAPI.postData(requestData).then((response) => {
        if (response.status === 200) {
          const { data } = response;
          if (data.isAuthorisedUser) {
            setAuthorisationApi(data);
            getCategoryAPI();
          } else {
            setStatus('error');
            setMessage(`${userInfoOkta.given_name} is not authorized. Contact support : APLA_DSM_SLIM_SUPP@nike.com`);
          }
        }
      }).catch((err) => {
        let data = {
          "returnCode": 0,

          "returnMessage": "Success",

          "isAuthorisedUser": true,

          "userAccessDetails": [
            {

              "userAccessMode": "ReadWrite",

              "marketplaceId": "1",

              "marketplaceDescription": "Japan",

              "channels": [

                {

                  "channelId": 1,

                  "channelDescription": "NDDC"

                },

                {

                  "channelId": 3,

                  "channelDescription": "NSO"

                },

                {

                  "channelId": 4,

                  "channelDescription": "ZOZO TOWN"

                }

              ]

            },
            {

              "userAccessMode": "Read",

              "marketplaceId": "1",

              "marketplaceDescription": "Mexico",

              "channels": [

                {

                  "channelId": 1,

                  "channelDescription": "NDDC"

                },

                {

                  "channelId": 3,

                  "channelDescription": "NSO"

                }

              ]

            }
          ]

        };
        if (data.isAuthorisedUser) {
          setAuthorisationApi(data);
          getCategoryAPI();
        } else {
          setStatus('error');
          setMessage(`${userInfoOkta.given_name} is not authorized. Contact support : APLA_DSM_SLIM_SUPP@nike.com`);
        }
        console.log(err);
      });
    }
  }

  function getCategoryAPI() {
    categoryService.getData().then((response) => {
      if (response.status === 200) {
        const { data } = response;
        const formattedData = getFormattedCategoryApi(data);
        setCategoryApi(data);
        setLoading(true);
      }
    }).catch((err) => {
      let data = {
        "returnCode": 0,

        "returnMessage": "Success",

        "selectionFilters": {

          "marketplace": null,

          "retailWeek": [

            {

              "weekId": 0,

              "weekDescription": "FA20 WK12"

            },

            {

              "weekId": 0,

              "weekDescription": "FA20 WK12"

            },

            {

              "weekId": 0,

              "weekDescription": "FA20 WK13"

            },

            {

              "weekId": 40,

              "weekDescription": "HO20 WK1"

            },

            {

              "weekId": 41,

              "weekDescription": "HO20 WK2"

            },

            {

              "weekId": 42,

              "weekDescription": "HO20 WK3"

            },

            {

              "weekId": 43,

              "weekDescription": "HO20 WK4"

            },

            {

              "weekId": 44,

              "weekDescription": "HO20 WK5"

            },

            {

              "weekId": 45,

              "weekDescription": "HO20 WK6"

            },

            {

              "weekId": 46,

              "weekDescription": "HO20 WK7"

            },

            {

              "weekId": 47,

              "weekDescription": "HO20 WK8"

            },

            {

              "weekId": 48,

              "weekDescription": "HO20 WK9"

            },

            {

              "weekId": 49,

              "weekDescription": "HO20 WK10"

            },

            {

              "weekId": 50,

              "weekDescription": "HO20 WK11"

            }

          ],

          "channel": null,

          "category": [

            {

              "categoryId": 1001,

              "categoryDescription": "RUNNING"

            },

            {

              "categoryId": 1002,

              "categoryDescription": "BASKETBALL"

            },

            {

              "categoryId": 1003,

              "categoryDescription": "FOOTBALL/SOCCER"

            },

            {

              "categoryId": 1004,

              "categoryDescription": "FOOTBALL, BASEBALL, AT"

            },

            {

              "categoryId": 1005,

              "categoryDescription": "WOMEN TRAINING"

            },

            {

              "categoryId": 1006,

              "categoryDescription": "NIKE SPORTSWEAR"

            },

            {

              "categoryId": 1007,

              "categoryDescription": "ACTION OUTDOOR"

            },

            {

              "categoryId": 1009,

              "categoryDescription": "YOUNG ATHLETES"

            },

            {

              "categoryId": 1010,

              "categoryDescription": "GOLF"

            },

            {

              "categoryId": 1011,

              "categoryDescription": "OTHER"

            },

            {

              "categoryId": 1012,

              "categoryDescription": "HURLEY"

            }

          ],

          "gender": [

            {

              "genderId": 1,

              "genderDescription": "ADULT UNISEX"

            },

            {

              "genderId": 2,

              "genderDescription": "BOYS"

            },

            {

              "genderId": 3,

              "genderDescription": "BOYS GRADE SCHL"

            },

            {

              "genderId": 4,

              "genderDescription": "BOYS INFANT"

            },

            {

              "genderId": 5,

              "genderDescription": "BOYS PRE SCHOOL"

            },

            {

              "genderId": 6,

              "genderDescription": "BOYS TODDLER"

            },

            {

              "genderId": 7,

              "genderDescription": "CHILD UNISEX"

            },

            {

              "genderId": 8,

              "genderDescription": "GIRL GRADE SCHL"

            },

            {

              "genderId": 9,

              "genderDescription": "GIRL PRE SCHOOL"

            },

            {

              "genderId": 10,

              "genderDescription": "GIRLS"

            },

            {

              "genderId": 11,

              "genderDescription": "GIRLS INFANT"

            },

            {

              "genderId": 12,

              "genderDescription": "GIRLS TODDLER"

            },

            {

              "genderId": 13,

              "genderDescription": "GRD SCHOOL UNSX"

            },

            {

              "genderId": 14,

              "genderDescription": "INFANT UNISEX"

            },

            {

              "genderId": 15,

              "genderDescription": "INFANTS"

            },

            {

              "genderId": 16,

              "genderDescription": "LITTLE BOYS"

            },

            {

              "genderId": 17,

              "genderDescription": "LITTLE GIRLS"

            },

            {

              "genderId": 18,

              "genderDescription": "MENS"

            },

            {

              "genderId": 19,

              "genderDescription": "NOT APPLICABLE"

            },

            {

              "genderId": 20,

              "genderDescription": "PRE SCHOOL UNSX"

            },

            {

              "genderId": 21,

              "genderDescription": "TODDLER UNISEX"

            },

            {

              "genderId": 22,

              "genderDescription": "WOMENS"

            },

            {

              "genderId": 23,

              "genderDescription": "YOUNG MEN"

            },

            {

              "genderId": 24,

              "genderDescription": "YOUNG WOMEN"

            },

            {

              "genderId": 25,

              "genderDescription": "YOUTH UNISEX"

            },

            {

              "genderId": 77,

              "genderDescription": "QAST2 SMK TEST"

            }

          ],

          "division": [

            {

              "divisionId": 10,

              "divisionDescription": "Apparel"

            },

            {

              "divisionId": 20,

              "divisionDescription": "Footwear"

            },

            {

              "divisionId": 30,

              "divisionDescription": "Equipment"

            }

          ],

          "table": [

            {

              "tableId": 1,

              "tableDescription": "ACTION"

            },

            {

              "tableId": 2,

              "tableDescription": "CANCEL"

            },

            {

              "tableId": 3,

              "tableDescription": "CLOSEOUT"

            },

            {

              "tableId": 4,

              "tableDescription": "CM REVIEW"

            },

            {

              "tableId": 5,

              "tableDescription": "CHASE"

            },

            {

              "tableId": 6,

              "tableDescription": "IMPROVE CONVERSION"

            },

            {

              "tableId": 7,

              "tableDescription": "IMPROVE TRAFFIC"

            },

            {

              "tableId": 8,

              "tableDescription": "EXCLUDE"

            },

            {

              "tableId": 9,

              "tableDescription": "MARKDOWN"

            },

            {

              "tableId": 10,

              "tableDescription": "EXCEPTION"

            },
            {

              "tableId": 11,

              "tableDescription": "X-Channel"

            }

          ]

        }
      };
      const formattedData = getFormattedCategoryApi(data);
      setCategoryApi(formattedData);
      console.log(err);
      setLoading(true);
    });
  }

  function stringCompareTable(a, b) {
    let comparison = 0;
    if (a.tableDescription > b.tableDescription) {
      comparison = 1;
    } else if (a.tableDescription < b.tableDescription) {
      comparison = -1;
    }
    return comparison;
  }

  function stringCompareGender(a, b) {
    let comparison = 0;
    if (a.genderDescription > b.genderDescription) {
      comparison = 1;
    } else if (a.genderDescription < b.genderDescription) {
      comparison = -1;
    }
    return comparison;
  }

  function stringCompareDivision(a, b) {
    let comparison = 0;
    if (a.divisionDescription > b.divisionDescription) {
      comparison = 1;
    } else if (a.divisionDescription < b.divisionDescription) {
      comparison = -1;
    }
    return comparison;
  }

  function stringCompareCategory(a, b) {
    let comparison = 0;
    if (a.categoryDescription > b.categoryDescription) {
      comparison = 1;
    } else if (a.categoryDescription < b.categoryDescription) {
      comparison = -1;
    }
    return comparison;
  }

  function getFormattedCategoryApi(data) {
    let formattedData = { ...data };

    formatTableData(formattedData);

    console.log('format data', formattedData);
    return formattedData;
  }

  function formatTableData(formattedData) {
    let capitalisedTableData = [];
    let capitalisedGenderData = [];
    let capitalisedDivisionData = [];
    let capitalisedCategoryData = [];
    let uniqueRetailWeekData = [];

    formattedData.selectionFilters.table.map(eachTable => {
      capitalisedTableData.push({ 'tableDescription': eachTable.tableDescription.toLowerCase().capitalize() });
    });
    formattedData.selectionFilters.gender.map(eachTable => {
      capitalisedGenderData.push({ 'genderDescription': eachTable.genderDescription.toLowerCase().capitalize() });
    });
    formattedData.selectionFilters.division.map(eachTable => {
      capitalisedDivisionData.push({ 'divisionDescription': eachTable.divisionDescription.toLowerCase().capitalize() });
    });
    formattedData.selectionFilters.category.map(eachTable => {
      capitalisedCategoryData.push({ 'categoryDescription': eachTable.categoryDescription.toLowerCase().capitalize() });
    });

    uniqueRetailWeekData = formattedData.selectionFilters.retailWeek.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === formattedData.selectionFilters.retailWeek.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });

    let sortedCapitalisedTableData = capitalisedTableData.sort(stringCompareTable);
    let sortedCapitalisedGenderData = capitalisedGenderData.sort(stringCompareGender);
    let sortedCapitalisedDivisionData = capitalisedDivisionData.sort(stringCompareDivision);
    let sortedCapitalisedCatergoryData = capitalisedCategoryData.sort(stringCompareCategory);

    formattedData.selectionFilters['formattedTableData'] = [...sortedCapitalisedTableData];
    formattedData.selectionFilters['formattedGenderData'] = [...sortedCapitalisedGenderData];
    formattedData.selectionFilters['formattedDivisionData'] = [...sortedCapitalisedDivisionData];
    formattedData.selectionFilters['formattedCategoryData'] = [...sortedCapitalisedCatergoryData];
    formattedData.selectionFilters['formattedRetailWeekData'] = [...uniqueRetailWeekData];
  }

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  function onCatergorySubmit(newValue) {
    /* To handle the route with respect to table */
    let navigationTextTrim = trimAndLowerCase(newValue.action);
    history.push(`${navigationTextTrim}`);

    /* formatting the request - to load the table */
    let requestDataForTable = {
      "action": reqDataTable(newValue),
      "selectionFilters": {
        "marketplace": reqDataMarket(newValue),
        "retailWeek": reqDataRetailWeek(newValue),
        "channel": reqDataChannel(newValue),
        "gender": reqDataGender(newValue),
        "category": reqDataCategory(newValue),
        "division": reqDataDivision(newValue)
      }
    };

    /* testing AG grid - for now */
    getTableAPI(requestDataForTable);

    /* for SAVE request */
    setSelectionFilterForSave(newValue);
  }

  function onTableRowSave(rows) {
    let inventorySaveDetails = [];

    rows.map(eachRow => {
      let inventoryDetails = {
        "StyleColor": eachRow.StyleColor,
        "Comment": eachRow.Comment,
        "Description": eachRow.Description,
        "RecommendedAction": eachRow.RecommendedAction,
        "SelectedRecommendedActionOverride": eachRow.SelectedRecommendedActionOverride,
        "RecommendedActionOverride": eachRow.RecommendedActionOverride,
        "CGD": eachRow.CGD
      }
      inventorySaveDetails.push(inventoryDetails);
    });

    let saveRequest = {
      "action": 'SAVE',
      "tableAction": selectionFilterForSave.action,
      "marketPlace": selectionFilterForSave.marketPlace,
      "channel": selectionFilterForSave.channel,
      "retailWeek": reqDataRetailWeek(selectionFilterForSave),
      "category": reqDataCategory(selectionFilterForSave),
      "division": reqDataDivision(selectionFilterForSave),
      "gender": reqDataGender(selectionFilterForSave),
      "inventorySaveDetails": inventorySaveDetails
    }

    saveUpdatedRowApi(saveRequest);
  }

  function saveUpdatedRowApi(saveRequest) {
    saveTableRowService.postData(saveRequest).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        setRowDetailValue([]);
        setCategoryBarLoading(false);
        setSaveBtnDisable(true);
        setStatus('success');
        setMessage('Updated values are saved');
      }
    }).catch((err) => {
      setRowDetailValue([]);
      setCategoryBarLoading(false);
      setStatus('error');
      setMessage('Error while saving the data, Contact support : APLA_DSM_SLIM_SUPP@nike.com');
      console.log(err);
    });
  }

  function onExportToExcel(selectionFilterDataForExport) {

    /* formatting the request - for export to excel */
    let requestDataForE2e = {
      "action": 'export to excel',
      "selectionFilters": {
        "marketplace": reqDataMarket(selectionFilterDataForExport),
        "retailWeek": reqDataRetailWeek(selectionFilterDataForExport),
        "channel": reqDataChannel(selectionFilterDataForExport),
        "gender": reqDataGender(selectionFilterDataForExport),
        "category": reqDataCategory(selectionFilterDataForExport),
        "division": reqDataDivision(selectionFilterDataForExport)
      }
    };

    exportToExcelService.postData(requestDataForE2e).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        if (data.returnCode === 0) {
          const anchor = document.createElement("a");
          anchor.setAttribute("href", `excel/${data.excelName}`);
          anchor.setAttribute("download", 'InventoryDetailsExcel.xlsx');
          anchor.click();
          setCategoryBarLoading(false);
          setStatus('success');
          setMessage('Data are exported to excel');
        } else {
          setCategoryBarLoading(false);
          setStatus('error');
          setMessage('Error while downloading Excel, Contact support');
        }
      }
    }).catch((err) => {
      setCategoryBarLoading(false);
      setStatus('error');
      setMessage('Error while downloading the data, Contact support');
      console.log(err);
    });
  }

  /* To trim and lowercase any string */
  function trimAndLowerCase(actionValue) {
    let actionString = actionValue;
    let actionLowerCase = actionString.toLowerCase();
    let actionLowerCaseTrim = actionLowerCase.replaceAll(' ', '');
    return actionLowerCaseTrim;
  }

  function reqDataMarket(newValue) {
    let marketplacearray = [];
    Object.keys(authorisationApi).map((each) => {
      if (each === 'userAccessDetails') {
        authorisationApi[each].map(eachUser => {
          if (newValue.marketPlace === eachUser.marketplaceDescription) {
            marketplacearray.push({
              "marketplaceDescription": eachUser.marketplaceDescription
            });
          }
        });
      }
    });
    return marketplacearray;
  }

  function reqDataChannel(newValue) {
    let channelarray = [];
    Object.keys(authorisationApi).map((each) => {
      if (each === 'userAccessDetails') {
        authorisationApi[each].map(eachUser => {
          if (newValue.marketPlace === eachUser.marketplaceDescription) {
            eachUser.channels.map(eachChannel => {
              if (newValue.channel === eachChannel.channelDescription) {
                channelarray.push({
                  "channelDescription": eachChannel.channelDescription
                });
              }
            });
          }
        });
      }
    });
    return channelarray;
  }

  function reqDataRetailWeek(newValue) {
    let retailWeekarray = [];
    Object.keys(categoryApi).map(each => {
      if (each === 'selectionFilters') {
        Object.keys(categoryApi[each]).map(eachfilters => {
          let selectionFilters = categoryApi[each];
          if (eachfilters === 'formattedRetailWeekData') {
            selectionFilters[eachfilters].map(eachweek => {
              if (newValue.retailWeek === eachweek.weekDescription) {
                retailWeekarray.push({
                  "weekDescription": eachweek.weekDescription
                })
              }
            });
          }
        });
      }
    });
    return retailWeekarray;
  }

  function reqDataCategory(newValue) {
    let categoryarray = [];
    Object.keys(categoryApi).map(each => {
      if (each === 'selectionFilters') {
        Object.keys(categoryApi[each]).map(eachfilters => {
          let selectionFilters = categoryApi[each];
          if (eachfilters === 'formattedCategoryData') {
            selectionFilters[eachfilters].map(eachCategory => {
              if (newValue.category.length != 0) {
                newValue.category.map(eachCategoryNewValue => {
                  if (eachCategoryNewValue === eachCategory.categoryDescription) {
                    categoryarray.push({
                      "categoryDescription": eachCategory.categoryDescription
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
    return categoryarray;
  }

  function reqDataGender(newValue) {
    let genderarray = [];
    Object.keys(categoryApi).map(each => {
      if (each === 'selectionFilters') {
        Object.keys(categoryApi[each]).map(eachfilters => {
          let selectionFilters = categoryApi[each];
          if (eachfilters === 'formattedGenderData') {
            selectionFilters[eachfilters].map(eachGender => {
              if (newValue.gender.length != 0) {
                newValue.gender.map(eachGenderNewValue => {
                  if (eachGenderNewValue === eachGender.genderDescription) {
                    genderarray.push({
                      "genderDescription": eachGender.genderDescription
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
    return genderarray;
  }

  function reqDataDivision(newValue) {
    let divisionarray = [];
    Object.keys(categoryApi).map(each => {
      if (each === 'selectionFilters') {
        Object.keys(categoryApi[each]).map(eachfilters => {
          let selectionFilters = categoryApi[each];
          if (eachfilters === 'formattedDivisionData') {
            selectionFilters[eachfilters].map(eachDivision => {
              if (newValue.division === eachDivision.divisionDescription) {
                divisionarray.push({
                  "divisionDescription": eachDivision.divisionDescription
                })
              }
            });
          }
        });
      }
    });
    return divisionarray;
  }

  function reqDataTable(newValue) {
    let tablearray = '';
    Object.keys(categoryApi).map(each => {
      if (each === 'selectionFilters') {
        Object.keys(categoryApi[each]).map(eachfilters => {
          let selectionFilters = categoryApi[each];
          if (eachfilters === 'formattedTableData') {
            selectionFilters[eachfilters].map(eachDivision => {
              if (newValue.action === eachDivision.tableDescription) {
                // tablearray.push({
                //   "tableDescription": eachDivision.tableDescription
                // });
                tablearray = eachDivision.tableDescription
              }
            });
          }
        });
      }
    });
    return tablearray;
  }

  function reqDataTableArr(newValue) {
    let tablearray = [];
    Object.keys(categoryApi).map(each => {
      if (each === 'selectionFilters') {
        Object.keys(categoryApi[each]).map(eachfilters => {
          let selectionFilters = categoryApi[each];
          if (eachfilters === 'formattedTableData') {
            selectionFilters[eachfilters].map(eachDivision => {
              if (newValue.action === eachDivision.tableDescription) {
                tablearray.push({
                  "tableDescription": eachDivision.tableDescription
                });
              }
            });
          }
        });
      }
    });
    return tablearray;
  }

  function getTableAPI(requestDataForTable) {
    setIsTableLoading(true);
    setRowData([]);
    let actionText = trimAndLowerCase(requestDataForTable.action);
    /* just for now */
    if (actionText === 'action') {
      actionTableApiService(requestDataForTable);
    }
    if (actionText === 'allaction') {
      actionTableApiService(requestDataForTable);
    }
    if (actionText === 'cancel') {
      cancelTableApiService(requestDataForTable);
    }
    if (actionText === 'closeout+cancel') {
      closeOutTableApiService(requestDataForTable);
    }
    if (actionText === 'cmreview') {
      cmReviewTableApiService(requestDataForTable);
    }
    if (actionText === 'chase') {
      chaseTableApiService(requestDataForTable);
    }
    if (actionText === 'improveconversion') {
      improveConvTrafficApiService(requestDataForTable);
    }
    if (actionText === 'improvetraffic') {
      improveConvTrafficApiService(requestDataForTable);
    }
    if (actionText === 'exclude') {
      excludeTableApiService(requestDataForTable);
    }
    if (actionText === 'exception') {
      exceptionTableApiService(requestDataForTable);
    }
    if (actionText === 'markdown') {
      markdownTableApiService(requestDataForTable);
    }
    if (actionText === 'release') {
      releaseTableApiService(requestDataForTable);
    }
    if (actionText === 'x-channel') {
      crossChannelApiService(requestDataForTable);
    }
  }

  function actionTableApiService(requestDataForTable) {
    actionTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setIsActionTableLoading(true);
          setStatus('success');
          setMessage('All Action data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no Action recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setIsActionTableLoading(true);
      setRowData([{
        "StyleColor": "415445-102",
        "Comment": null,
        "Description": "NIKE AIR MONARCH IV MEN'S TRAINING SHOE",
        "SlimLifecycleSeason": "Post Season",
        "RecommendedAction": "RELEASE",
        "SelectedRecommendedActionOverride": 'Exclude',
        "RecommendedActionOverride": "EXCLUDE,NO ACTION",
        "ToolTipValue": "Prodigy Status = Closeout,Contract Units > 0",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "415445",
        "Category": "Athletic Training",
        "SubCategory": "MENS CORE TRAIN",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "MONARCH",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 5.0,
        "UnassignedZerotoThirtyDaysOut": 4.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1085_Contracts": 1.0,
        "_Contracts": null,
        "WholesaleContract": 11.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1085": 0.0,
        "DOMsInventory": 10.0,
        "DOMsNDDCInventory": 1.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 0.0,
        "DOMsNFSInventory": 9.0,
        "DOMsEMPInventory": 0.0,
        "DOMsGAInventory": 0.0,
        "SizeCountOwned": 3.0,
        "SizeCountTotal": 14.0,
        "SizeIntegrity": 21.4,
        "ChannelWOH": 0.7,
        "MarketPlaceWOH": 1.5,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 1.0,
        "NetUnitsFourWkAvg": 2.3,
        "NetUnitsFourWkRolling": 9.0,
        "NetUnitsMTD": -3.0,
        "NetUnitsSTD": 21.0,
        "NetSalesLW": 3180.9,
        "NetSalesFourWkAvg": 7838.9,
        "NetSalesFourWkRolling": 31355.6,
        "NetSalesMTD": -14997.3,
        "NetSalesSTD": 75890.2,
        "NetAURLW": 3180.9,
        "NetAURFourWeekAvg": 3484.0,
        "NetSalesLWUSD": 28.9,
        "NetSalesFourWeekAvgUSD": 71.3,
        "NetSalesFourWeekRollingUSD": 285.1,
        "NetSalesMTDUSD": -136.3,
        "NetSalesSTDUSD": 689.9,
        "NetAURLWUSD": 28.9,
        "NetAURFourWeekAvgUSD": 31.7,
        "DemandUnitsLW": 2.0,
        "DemandUnitsFourWeekAvg": 6.8,
        "DemandUnitsFourWeekRolling": 27.0,
        "DemandUnitsMTD": 4.0,
        "DemandUnitsSTD": 44.0,
        "DemandSalesLW": 18260.0,
        "DemandSalesFourWeekAvg": 61627.5,
        "DemandSalesFourWeekRolling": 246510.0,
        "DemandSalesMTD": 36520.0,
        "DemandSalesSTD": 401720.0,
        "DemandAURLW": 9130.0,
        "DemandAURFourWeekAvg": 9130.0,
        "DemandSalesLWUSD": 166.0,
        "DemandSalesFourWeekAvgUSD": 560.2,
        "DemandSalesFourWeekRollingUSD": 2241.0,
        "DemandSalesMTDUSD": 332.0,
        "DemandSalesSTDUSD": 3652.0,
        "DemandAURLWUSD": 83.0,
        "DemandAURFourWeekAvgUSD": 83.0,
        "FirstOrderDate": "2020-08-20",
        "DaysOnSale": 184,
        "WebTrafficLW": 2,
        "WebConversionPct": 100.0,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "FA2019",
        "LastSeasonPlannedEndDate": "2019-10-05",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2019",
        "ClearanceSeasonEndDate": "2020-01-04",
        "Status": "CLOSEOUT",
        "EPOD": "2019-09-13",
        "LaunchTier": "NO",
        "LOB": "Clearance",
        "MSRP": 8217.0,
        "WholesalePriceLocal": 4980.0,
        "CurrentLCSellingPrice": 4999.0,
        "TotalDiscount": 0.39,
        "LastMDDate": "2021-01-22",
        "MDCount": 1,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": -2.7,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "AT3378-060",
        "Comment": null,
        "Description": "NIKE AIR MAX ALPHA SAVAGE MEN'S TRAINING SHOE",
        "SlimLifecycleSeason": "Post Season",
        "RecommendedAction": "CLOSEOUT-PAST CLEARENCE SEASON",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,NO ACTION",
        "ToolTipValue": "Post Season,Past Clearance Season",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "AT3378",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "AIR MAX OTHER",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 1.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 1.0,
        "_Contracts": null,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 0.0,
        "DOMsInventory": 2.0,
        "DOMsNDDCInventory": 1.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 0.0,
        "DOMsNFSInventory": 1.0,
        "DOMsEMPInventory": 0.0,
        "DOMsGAInventory": 0.0,
        "SizeCountOwned": 1.0,
        "SizeCountTotal": 13.0,
        "SizeIntegrity": 7.7,
        "ChannelWOH": 0.1,
        "MarketPlaceWOH": 0.1,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 20.0,
        "NetUnitsFourWkAvg": 11.3,
        "NetUnitsFourWkRolling": 45.0,
        "NetUnitsMTD": 34.0,
        "NetUnitsSTD": 84.0,
        "NetSalesLW": 98045.6,
        "NetSalesFourWkAvg": 60746.8,
        "NetSalesFourWkRolling": 242987.1,
        "NetSalesMTD": 180869.7,
        "NetSalesSTD": 468986.7,
        "NetAURLW": 4902.3,
        "NetAURFourWeekAvg": 5399.7,
        "NetSalesLWUSD": 891.3,
        "NetSalesFourWeekAvgUSD": 552.2,
        "NetSalesFourWeekRollingUSD": 2209.0,
        "NetSalesMTDUSD": 1644.3,
        "NetSalesSTDUSD": 4263.5,
        "NetAURLWUSD": 44.6,
        "NetAURFourWeekAvgUSD": 49.1,
        "DemandUnitsLW": 26.0,
        "DemandUnitsFourWeekAvg": 14.0,
        "DemandUnitsFourWeekRolling": 56.0,
        "DemandUnitsMTD": 42.0,
        "DemandUnitsSTD": 94.0,
        "DemandSalesLW": 314600.0,
        "DemandSalesFourWeekAvg": 169400.0,
        "DemandSalesFourWeekRolling": 677600.0,
        "DemandSalesMTD": 508200.0,
        "DemandSalesSTD": 1137400.0,
        "DemandAURLW": 12100.0,
        "DemandAURFourWeekAvg": 12100.0,
        "DemandSalesLWUSD": 2860.0,
        "DemandSalesFourWeekAvgUSD": 1540.0,
        "DemandSalesFourWeekRollingUSD": 6160.0,
        "DemandSalesMTDUSD": 4620.0,
        "DemandSalesSTDUSD": 10340.0,
        "DemandAURLWUSD": 110.0,
        "DemandAURFourWeekAvgUSD": 110.0,
        "FirstOrderDate": "2020-08-23",
        "DaysOnSale": 181,
        "WebTrafficLW": 985,
        "WebConversionPct": 2.6,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "SU2020",
        "LastSeasonPlannedEndDate": "2020-07-04",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "FA2020",
        "ClearanceSeasonEndDate": "2020-10-03",
        "Status": "ACTIVE",
        "EPOD": "2020-06-30",
        "LaunchTier": "NO",
        "LOB": "Clearance",
        "MSRP": 10890.0,
        "WholesalePriceLocal": 6600.0,
        "CurrentLCSellingPrice": 12100.0,
        "TotalDiscount": -0.11,
        "LastMDDate": "2020-08-25",
        "MDCount": 2,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": -0.7,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "AT3378-301",
        "Comment": null,
        "Description": "NIKE AIR MAX ALPHA SAVAGE MEN'S TRAINING SHOE",
        "SlimLifecycleSeason": "Post Season",
        "RecommendedAction": "CLOSEOUT-PAST CLEARENCE SEASON",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,NO ACTION",
        "ToolTipValue": "Post Season,Past Clearance Season",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "AT3378",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "AIR MAX OTHER",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 993.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1085_Contracts": 993.0,
        "_Contracts": null,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1085": 0.0,
        "DOMsInventory": 1036.0,
        "DOMsNDDCInventory": 1025.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 0.0,
        "DOMsNFSInventory": 11.0,
        "DOMsEMPInventory": 0.0,
        "DOMsGAInventory": 0.0,
        "SizeCountOwned": 9.0,
        "SizeCountTotal": 12.0,
        "SizeIntegrity": 75.0,
        "ChannelWOH": 17.5,
        "MarketPlaceWOH": 18.2,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 61.0,
        "NetUnitsFourWkAvg": 32.0,
        "NetUnitsFourWkRolling": 128.0,
        "NetUnitsMTD": 105.0,
        "NetUnitsSTD": 203.0,
        "NetSalesLW": 302219.2,
        "NetSalesFourWkAvg": 180539.7,
        "NetSalesFourWkRolling": 722158.6,
        "NetSalesMTD": 577088.5,
        "NetSalesSTD": 1175937.0,
        "NetAURLW": 4954.4,
        "NetAURFourWeekAvg": 5641.9,
        "NetSalesLWUSD": 2747.4,
        "NetSalesFourWeekAvgUSD": 1641.3,
        "NetSalesFourWeekRollingUSD": 6565.1,
        "NetSalesMTDUSD": 5246.3,
        "NetSalesSTDUSD": 10690.3,
        "NetAURLWUSD": 45.0,
        "NetAURFourWeekAvgUSD": 51.3,
        "DemandUnitsLW": 156.0,
        "DemandUnitsFourWeekAvg": 56.8,
        "DemandUnitsFourWeekRolling": 227.0,
        "DemandUnitsMTD": 249.0,
        "DemandUnitsSTD": 365.0,
        "DemandSalesLW": 1887600.0,
        "DemandSalesFourWeekAvg": 686675.0,
        "DemandSalesFourWeekRolling": 2746700.0,
        "DemandSalesMTD": 3012900.0,
        "DemandSalesSTD": 4416500.0,
        "DemandAURLW": 12100.0,
        "DemandAURFourWeekAvg": 12100.0,
        "DemandSalesLWUSD": 17160.0,
        "DemandSalesFourWeekAvgUSD": 6242.5,
        "DemandSalesFourWeekRollingUSD": 24970.0,
        "DemandSalesMTDUSD": 27390.0,
        "DemandSalesSTDUSD": 40150.0,
        "DemandAURLWUSD": 110.0,
        "DemandAURFourWeekAvgUSD": 110.0,
        "FirstOrderDate": "2020-08-20",
        "DaysOnSale": 184,
        "WebTrafficLW": 4688,
        "WebConversionPct": 3.1,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "FA2020",
        "LastSeasonPlannedEndDate": "2020-10-03",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2020",
        "ClearanceSeasonEndDate": "2021-01-02",
        "Status": "ACTIVE",
        "EPOD": "2020-09-30",
        "LaunchTier": "NO",
        "LOB": "Clearance",
        "MSRP": 10890.0,
        "WholesalePriceLocal": 6600.0,
        "CurrentLCSellingPrice": 12100.0,
        "TotalDiscount": -0.11,
        "LastMDDate": "2020-09-23",
        "MDCount": 1,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": -1.2,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "AT3378-471",
        "Comment": null,
        "Description": "NIKE AIR MAX ALPHA SAVAGE MEN'S TRAINING SHOE",
        "SlimLifecycleSeason": "Post Season",
        "RecommendedAction": "CLOSEOUT-PAST CLEARENCE SEASON",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,NO ACTION",
        "ToolTipValue": "Post Season,Past Clearance Season",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "AT3378",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "AIR MAX OTHER",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 1493.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1085_Contracts": 1493.0,
        "_Contracts": null,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1085": 1.0,
        "DOMsInventory": 1512.0,
        "DOMsNDDCInventory": 1507.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 0.0,
        "DOMsNFSInventory": 5.0,
        "DOMsEMPInventory": 0.0,
        "DOMsGAInventory": 0.0,
        "SizeCountOwned": 9.0,
        "SizeCountTotal": 12.0,
        "SizeIntegrity": 75.0,
        "ChannelWOH": 24.6,
        "MarketPlaceWOH": 24.9,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 92.0,
        "NetUnitsFourWkAvg": 39.5,
        "NetUnitsFourWkRolling": 158.0,
        "NetUnitsMTD": 141.0,
        "NetUnitsSTD": 227.0,
        "NetSalesLW": 435828.9,
        "NetSalesFourWkAvg": 209487.8,
        "NetSalesFourWkRolling": 837951.1,
        "NetSalesMTD": 736148.3,
        "NetSalesSTD": 1261125.6,
        "NetAURLW": 4737.3,
        "NetAURFourWeekAvg": 5303.5,
        "NetSalesLWUSD": 3962.1,
        "NetSalesFourWeekAvgUSD": 1904.4,
        "NetSalesFourWeekRollingUSD": 7617.7,
        "NetSalesMTDUSD": 6692.3,
        "NetSalesSTDUSD": 11464.8,
        "NetAURLWUSD": 43.1,
        "NetAURFourWeekAvgUSD": 48.2,
        "DemandUnitsLW": 167.0,
        "DemandUnitsFourWeekAvg": 60.8,
        "DemandUnitsFourWeekRolling": 243.0,
        "DemandUnitsMTD": 253.0,
        "DemandUnitsSTD": 357.0,
        "DemandSalesLW": 2020700.0,
        "DemandSalesFourWeekAvg": 735075.0,
        "DemandSalesFourWeekRolling": 2940300.0,
        "DemandSalesMTD": 3061300.0,
        "DemandSalesSTD": 4319700.0,
        "DemandAURLW": 12100.0,
        "DemandAURFourWeekAvg": 12100.0,
        "DemandSalesLWUSD": 18370.0,
        "DemandSalesFourWeekAvgUSD": 6682.5,
        "DemandSalesFourWeekRollingUSD": 26730.0,
        "DemandSalesMTDUSD": 27830.0,
        "DemandSalesSTDUSD": 39270.0,
        "DemandAURLWUSD": 110.0,
        "DemandAURFourWeekAvgUSD": 110.0,
        "FirstOrderDate": "2020-09-18",
        "DaysOnSale": 155,
        "WebTrafficLW": 5214,
        "WebConversionPct": 2.9,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "FA2020",
        "LastSeasonPlannedEndDate": "2020-10-03",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2020",
        "ClearanceSeasonEndDate": "2021-01-02",
        "Status": "ACTIVE",
        "EPOD": "2020-09-30",
        "LaunchTier": "NO",
        "LOB": "Clearance",
        "MSRP": 10890.0,
        "WholesalePriceLocal": 6600.0,
        "CurrentLCSellingPrice": 12100.0,
        "TotalDiscount": -0.11,
        "LastMDDate": "2020-09-23",
        "MDCount": 1,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": -1.1,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CJ0773-010",
        "Comment": null,
        "Description": "NIKE SUPERREP GO MEN'S TRAINING SHOE",
        "SlimLifecycleSeason": "Post Season",
        "RecommendedAction": "CLOSEOUT-PAST CLEARENCE SEASON",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,NO ACTION",
        "ToolTipValue": "Post Season,Past Clearance Season",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CJ0773",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": "Cristiano Ronaldo",
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 2.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 1.0,
        "1085_Contracts": 1.0,
        "_Contracts": null,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 0.0,
        "GA_1085": 0.0,
        "DOMsInventory": 139.0,
        "DOMsNDDCInventory": 4.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 0.0,
        "DOMsNFSInventory": 135.0,
        "DOMsEMPInventory": 0.0,
        "DOMsGAInventory": 0.0,
        "SizeCountOwned": 1.0,
        "SizeCountTotal": 13.0,
        "SizeIntegrity": 7.7,
        "ChannelWOH": 0.3,
        "MarketPlaceWOH": 20.4,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 13.0,
        "NetUnitsFourWkAvg": 5.0,
        "NetUnitsFourWkRolling": 20.0,
        "NetUnitsMTD": 19.0,
        "NetUnitsSTD": 58.0,
        "NetSalesLW": 72860.9,
        "NetSalesFourWkAvg": 30940.8,
        "NetSalesFourWkRolling": 123763.3,
        "NetSalesMTD": 116491.5,
        "NetSalesSTD": 374273.0,
        "NetAURLW": 5604.7,
        "NetAURFourWeekAvg": 6188.2,
        "NetSalesLWUSD": 662.4,
        "NetSalesFourWeekAvgUSD": 281.3,
        "NetSalesFourWeekRollingUSD": 1125.1,
        "NetSalesMTDUSD": 1059.0,
        "NetSalesSTDUSD": 3402.5,
        "NetAURLWUSD": 51.0,
        "NetAURFourWeekAvgUSD": 56.3,
        "DemandUnitsLW": 17.0,
        "DemandUnitsFourWeekAvg": 6.8,
        "DemandUnitsFourWeekRolling": 27.0,
        "DemandUnitsMTD": 30.0,
        "DemandUnitsSTD": 75.0,
        "DemandSalesLW": 187000.0,
        "DemandSalesFourWeekAvg": 74250.0,
        "DemandSalesFourWeekRolling": 297000.0,
        "DemandSalesMTD": 330000.0,
        "DemandSalesSTD": 825000.0,
        "DemandAURLW": 11000.0,
        "DemandAURFourWeekAvg": 11000.0,
        "DemandSalesLWUSD": 1700.0,
        "DemandSalesFourWeekAvgUSD": 675.0,
        "DemandSalesFourWeekRollingUSD": 2700.0,
        "DemandSalesMTDUSD": 3000.0,
        "DemandSalesSTDUSD": 7500.0,
        "DemandAURLWUSD": 100.0,
        "DemandAURFourWeekAvgUSD": 100.0,
        "FirstOrderDate": "2020-08-22",
        "DaysOnSale": 182,
        "WebTrafficLW": 1756,
        "WebConversionPct": 1.0,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "FA2020",
        "LastSeasonPlannedEndDate": "2020-10-03",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2020",
        "ClearanceSeasonEndDate": "2021-01-02",
        "Status": "ACTIVE",
        "EPOD": "2022-03-31",
        "LaunchTier": "NO",
        "LOB": "Clearance",
        "MSRP": 9900.0,
        "WholesalePriceLocal": 6000.0,
        "CurrentLCSellingPrice": 7999.0,
        "TotalDiscount": 0.19,
        "LastMDDate": "2021-01-22",
        "MDCount": 1,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": -0.6,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CJ8058-001",
        "Comment": null,
        "Description": "NIKE AIR MAX ALPHA TR 3 MEN'S TRAINING SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CJ8058",
        "Category": "Athletic Training",
        "SubCategory": "MENS CORE TRAIN",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "AIR MAX OTHER",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 104.0,
        "UnassignedZerotoThirtyDaysOut": 5.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1084_Contracts": 99.0,
        "_Contracts": null,
        "WholesaleContract": 480.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1084": 0.0,
        "DOMsInventory": 1685.0,
        "DOMsNDDCInventory": 100.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 0.0,
        "DOMsNFSInventory": 1330.0,
        "DOMsEMPInventory": 0.0,
        "DOMsGAInventory": 255.0,
        "SizeCountOwned": 12.0,
        "SizeCountTotal": 12.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 26.0,
        "MarketPlaceWOH": 421.3,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 0.0,
        "NetUnitsFourWkAvg": 3.0,
        "NetUnitsFourWkRolling": 12.0,
        "NetUnitsMTD": 10.0,
        "NetUnitsSTD": 22.0,
        "NetSalesLW": 0.0,
        "NetSalesFourWkAvg": 25287.6,
        "NetSalesFourWkRolling": 101150.3,
        "NetSalesMTD": 84150.2,
        "NetSalesSTD": 181729.5,
        "NetAURLW": 0.0,
        "NetAURFourWeekAvg": 8429.2,
        "NetSalesLWUSD": 0.0,
        "NetSalesFourWeekAvgUSD": 229.9,
        "NetSalesFourWeekRollingUSD": 919.5,
        "NetSalesMTDUSD": 765.0,
        "NetSalesSTDUSD": 1652.1,
        "NetAURLWUSD": 0.0,
        "NetAURFourWeekAvgUSD": 76.6,
        "DemandUnitsLW": 3.0,
        "DemandUnitsFourWeekAvg": 4.0,
        "DemandUnitsFourWeekRolling": 16.0,
        "DemandUnitsMTD": 13.0,
        "DemandUnitsSTD": 29.0,
        "DemandSalesLW": 28050.0,
        "DemandSalesFourWeekAvg": 37400.0,
        "DemandSalesFourWeekRolling": 149600.0,
        "DemandSalesMTD": 121550.0,
        "DemandSalesSTD": 271150.0,
        "DemandAURLW": 9350.0,
        "DemandAURFourWeekAvg": 9350.0,
        "DemandSalesLWUSD": 255.0,
        "DemandSalesFourWeekAvgUSD": 340.0,
        "DemandSalesFourWeekRollingUSD": 1360.0,
        "DemandSalesMTDUSD": 1105.0,
        "DemandSalesSTDUSD": 2465.0,
        "DemandAURLWUSD": 85.0,
        "DemandAURFourWeekAvgUSD": 85.0,
        "FirstOrderDate": "2020-09-30",
        "DaysOnSale": 143,
        "WebTrafficLW": 532,
        "WebConversionPct": 0.6,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "SU2021",
        "LastSeasonPlannedEndDate": "2021-07-03",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "FA2021",
        "ClearanceSeasonEndDate": "2021-10-02",
        "Status": "ACTIVE",
        "EPOD": "2022-03-31",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 8415.0,
        "WholesalePriceLocal": 5100.0,
        "CurrentLCSellingPrice": 9350.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": -3.5,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CQ9356-004",
        "Comment": null,
        "Description": "NIKE LEGEND ESSENTIAL 2 MEN'S TRAINING SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CQ9356",
        "Category": "Athletic Training",
        "SubCategory": "MENS CORE TRAIN",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "NO FRANCHISE",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 3.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 3.0,
        "_Contracts": null,
        "WholesaleContract": 164.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 3.0,
        "DOMsInventory": 3.0,
        "DOMsNDDCInventory": 3.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 0.0,
        "DOMsNFSInventory": 0.0,
        "DOMsEMPInventory": 0.0,
        "DOMsGAInventory": 0.0,
        "SizeCountOwned": 3.0,
        "SizeCountTotal": 3.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 0.0,
        "MarketPlaceWOH": null,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": null,
        "NetUnitsFourWkAvg": null,
        "NetUnitsFourWkRolling": null,
        "NetUnitsMTD": null,
        "NetUnitsSTD": null,
        "NetSalesLW": null,
        "NetSalesFourWkAvg": null,
        "NetSalesFourWkRolling": null,
        "NetSalesMTD": null,
        "NetSalesSTD": null,
        "NetAURLW": null,
        "NetAURFourWeekAvg": null,
        "NetSalesLWUSD": null,
        "NetSalesFourWeekAvgUSD": null,
        "NetSalesFourWeekRollingUSD": null,
        "NetSalesMTDUSD": null,
        "NetSalesSTDUSD": null,
        "NetAURLWUSD": null,
        "NetAURFourWeekAvgUSD": null,
        "DemandUnitsLW": null,
        "DemandUnitsFourWeekAvg": null,
        "DemandUnitsFourWeekRolling": null,
        "DemandUnitsMTD": null,
        "DemandUnitsSTD": null,
        "DemandSalesLW": null,
        "DemandSalesFourWeekAvg": null,
        "DemandSalesFourWeekRolling": null,
        "DemandSalesMTD": null,
        "DemandSalesSTD": null,
        "DemandAURLW": null,
        "DemandAURFourWeekAvg": null,
        "DemandSalesLWUSD": null,
        "DemandSalesFourWeekAvgUSD": null,
        "DemandSalesFourWeekRollingUSD": null,
        "DemandSalesMTDUSD": null,
        "DemandSalesSTDUSD": null,
        "DemandAURLWUSD": null,
        "DemandAURFourWeekAvgUSD": null,
        "FirstOrderDate": null,
        "DaysOnSale": null,
        "WebTrafficLW": null,
        "WebConversionPct": null,
        "WebConversionFourWeekAvgCGD": null,
        "LastSeasonPlanned": "SP2021",
        "LastSeasonPlannedEndDate": "2021-04-03",
        "InLastFPPlannedSeason": "YES",
        "ClearanceSeason": "SU2021",
        "ClearanceSeasonEndDate": "2021-07-03",
        "Status": "INACTIVE",
        "EPOD": "2021-03-31",
        "LaunchTier": "NO",
        "LOB": "Clearance",
        "MSRP": 5940.0,
        "WholesalePriceLocal": 3600.0,
        "CurrentLCSellingPrice": 6600.0,
        "TotalDiscount": -0.11,
        "LastMDDate": "2021-02-15",
        "MDCount": 1,
        "ContributionMargin": null,
        "PriceElasticitySC": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CU6445-001",
        "Comment": null,
        "Description": "NIKE AIR ZOOM SUPERREP 2 MEN'S HIIT CLASS SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CU6445",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 1238.0,
        "UnassignedZerotoThirtyDaysOut": 113.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 79.0,
        "1084_Contracts": 1046.0,
        "NSO_Contracts": 58.0,
        "WholesaleContract": 198.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 4.0,
        "GA_1084": 0.0,
        "DOMsInventory": 1162.0,
        "DOMsNDDCInventory": 1126.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 24.0,
        "DOMsNFSInventory": 0.0,
        "DOMsEMPInventory": 1.0,
        "DOMsGAInventory": 11.0,
        "SizeCountOwned": 16.0,
        "SizeCountTotal": 16.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 82.5,
        "MarketPlaceWOH": 58.7,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 6.0,
        "NetUnitsFourWkAvg": 8.8,
        "NetUnitsFourWkRolling": 35.0,
        "NetUnitsMTD": 20.0,
        "NetUnitsSTD": 41.0,
        "NetSalesLW": 74400.0,
        "NetSalesFourWkAvg": 102000.1,
        "NetSalesFourWkRolling": 408000.5,
        "NetSalesMTD": 235200.2,
        "NetSalesSTD": 480000.5,
        "NetAURLW": 12400.0,
        "NetAURFourWeekAvg": 11657.2,
        "NetSalesLWUSD": 676.4,
        "NetSalesFourWeekAvgUSD": 927.3,
        "NetSalesFourWeekRollingUSD": 3709.1,
        "NetSalesMTDUSD": 2138.2,
        "NetSalesSTDUSD": 4363.6,
        "NetAURLWUSD": 112.7,
        "NetAURFourWeekAvgUSD": 106.0,
        "DemandUnitsLW": 20.0,
        "DemandUnitsFourWeekAvg": 15.0,
        "DemandUnitsFourWeekRolling": 60.0,
        "DemandUnitsMTD": 44.0,
        "DemandUnitsSTD": 78.0,
        "DemandSalesLW": 264000.0,
        "DemandSalesFourWeekAvg": 198000.0,
        "DemandSalesFourWeekRolling": 792000.0,
        "DemandSalesMTD": 580800.0,
        "DemandSalesSTD": 1029600.0,
        "DemandAURLW": 13200.0,
        "DemandAURFourWeekAvg": 13200.0,
        "DemandSalesLWUSD": 2400.0,
        "DemandSalesFourWeekAvgUSD": 1800.0,
        "DemandSalesFourWeekRollingUSD": 7200.0,
        "DemandSalesMTDUSD": 5280.0,
        "DemandSalesSTDUSD": 9360.0,
        "DemandAURLWUSD": 120.0,
        "DemandAURFourWeekAvgUSD": 120.0,
        "FirstOrderDate": "2021-01-18",
        "DaysOnSale": 33,
        "WebTrafficLW": 2209,
        "WebConversionPct": 0.9,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "SU2021",
        "LastSeasonPlannedEndDate": "2021-07-03",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "FA2021",
        "ClearanceSeasonEndDate": "2021-10-02",
        "Status": "ACTIVE",
        "EPOD": "2021-04-30",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 11880.0,
        "WholesalePriceLocal": 7200.0,
        "CurrentLCSellingPrice": 13200.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": 0.2,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CU6445-003",
        "Comment": null,
        "Description": "NIKE AIR ZOOM SUPERREP 2 MEN'S HIIT CLASS SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CU6445",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 1968.0,
        "UnassignedZerotoThirtyDaysOut": 613.0,
        "UnassignedThirtyonetoSixtyDaysOut": 299.0,
        "UnassignedSixtyonePlusDaysOut": 128.0,
        "1083_Contracts": 0.0,
        "1084_Contracts": 928.0,
        "NSO_Contracts": 397.0,
        "WholesaleContract": 1050.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 3.0,
        "GA_1084": 0.0,
        "DOMsInventory": 1031.0,
        "DOMsNDDCInventory": 929.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 86.0,
        "DOMsNFSInventory": 0.0,
        "DOMsEMPInventory": 9.0,
        "DOMsGAInventory": 7.0,
        "SizeCountOwned": 16.0,
        "SizeCountTotal": 16.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 128.6,
        "MarketPlaceWOH": 57.0,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 14.0,
        "NetUnitsFourWkAvg": 11.3,
        "NetUnitsFourWkRolling": 45.0,
        "NetUnitsMTD": 37.0,
        "NetUnitsSTD": 48.0,
        "NetSalesLW": 165600.2,
        "NetSalesFourWkAvg": 129900.2,
        "NetSalesFourWkRolling": 519600.6,
        "NetSalesMTD": 428400.5,
        "NetSalesSTD": 553200.7,
        "NetAURLW": 11828.6,
        "NetAURFourWeekAvg": 11546.7,
        "NetSalesLWUSD": 1505.5,
        "NetSalesFourWeekAvgUSD": 1180.9,
        "NetSalesFourWeekRollingUSD": 4723.6,
        "NetSalesMTDUSD": 3894.6,
        "NetSalesSTDUSD": 5029.1,
        "NetAURLWUSD": 107.5,
        "NetAURFourWeekAvgUSD": 105.0,
        "DemandUnitsLW": 22.0,
        "DemandUnitsFourWeekAvg": 15.3,
        "DemandUnitsFourWeekRolling": 61.0,
        "DemandUnitsMTD": 55.0,
        "DemandUnitsSTD": 73.0,
        "DemandSalesLW": 290400.0,
        "DemandSalesFourWeekAvg": 201300.0,
        "DemandSalesFourWeekRolling": 805200.0,
        "DemandSalesMTD": 726000.0,
        "DemandSalesSTD": 963600.0,
        "DemandAURLW": 13200.0,
        "DemandAURFourWeekAvg": 13200.0,
        "DemandSalesLWUSD": 2640.0,
        "DemandSalesFourWeekAvgUSD": 1830.0,
        "DemandSalesFourWeekRollingUSD": 7320.0,
        "DemandSalesMTDUSD": 6600.0,
        "DemandSalesSTDUSD": 8760.0,
        "DemandAURLWUSD": 120.0,
        "DemandAURFourWeekAvgUSD": 120.0,
        "FirstOrderDate": "2021-01-19",
        "DaysOnSale": 32,
        "WebTrafficLW": 2298,
        "WebConversionPct": 0.8,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "FA2021",
        "LastSeasonPlannedEndDate": "2021-10-02",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2021",
        "ClearanceSeasonEndDate": "2022-01-01",
        "Status": "ACTIVE",
        "EPOD": "2021-09-30",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 11880.0,
        "WholesalePriceLocal": 7200.0,
        "CurrentLCSellingPrice": 13200.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": 0.2,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CU6445-106",
        "Comment": null,
        "Description": "NIKE AIR ZOOM SUPERREP 2 MEN'S HIIT CLASS SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CU6445",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 276.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 276.0,
        "1084_Contracts": 0.0,
        "NSO_Contracts": 131.0,
        "WholesaleContract": 182.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1084": 0.0,
        "DOMsInventory": null,
        "DOMsNDDCInventory": null,
        "DOMsZOZOInventory": null,
        "DOMsNSOInventory": null,
        "DOMsNFSInventory": null,
        "DOMsEMPInventory": null,
        "DOMsGAInventory": null,
        "SizeCountOwned": 12.0,
        "SizeCountTotal": 12.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 0.0,
        "MarketPlaceWOH": null,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": null,
        "NetUnitsFourWkAvg": null,
        "NetUnitsFourWkRolling": null,
        "NetUnitsMTD": null,
        "NetUnitsSTD": null,
        "NetSalesLW": null,
        "NetSalesFourWkAvg": null,
        "NetSalesFourWkRolling": null,
        "NetSalesMTD": null,
        "NetSalesSTD": null,
        "NetAURLW": null,
        "NetAURFourWeekAvg": null,
        "NetSalesLWUSD": null,
        "NetSalesFourWeekAvgUSD": null,
        "NetSalesFourWeekRollingUSD": null,
        "NetSalesMTDUSD": null,
        "NetSalesSTDUSD": null,
        "NetAURLWUSD": null,
        "NetAURFourWeekAvgUSD": null,
        "DemandUnitsLW": null,
        "DemandUnitsFourWeekAvg": null,
        "DemandUnitsFourWeekRolling": null,
        "DemandUnitsMTD": null,
        "DemandUnitsSTD": null,
        "DemandSalesLW": null,
        "DemandSalesFourWeekAvg": null,
        "DemandSalesFourWeekRolling": null,
        "DemandSalesMTD": null,
        "DemandSalesSTD": null,
        "DemandAURLW": null,
        "DemandAURFourWeekAvg": null,
        "DemandSalesLWUSD": null,
        "DemandSalesFourWeekAvgUSD": null,
        "DemandSalesFourWeekRollingUSD": null,
        "DemandSalesMTDUSD": null,
        "DemandSalesSTDUSD": null,
        "DemandAURLWUSD": null,
        "DemandAURFourWeekAvgUSD": null,
        "FirstOrderDate": null,
        "DaysOnSale": null,
        "WebTrafficLW": null,
        "WebConversionPct": null,
        "WebConversionFourWeekAvgCGD": null,
        "LastSeasonPlanned": "FA2021",
        "LastSeasonPlannedEndDate": "2021-10-02",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2021",
        "ClearanceSeasonEndDate": "2022-01-01",
        "Status": "INACTIVE",
        "EPOD": "2021-09-30",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 11880.0,
        "WholesalePriceLocal": 7200.0,
        "CurrentLCSellingPrice": 13200.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": null,
        "PriceElasticitySC": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CU6445-400",
        "Comment": null,
        "Description": "NIKE AIR ZOOM SUPERREP 2 MEN'S HIIT CLASS SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CU6445",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 790.0,
        "UnassignedZerotoThirtyDaysOut": 18.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 2.0,
        "1084_Contracts": 770.0,
        "NSO_Contracts": 45.0,
        "WholesaleContract": 111.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 4.0,
        "GA_1084": 0.0,
        "DOMsInventory": 784.0,
        "DOMsNDDCInventory": 774.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 3.0,
        "DOMsNFSInventory": 0.0,
        "DOMsEMPInventory": 2.0,
        "DOMsGAInventory": 5.0,
        "SizeCountOwned": 16.0,
        "SizeCountTotal": 16.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 18.2,
        "MarketPlaceWOH": 16.6,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 33.0,
        "NetUnitsFourWkAvg": 30.0,
        "NetUnitsFourWkRolling": 120.0,
        "NetUnitsMTD": 98.0,
        "NetUnitsSTD": 273.0,
        "NetSalesLW": 381600.5,
        "NetSalesFourWkAvg": 347100.4,
        "NetSalesFourWkRolling": 1388401.6,
        "NetSalesMTD": 1131601.4,
        "NetSalesSTD": 3165603.7,
        "NetAURLW": 11563.7,
        "NetAURFourWeekAvg": 11570.0,
        "NetSalesLWUSD": 3469.1,
        "NetSalesFourWeekAvgUSD": 3155.5,
        "NetSalesFourWeekRollingUSD": 12621.8,
        "NetSalesMTDUSD": 10287.3,
        "NetSalesSTDUSD": 28778.2,
        "NetAURLWUSD": 105.1,
        "NetAURFourWeekAvgUSD": 105.2,
        "DemandUnitsLW": 54.0,
        "DemandUnitsFourWeekAvg": 43.5,
        "DemandUnitsFourWeekRolling": 174.0,
        "DemandUnitsMTD": 138.0,
        "DemandUnitsSTD": 374.0,
        "DemandSalesLW": 712800.0,
        "DemandSalesFourWeekAvg": 574200.0,
        "DemandSalesFourWeekRolling": 2296800.0,
        "DemandSalesMTD": 1821600.0,
        "DemandSalesSTD": 4936800.0,
        "DemandAURLW": 13200.0,
        "DemandAURFourWeekAvg": 13200.0,
        "DemandSalesLWUSD": 6480.0,
        "DemandSalesFourWeekAvgUSD": 5220.0,
        "DemandSalesFourWeekRollingUSD": 20880.0,
        "DemandSalesMTDUSD": 16560.0,
        "DemandSalesSTDUSD": 44880.0,
        "DemandAURLWUSD": 120.0,
        "DemandAURFourWeekAvgUSD": 120.0,
        "FirstOrderDate": "2021-01-11",
        "DaysOnSale": 40,
        "WebTrafficLW": 5703,
        "WebConversionPct": 0.9,
        "WebConversionFourWeekAvgCGD": 1.4,
        "LastSeasonPlanned": "SU2021",
        "LastSeasonPlannedEndDate": "2021-07-03",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "FA2021",
        "ClearanceSeasonEndDate": "2021-10-02",
        "Status": "ACTIVE",
        "EPOD": "2021-04-30",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 11880.0,
        "WholesalePriceLocal": 7200.0,
        "CurrentLCSellingPrice": 13200.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": 0.455,
        "PriceElasticitySC": -15.0,
        "PriceElasticityConfidence": "GREEN",
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CU7627-016",
        "Comment": null,
        "Description": "NIKE ZOOMX SUPERREP SURGE MEN'S ENDURANCE CLASS SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CU7627",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 7.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1085_Contracts": 7.0,
        "_Contracts": null,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1085": 0.0,
        "DOMsInventory": 7.0,
        "DOMsNDDCInventory": 7.0,
        "DOMsZOZOInventory": 0.0,
        "DOMsNSOInventory": 0.0,
        "DOMsNFSInventory": 0.0,
        "DOMsEMPInventory": 0.0,
        "DOMsGAInventory": 0.0,
        "SizeCountOwned": 7.0,
        "SizeCountTotal": 7.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 0.0,
        "MarketPlaceWOH": null,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": null,
        "NetUnitsFourWkAvg": null,
        "NetUnitsFourWkRolling": null,
        "NetUnitsMTD": null,
        "NetUnitsSTD": null,
        "NetSalesLW": null,
        "NetSalesFourWkAvg": null,
        "NetSalesFourWkRolling": null,
        "NetSalesMTD": null,
        "NetSalesSTD": null,
        "NetAURLW": null,
        "NetAURFourWeekAvg": null,
        "NetSalesLWUSD": null,
        "NetSalesFourWeekAvgUSD": null,
        "NetSalesFourWeekRollingUSD": null,
        "NetSalesMTDUSD": null,
        "NetSalesSTDUSD": null,
        "NetAURLWUSD": null,
        "NetAURFourWeekAvgUSD": null,
        "DemandUnitsLW": null,
        "DemandUnitsFourWeekAvg": null,
        "DemandUnitsFourWeekRolling": null,
        "DemandUnitsMTD": null,
        "DemandUnitsSTD": null,
        "DemandSalesLW": null,
        "DemandSalesFourWeekAvg": null,
        "DemandSalesFourWeekRolling": null,
        "DemandSalesMTD": null,
        "DemandSalesSTD": null,
        "DemandAURLW": null,
        "DemandAURFourWeekAvg": null,
        "DemandSalesLWUSD": null,
        "DemandSalesFourWeekAvgUSD": null,
        "DemandSalesFourWeekRollingUSD": null,
        "DemandSalesMTDUSD": null,
        "DemandSalesSTDUSD": null,
        "DemandAURLWUSD": null,
        "DemandAURFourWeekAvgUSD": null,
        "FirstOrderDate": null,
        "DaysOnSale": null,
        "WebTrafficLW": null,
        "WebConversionPct": null,
        "WebConversionFourWeekAvgCGD": null,
        "LastSeasonPlanned": "SP2021",
        "LastSeasonPlannedEndDate": "2021-04-03",
        "InLastFPPlannedSeason": "YES",
        "ClearanceSeason": "SU2021",
        "ClearanceSeasonEndDate": "2021-07-03",
        "Status": "INACTIVE",
        "EPOD": "2021-03-31",
        "LaunchTier": "NO",
        "LOB": "Clearance",
        "MSRP": 13860.0,
        "WholesalePriceLocal": 8400.0,
        "CurrentLCSellingPrice": 15400.0,
        "TotalDiscount": -0.11,
        "LastMDDate": "2021-02-15",
        "MDCount": 1,
        "ContributionMargin": null,
        "PriceElasticitySC": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CZ0599-106",
        "Comment": null,
        "Description": "NIKE AIR ZOOM SUPERREP 2 REVIVAL MEN'S HIIT CLASS SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CZ0599",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 400.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 400.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 0.0,
        "NSO_Contracts": 218.0,
        "WholesaleContract": 24.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 0.0,
        "DOMsInventory": null,
        "DOMsNDDCInventory": null,
        "DOMsZOZOInventory": null,
        "DOMsNSOInventory": null,
        "DOMsNFSInventory": null,
        "DOMsEMPInventory": null,
        "DOMsGAInventory": null,
        "SizeCountOwned": 14.0,
        "SizeCountTotal": 14.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 0.0,
        "MarketPlaceWOH": null,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": null,
        "NetUnitsFourWkAvg": null,
        "NetUnitsFourWkRolling": null,
        "NetUnitsMTD": null,
        "NetUnitsSTD": null,
        "NetSalesLW": null,
        "NetSalesFourWkAvg": null,
        "NetSalesFourWkRolling": null,
        "NetSalesMTD": null,
        "NetSalesSTD": null,
        "NetAURLW": null,
        "NetAURFourWeekAvg": null,
        "NetSalesLWUSD": null,
        "NetSalesFourWeekAvgUSD": null,
        "NetSalesFourWeekRollingUSD": null,
        "NetSalesMTDUSD": null,
        "NetSalesSTDUSD": null,
        "NetAURLWUSD": null,
        "NetAURFourWeekAvgUSD": null,
        "DemandUnitsLW": null,
        "DemandUnitsFourWeekAvg": null,
        "DemandUnitsFourWeekRolling": null,
        "DemandUnitsMTD": null,
        "DemandUnitsSTD": null,
        "DemandSalesLW": null,
        "DemandSalesFourWeekAvg": null,
        "DemandSalesFourWeekRolling": null,
        "DemandSalesMTD": null,
        "DemandSalesSTD": null,
        "DemandAURLW": null,
        "DemandAURFourWeekAvg": null,
        "DemandSalesLWUSD": null,
        "DemandSalesFourWeekAvgUSD": null,
        "DemandSalesFourWeekRollingUSD": null,
        "DemandSalesMTDUSD": null,
        "DemandSalesSTDUSD": null,
        "DemandAURLWUSD": null,
        "DemandAURFourWeekAvgUSD": null,
        "FirstOrderDate": null,
        "DaysOnSale": null,
        "WebTrafficLW": null,
        "WebConversionPct": null,
        "WebConversionFourWeekAvgCGD": null,
        "LastSeasonPlanned": "FA2021",
        "LastSeasonPlannedEndDate": "2021-10-02",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2021",
        "ClearanceSeasonEndDate": "2022-01-01",
        "Status": "INACTIVE",
        "EPOD": "2021-07-31",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 12870.0,
        "WholesalePriceLocal": 7800.0,
        "CurrentLCSellingPrice": 14300.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": null,
        "PriceElasticitySC": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "CZ0604-010",
        "Comment": null,
        "Description": "NIKE SUPERREP GO 2 MEN'S TRAINING SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "CZ0604",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 180.0,
        "UnassignedZerotoThirtyDaysOut": 180.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 0.0,
        "NSO_Contracts": 110.0,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 0.0,
        "DOMsInventory": null,
        "DOMsNDDCInventory": null,
        "DOMsZOZOInventory": null,
        "DOMsNSOInventory": null,
        "DOMsNFSInventory": null,
        "DOMsEMPInventory": null,
        "DOMsGAInventory": null,
        "SizeCountOwned": 14.0,
        "SizeCountTotal": 14.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 0.0,
        "MarketPlaceWOH": null,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": null,
        "NetUnitsFourWkAvg": null,
        "NetUnitsFourWkRolling": null,
        "NetUnitsMTD": null,
        "NetUnitsSTD": null,
        "NetSalesLW": null,
        "NetSalesFourWkAvg": null,
        "NetSalesFourWkRolling": null,
        "NetSalesMTD": null,
        "NetSalesSTD": null,
        "NetAURLW": null,
        "NetAURFourWeekAvg": null,
        "NetSalesLWUSD": null,
        "NetSalesFourWeekAvgUSD": null,
        "NetSalesFourWeekRollingUSD": null,
        "NetSalesMTDUSD": null,
        "NetSalesSTDUSD": null,
        "NetAURLWUSD": null,
        "NetAURFourWeekAvgUSD": null,
        "DemandUnitsLW": null,
        "DemandUnitsFourWeekAvg": null,
        "DemandUnitsFourWeekRolling": null,
        "DemandUnitsMTD": null,
        "DemandUnitsSTD": null,
        "DemandSalesLW": null,
        "DemandSalesFourWeekAvg": null,
        "DemandSalesFourWeekRolling": null,
        "DemandSalesMTD": null,
        "DemandSalesSTD": null,
        "DemandAURLW": null,
        "DemandAURFourWeekAvg": null,
        "DemandSalesLWUSD": null,
        "DemandSalesFourWeekAvgUSD": null,
        "DemandSalesFourWeekRollingUSD": null,
        "DemandSalesMTDUSD": null,
        "DemandSalesSTDUSD": null,
        "DemandAURLWUSD": null,
        "DemandAURFourWeekAvgUSD": null,
        "FirstOrderDate": null,
        "DaysOnSale": null,
        "WebTrafficLW": null,
        "WebConversionPct": null,
        "WebConversionFourWeekAvgCGD": null,
        "LastSeasonPlanned": "FA2021",
        "LastSeasonPlannedEndDate": "2021-10-02",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2021",
        "ClearanceSeasonEndDate": "2022-01-01",
        "Status": "INACTIVE",
        "EPOD": "2021-06-30",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 9900.0,
        "WholesalePriceLocal": 6000.0,
        "CurrentLCSellingPrice": 11000.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": null,
        "PriceElasticitySC": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "DH2728-091",
        "Comment": null,
        "Description": "M NIKE SUPERREP GO 2 MFS",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "DH2728",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 37.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 37.0,
        "1083_Contracts": 0.0,
        "NSO_Contracts": 99.0,
        "WholesaleContract": 185.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 0.0,
        "DOMsInventory": null,
        "DOMsNDDCInventory": null,
        "DOMsZOZOInventory": null,
        "DOMsNSOInventory": null,
        "DOMsNFSInventory": null,
        "DOMsEMPInventory": null,
        "DOMsGAInventory": null,
        "SizeCountOwned": 12.0,
        "SizeCountTotal": 12.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 0.0,
        "MarketPlaceWOH": null,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": null,
        "NetUnitsFourWkAvg": null,
        "NetUnitsFourWkRolling": null,
        "NetUnitsMTD": null,
        "NetUnitsSTD": null,
        "NetSalesLW": null,
        "NetSalesFourWkAvg": null,
        "NetSalesFourWkRolling": null,
        "NetSalesMTD": null,
        "NetSalesSTD": null,
        "NetAURLW": null,
        "NetAURFourWeekAvg": null,
        "NetSalesLWUSD": null,
        "NetSalesFourWeekAvgUSD": null,
        "NetSalesFourWeekRollingUSD": null,
        "NetSalesMTDUSD": null,
        "NetSalesSTDUSD": null,
        "NetAURLWUSD": null,
        "NetAURFourWeekAvgUSD": null,
        "DemandUnitsLW": null,
        "DemandUnitsFourWeekAvg": null,
        "DemandUnitsFourWeekRolling": null,
        "DemandUnitsMTD": null,
        "DemandUnitsSTD": null,
        "DemandSalesLW": null,
        "DemandSalesFourWeekAvg": null,
        "DemandSalesFourWeekRolling": null,
        "DemandSalesMTD": null,
        "DemandSalesSTD": null,
        "DemandAURLW": null,
        "DemandAURFourWeekAvg": null,
        "DemandSalesLWUSD": null,
        "DemandSalesFourWeekAvgUSD": null,
        "DemandSalesFourWeekRollingUSD": null,
        "DemandSalesMTDUSD": null,
        "DemandSalesSTDUSD": null,
        "DemandAURLWUSD": null,
        "DemandAURFourWeekAvgUSD": null,
        "FirstOrderDate": null,
        "DaysOnSale": null,
        "WebTrafficLW": null,
        "WebConversionPct": null,
        "WebConversionFourWeekAvgCGD": null,
        "LastSeasonPlanned": "FA2021",
        "LastSeasonPlannedEndDate": "2021-10-02",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2021",
        "ClearanceSeasonEndDate": "2022-01-01",
        "Status": "INACTIVE",
        "EPOD": "2021-11-30",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 9900.0,
        "WholesalePriceLocal": 6000.0,
        "CurrentLCSellingPrice": 11000.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": null,
        "PriceElasticitySC": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "DH7914-091",
        "Comment": null,
        "Description": "M AIR ZOOM SUPERREP 2 MFS",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "DH7914",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 130.0,
        "UnassignedZerotoThirtyDaysOut": 0.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 130.0,
        "1083_Contracts": 0.0,
        "NSO_Contracts": 99.0,
        "WholesaleContract": 85.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 0.0,
        "DOMsInventory": null,
        "DOMsNDDCInventory": null,
        "DOMsZOZOInventory": null,
        "DOMsNSOInventory": null,
        "DOMsNFSInventory": null,
        "DOMsEMPInventory": null,
        "DOMsGAInventory": null,
        "SizeCountOwned": 12.0,
        "SizeCountTotal": 12.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 0.0,
        "MarketPlaceWOH": null,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": null,
        "NetUnitsFourWkAvg": null,
        "NetUnitsFourWkRolling": null,
        "NetUnitsMTD": null,
        "NetUnitsSTD": null,
        "NetSalesLW": null,
        "NetSalesFourWkAvg": null,
        "NetSalesFourWkRolling": null,
        "NetSalesMTD": null,
        "NetSalesSTD": null,
        "NetAURLW": null,
        "NetAURFourWeekAvg": null,
        "NetSalesLWUSD": null,
        "NetSalesFourWeekAvgUSD": null,
        "NetSalesFourWeekRollingUSD": null,
        "NetSalesMTDUSD": null,
        "NetSalesSTDUSD": null,
        "NetAURLWUSD": null,
        "NetAURFourWeekAvgUSD": null,
        "DemandUnitsLW": null,
        "DemandUnitsFourWeekAvg": null,
        "DemandUnitsFourWeekRolling": null,
        "DemandUnitsMTD": null,
        "DemandUnitsSTD": null,
        "DemandSalesLW": null,
        "DemandSalesFourWeekAvg": null,
        "DemandSalesFourWeekRolling": null,
        "DemandSalesMTD": null,
        "DemandSalesSTD": null,
        "DemandAURLW": null,
        "DemandAURFourWeekAvg": null,
        "DemandSalesLWUSD": null,
        "DemandSalesFourWeekAvgUSD": null,
        "DemandSalesFourWeekRollingUSD": null,
        "DemandSalesMTDUSD": null,
        "DemandSalesSTDUSD": null,
        "DemandAURLWUSD": null,
        "DemandAURFourWeekAvgUSD": null,
        "FirstOrderDate": null,
        "DaysOnSale": null,
        "WebTrafficLW": null,
        "WebConversionPct": null,
        "WebConversionFourWeekAvgCGD": null,
        "LastSeasonPlanned": "FA2021",
        "LastSeasonPlannedEndDate": "2021-10-02",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "HO2021",
        "ClearanceSeasonEndDate": "2022-01-01",
        "Status": "INACTIVE",
        "EPOD": "2021-11-30",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 11880.0,
        "WholesalePriceLocal": 7200.0,
        "CurrentLCSellingPrice": 13200.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": null,
        "PriceElasticitySC": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }, {
        "StyleColor": "DJ3016-016",
        "Comment": null,
        "Description": "NIKE AIR ZOOM SUPERREP 2 MEN'S HIIT CLASS SHOE",
        "SlimLifecycleSeason": "In Season",
        "RecommendedAction": "NO ACTION",
        "SelectedRecommendedActionOverride": null,
        "RecommendedActionOverride": "EXCLUDE,MARKDOWN",
        "ToolTipValue": "No Action Recommended This Week",
        "RetailWeek": "SP2021WK8",
        "CurrentSeason": "SP2021",
        "Style": "DJ3016",
        "Category": "Athletic Training",
        "SubCategory": "MENS TRAINING",
        "Division": "Footwear",
        "Gender": "Mens",
        "CGD": "Athletic Training-Mens-Footwear",
        "Franchise": "SUPERREP",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "License": "NO",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "Silhouette": "LOW TOP",
        "NikeIDIND": "N",
        "Contracts": 479.0,
        "UnassignedZerotoThirtyDaysOut": 311.0,
        "UnassignedThirtyonetoSixtyDaysOut": 168.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1084_Contracts": 0.0,
        "NSO_Contracts": 290.0,
        "WholesaleContract": 528.0,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1084": 0.0,
        "DOMsInventory": null,
        "DOMsNDDCInventory": null,
        "DOMsZOZOInventory": null,
        "DOMsNSOInventory": null,
        "DOMsNFSInventory": null,
        "DOMsEMPInventory": null,
        "DOMsGAInventory": null,
        "SizeCountOwned": 14.0,
        "SizeCountTotal": 14.0,
        "SizeIntegrity": 100.0,
        "ChannelWOH": 0.0,
        "MarketPlaceWOH": null,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": null,
        "NetUnitsFourWkAvg": null,
        "NetUnitsFourWkRolling": null,
        "NetUnitsMTD": null,
        "NetUnitsSTD": null,
        "NetSalesLW": null,
        "NetSalesFourWkAvg": null,
        "NetSalesFourWkRolling": null,
        "NetSalesMTD": null,
        "NetSalesSTD": null,
        "NetAURLW": null,
        "NetAURFourWeekAvg": null,
        "NetSalesLWUSD": null,
        "NetSalesFourWeekAvgUSD": null,
        "NetSalesFourWeekRollingUSD": null,
        "NetSalesMTDUSD": null,
        "NetSalesSTDUSD": null,
        "NetAURLWUSD": null,
        "NetAURFourWeekAvgUSD": null,
        "DemandUnitsLW": null,
        "DemandUnitsFourWeekAvg": null,
        "DemandUnitsFourWeekRolling": null,
        "DemandUnitsMTD": null,
        "DemandUnitsSTD": null,
        "DemandSalesLW": null,
        "DemandSalesFourWeekAvg": null,
        "DemandSalesFourWeekRolling": null,
        "DemandSalesMTD": null,
        "DemandSalesSTD": null,
        "DemandAURLW": null,
        "DemandAURFourWeekAvg": null,
        "DemandSalesLWUSD": null,
        "DemandSalesFourWeekAvgUSD": null,
        "DemandSalesFourWeekRollingUSD": null,
        "DemandSalesMTDUSD": null,
        "DemandSalesSTDUSD": null,
        "DemandAURLWUSD": null,
        "DemandAURFourWeekAvgUSD": null,
        "FirstOrderDate": null,
        "DaysOnSale": null,
        "WebTrafficLW": null,
        "WebConversionPct": null,
        "WebConversionFourWeekAvgCGD": null,
        "LastSeasonPlanned": "SU2021",
        "LastSeasonPlannedEndDate": "2021-07-03",
        "InLastFPPlannedSeason": "NO",
        "ClearanceSeason": "FA2021",
        "ClearanceSeasonEndDate": "2021-10-02",
        "Status": "INACTIVE",
        "EPOD": "2021-06-30",
        "LaunchTier": "NO",
        "LOB": "Base Inline",
        "MSRP": 11880.0,
        "WholesalePriceLocal": 7200.0,
        "CurrentLCSellingPrice": 13200.0,
        "TotalDiscount": -0.11,
        "LastMDDate": null,
        "MDCount": 0,
        "ContributionMargin": null,
        "PriceElasticitySC": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }]
      );
      setStatus('error');
      setMessage('Error in loading the table data');
      console.log(err);
    });
  }

  function cancelTableApiService(requestDataForTable) {
    cancelTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Cancel data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no Cancel recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function closeOutTableApiService(requestDataForTable) {
    closeOutTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Close Out data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no Close Out recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function cmReviewTableApiService(requestDataForTable) {
    cmReviewTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('CM Review data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no CM Review recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function chaseTableApiService(requestDataForTable) {
    chaseTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Chase data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no Chase recommendations for the selected filters. Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function exceptionTableApiService(requestDataForTable) {
    exceptionTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Exception data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no Exception recommendations for the selected filters. Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function excludeTableApiService(requestDataForTable) {
    excludeTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Exclude data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no Exclude recommendations for the selected filters. Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function markdownTableApiService(requestDataForTable) {
    markdownTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Markdown data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no Markdown recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function releaseTableApiService(requestDataForTable) {
    releaseTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Release data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no Release recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function improveConvTrafficApiService(requestDataForTable) {
    improveConversionTraficService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
      console.log(err);
    });
  }

  function crossChannelApiService(requestDataForTable) {
    crossChannelTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('X-channel data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no X-channel recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data, Please contact the support');
      console.log(err);
    });
  }

  function improveConvTrafficApiService(requestDataForTable) {
    improveConversionTraficService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('There are no recommendations for the selected filters.  Please choose another table');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
      console.log(err);
    });
  }

  const closeLoginDialog = () => setOpenLogin(false);

  return (
    <React.Fragment>
      {status ? <CustomSnackbar key={status.date} status={status.msg} msg={message} /> : null}
      {openLogin ? <LoginModal openLoginDialog={openLogin} closeLoginDialog={closeLoginDialog} /> : null}
      <section>
        <MenuAppBar authentication={userInfo} />
      </section>
      <RowDetailsContext.Provider value={{ rowDetailValue, setRowDetailValue }}>
        <SaveBtnContext.Provider value={{ categoryBarLoading, setCategoryBarLoading, saveBtnDisable, setSaveBtnDisable }} >
          <SelectedChannelContext.Provider value={{ selectedChannel, setSelectedChannel, selectedMarketPlace, setSelectedMarketPlace }}>
            <section>
              <div className="category-bar-wrapper">
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={0} className={classes.backgroudTransperancy}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: '#fa8231' }} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className='accordionSummary'
                  >

                  </AccordionSummary>
                  <AccordionDetails className='accordion-pad0'>
                    <CategoryBar
                      auth={authorisationApi}
                      data={categoryApi}
                      isLoading={loading}
                      onCatergorySubmit={onCatergorySubmit}
                      OnTableRowSave={onTableRowSave}
                      onExportToExcel={onExportToExcel}
                    />
                  </AccordionDetails>
                </Accordion>
              </div>
              {categoryBarLoading ? <LinearProgress color="secondary" /> : null}
            </section>

            <main className="container-fluid">
              <div className="table-wrapper">
                <Switch>
                  <Route exact path="/"></Route>
                  <Route path="/login/callback" component={LoginCallback} />
                  <Route exact path="/action">
                    {isTableLoading ?
                      <div className={classes.root}>
                        <CircularProgress color="secondary" />
                      </div> :
                      <ActionTable rowData={rowData} onGridReady={onGridReady} gridColumnApi={gridColumnApi} tableLoading={isActionTableLoading} gridApi={gridApi} />}
                  </Route>
                  <Route exact path="/allaction">
                    {isTableLoading ?
                      <div className={classes.root}>
                        <CircularProgress color="secondary" />
                      </div> :
                      <ActionTable rowData={rowData} onGridReady={onGridReady} gridColumnApi={gridColumnApi} tableLoading={isActionTableLoading} gridApi={gridApi} />}
                  </Route>
                  <Route exact path="/cancel">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <CancelTable rowData={rowData} onGridReady={onGridReady} />}</Route>
                  <Route exact path="/closeout+cancel">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <CloseOutTable rowData={rowData} onGridReady={onGridReady} />}</Route>
                  <Route exact path="/cmreview">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <CmReviewTable rowData={rowData} onGridReady={onGridReady} />}</Route>
                  <Route exact path="/chase">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <ChaseTable rowData={rowData} onGridReady={onGridReady} />}</Route>
                  <Route exact path="/improveconversion">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <ImproveConversionTable rowData={rowData} onGridReady={onGridReady} />}</Route>
                  <Route exact path="/improvetraffic">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <ImproveTrafficTable rowData={rowData} onGridReady={onGridReady} />}</Route>
                  <Route exact path="/exclude">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <ExcludeTable rowData={rowData} onGridReady={onGridReady} />}</Route>
                  <Route exact path="/markdown">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <MarkdownTable rowData={rowData} onGridReady={onGridReady} />}</Route>
                  <Route exact path="/exception">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <ExceptionTable rowData={rowData} onGridReady={onGridReady} gridApi={gridApi} />}</Route>
                  <Route exact path="/release">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <ReleaseTable rowData={rowData} onGridReady={onGridReady} gridApi={gridApi} />}</Route>
                  <Route exact path="/x-channel">{isTableLoading ?
                    <div className={classes.root}>
                      <CircularProgress color="secondary" />
                    </div> :
                    <CrossChannelTable rowData={rowData} onGridReady={onGridReady} gridApi={gridApi} />}</Route>
                  <SecureRoute exact path="/profile" component={Profile} />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </div>
            </main>
          </SelectedChannelContext.Provider >
        </SaveBtnContext.Provider >
      </RowDetailsContext.Provider >
    </React.Fragment >
  );
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default App;