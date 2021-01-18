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
import CommonTable from '../table/commonTable';
import CancelTable from '../table/cancelTable';
import ChaseTable from '../table/chaseTable';

/* eslint-disable */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
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
  const [status, setStatusBase] = React.useState("");
  const [message, setMessageBase] = React.useState("");
  const setStatus = msg => setStatusBase({ msg, date: new Date() });
  const setMessage = msg => setMessageBase(msg);

  useEffect(() => {
    /* Get CUP roles, Marketplace and Channel details  */
    let requestData = {
      query: { userName: "NIKE:SUppoo" },
      accessToken: '',
    };
    authorisationAPI.postData(requestData).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        setAuthorisationApi(data);
        getCategoryAPI();
      }
    }).catch((err) => {
      setAuthorisationApi({
        "returnCode": 0,

        "returnMessage": "Success",

        "userName": "NIKE\\SUppoo",

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

          }

        ]

      });
      getCategoryAPI();
      console.log(err);
    });
  }, []);

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

            }

          ]

        }
      };
      const formattedData = getFormattedCategoryApi(data);
      setCategoryApi(data);
      console.log(err);
      setLoading(true);
    });
  }

  function getFormattedCategoryApi(data) {
    let formattedData = { ...data };
    const table = formattedData.selectionFilters.table.map(eachTable => {
      eachTable.tableDescription.toLowerCase().capitalize();
    });
    return formattedData;
  }

  function onGridReady(params) {
    const newColumns = params.api.getColumnDefs();
    newColumns.forEach((newColumn, index) => {
      if (newColumn.headerName === 'Inventory') {
        newColumn.children.push({
          "width": 150,
          "sortable": true,
          "resizable": true,
          "filter": true,
          "field": "NddcContract",
          "colId": "NddcContract",
          "rowGroup": false,
          "rowGroupIndex": null,
          "pivot": false,
          "pivotIndex": null,
          "aggFunc": null,
          "pinned": null,
          "sort": null,
          "sortIndex": null
        })
      }
    });

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
          if (eachfilters === 'retailWeek') {
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
          if (eachfilters === 'category') {
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
          if (eachfilters === 'gender') {
            selectionFilters[eachfilters].map(eachGender => {
              if (newValue.gender === eachGender.genderDescription) {
                genderarray.push({
                  "genderDescription": eachGender.genderDescription
                })
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
          if (eachfilters === 'division') {
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
          if (eachfilters === 'table') {
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

  function getTableAPI(requestDataForTable) {
    setIsTableLoading(true);
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
    if (actionText === 'closeout') {
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
  }

  function actionTableApiService(requestDataForTable) {
    actionTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.InventoryDetails.length != 0) {
          setRowData(data.InventoryDetails);
          setStatus('success');
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setRowData([{
        "StyleColor": "315122-001",
        "Comment": null,
        "Description": "NIKE AIR FORCE 1 '07 MEN'S SHOE",
        "SlimLifecycleSeason": "Post Season",
        "RecommendedAction": "NO ACTION",
        "RecommendedActionOverride": null,
        "RetailWeek": "HO2020WK13",
        "CurrentSeason": "HO2020",
        "Style": "315122",
        "Category": "Sportswear",
        "SubCategory": "NSW BASKETBALL",
        "Division": "Footwear",
        "Gender": "Mens",
        "RPT": "Sportswear-Mens-Footwear",
        "Franchise": "AIR FORCE 1",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "NikeIDIND": "N",
        "Contracts": 29.0,
        "UnassignedZerotoThirtyDaysOut": 29.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1084_Contracts": 0.0,
        "NSO_Contracts": 1.0,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1084": 0.0,
        "SizeCountOwned": 6.0,
        "SizeCountTotal": 16.0,
        "SizeIntegrity": 37.5,
        "SlimWOS": 22.3,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 2.0,
        "NetUnitsFourWkAvg": 0.5,
        "NetUnitsFourWkRolling": 2.0,
        "NetUnitsMTD": 2.0,
        "NetUnitsSTD": 1203.0,
        "NetSalesLW": 145.5,
        "NetSalesFourWkAvg": 24.5,
        "NetSalesFourWkRolling": 98.2,
        "NetSalesMTD": 98.2,
        "NetSalesSTD": 103633.5,
        "NetAURLW": 72.7,
        "NetAURFourWeekAvg": 49.1,
        "NetSalesLWUSD": 145.5,
        "NetSalesFourWeekAvgUSD": 24.5,
        "NetSalesFourWeekRollingUSD": 98.2,
        "NetSalesMTDUSD": 98.2,
        "NetSalesSTDUSD": 103633.5,
        "NetAURLWUSD": 72.7,
        "NetAURFourWeekAvgUSD": 49.1,
        "DemandUnitsLW": 2.0,
        "DemandUnitsFourWeekAvg": 1.3,
        "DemandUnitsFourWeekRolling": 5.0,
        "DemandUnitsMTD": 0.0,
        "DemandUnitsSTD": 1501.0,
        "DemandSalesLW": 22000.0,
        "DemandSalesFourWeekAvg": 13750.0,
        "DemandSalesFourWeekRolling": 55000.0,
        "DemandSalesMTD": 0.0,
        "DemandSalesSTD": 16511000.0,
        "DemandAURLW": 11000.0,
        "DemandAURFourWeekAvg": 11000.0,
        "DemandSalesLWUSD": 200.0,
        "DemandSalesFourWeekAvgUSD": 125.0,
        "DemandSalesFourWeekRollingUSD": 500.0,
        "DemandSalesMTDUSD": 0.0,
        "DemandSalesSTDUSD": 150099.8,
        "DemandAURLWUSD": 100.0,
        "DemandAURFourWeekAvgUSD": 100.0,
        "FirstOrderDate": "2020-07-02T00:00:00",
        "DaysOnSale": 184,
        "WebConversionPct": 1.2,
        "WebConversionFourWeekAvgRPT": 1.1,
        "LastSeasonPlanned": "HO2020",
        "LastSeasonPlannedEndDate": "2021-01-02T00:00:00",
        "InLastFPPlannedSeason": "YES",
        "ClearanceSeason": "SP2021",
        "ClearanceSeasonEndDate": "2021-04-03T00:00:00",
        "Status": "ACTIVE",
        "EPOD": "2021-03-31T00:00:00",
        "LaunchTier": "NO",
        "MSRP": 11000.0,
        "WholesalePriceLocal": 6000.0,
        "CurrentSellingPrice": 11000.0,
        "TotalDiscount": 0.0,
        "LastMDDate": null,
        "MDCount": null,
        "ContributionMargin": 0.5,
        "PriceElasticitySC": null,
        "PriceElasticityRPT": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      },
      {
        "StyleColor": "315122-111",
        "Comment": null,
        "Description": "NIKE AIR FORCE 1 '07 MEN'S SHOE",
        "SlimLifecycleSeason": "Post Season",
        "RecommendedAction": "NO ACTION",
        "RecommendedActionOverride": null,
        "RetailWeek": "HO2020WK13",
        "CurrentSeason": "HO2020",
        "Style": "315122",
        "Category": "Sportswear",
        "SubCategory": "NSW BASKETBALL",
        "Division": "Footwear",
        "Gender": "Mens",
        "RPT": "Sportswear-Mens-Footwear",
        "Franchise": "AIR FORCE 1",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "NikeIDIND": "N",
        "Contracts": 82.0,
        "UnassignedZerotoThirtyDaysOut": 15.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 62.0,
        "1084_Contracts": 1.0,
        "1085_Contracts": 4.0,
        "NSO_Contracts": 52.0,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 19.0,
        "GA_1084": 0.0,
        "GA_1085": 112.0,
        "SizeCountOwned": 10.0,
        "SizeCountTotal": 17.0,
        "SizeIntegrity": 58.8,
        "SlimWOS": 7.1,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 4.0,
        "NetUnitsFourWkAvg": 5.5,
        "NetUnitsFourWkRolling": 22.0,
        "NetUnitsMTD": 52.0,
        "NetUnitsSTD": 2897.0,
        "NetSalesLW": 327.3,
        "NetSalesFourWkAvg": 472.7,
        "NetSalesFourWkRolling": 1890.9,
        "NetSalesMTD": 4527.3,
        "NetSalesSTD": 250935.1,
        "NetAURLW": 81.8,
        "NetAURFourWeekAvg": 86.0,
        "NetSalesLWUSD": 327.3,
        "NetSalesFourWeekAvgUSD": 472.7,
        "NetSalesFourWeekRollingUSD": 1890.9,
        "NetSalesMTDUSD": 4527.3,
        "NetSalesSTDUSD": 250935.1,
        "NetAURLWUSD": 81.8,
        "NetAURFourWeekAvgUSD": 86.0,
        "DemandUnitsLW": 7.0,
        "DemandUnitsFourWeekAvg": 11.5,
        "DemandUnitsFourWeekRolling": 46.0,
        "DemandUnitsMTD": 31.0,
        "DemandUnitsSTD": 3258.0,
        "DemandSalesLW": 77000.0,
        "DemandSalesFourWeekAvg": 126500.0,
        "DemandSalesFourWeekRolling": 506000.0,
        "DemandSalesMTD": 341000.0,
        "DemandSalesSTD": 35838000.0,
        "DemandAURLW": 11000.0,
        "DemandAURFourWeekAvg": 11000.0,
        "DemandSalesLWUSD": 700.0,
        "DemandSalesFourWeekAvgUSD": 1150.0,
        "DemandSalesFourWeekRollingUSD": 4600.0,
        "DemandSalesMTDUSD": 3100.0,
        "DemandSalesSTDUSD": 325799.7,
        "DemandAURLWUSD": 100.0,
        "DemandAURFourWeekAvgUSD": 100.0,
        "FirstOrderDate": "2020-07-16T00:00:00",
        "DaysOnSale": 170,
        "WebConversionPct": 2.2,
        "WebConversionFourWeekAvgRPT": 1.1,
        "LastSeasonPlanned": "HO2020",
        "LastSeasonPlannedEndDate": "2021-01-02T00:00:00",
        "InLastFPPlannedSeason": "YES",
        "ClearanceSeason": "SP2021",
        "ClearanceSeasonEndDate": "2021-04-03T00:00:00",
        "Status": "ACTIVE",
        "EPOD": "2021-03-31T00:00:00",
        "LaunchTier": "NO",
        "MSRP": 11000.0,
        "WholesalePriceLocal": 6000.0,
        "CurrentSellingPrice": 11000.0,
        "TotalDiscount": 0.0,
        "LastMDDate": null,
        "MDCount": null,
        "ContributionMargin": 0.5,
        "PriceElasticitySC": null,
        "PriceElasticityRPT": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      },
      {
        "StyleColor": "315123-001",
        "Comment": null,
        "Description": "NIKE AIR FORCE 1 MID '07 MEN'S SHOE",
        "SlimLifecycleSeason": "Post Season",
        "RecommendedAction": "NO ACTION",
        "RecommendedActionOverride": null,
        "RetailWeek": "HO2020WK13",
        "CurrentSeason": "HO2020",
        "Style": "315123",
        "Category": "Sportswear",
        "SubCategory": "NSW BASKETBALL",
        "Division": "Footwear",
        "Gender": "Mens",
        "RPT": "Sportswear-Mens-Footwear",
        "Franchise": "AIR FORCE 1",
        "NikeLABIND": "N",
        "NRGIND": "N",
        "League": null,
        "Team": null,
        "AthleteName": null,
        "MerchClassification": "Unknown",
        "NikeIDIND": "N",
        "Contracts": 131.0,
        "UnassignedZerotoThirtyDaysOut": 13.0,
        "UnassignedThirtyonetoSixtyDaysOut": 0.0,
        "UnassignedSixtyonePlusDaysOut": 0.0,
        "1083_Contracts": 32.0,
        "1084_Contracts": 78.0,
        "1085_Contracts": 8.0,
        "NSO_Contracts": 1.0,
        "WholesaleContract": null,
        "StoreIOH": 0.0,
        "InTransit": 0.0,
        "OnOrder": 0.0,
        "GA_1083": 9.0,
        "GA_1084": 0.0,
        "GA_1085": 89.0,
        "SizeCountOwned": 8.0,
        "SizeCountTotal": 16.0,
        "SizeIntegrity": 50.0,
        "SlimWOS": 3.9,
        "RecommendedChaseUnits": null,
        "RecommendedCancelUnits": null,
        "NetUnitsLastWeek": 15.0,
        "NetUnitsFourWkAvg": 26.0,
        "NetUnitsFourWkRolling": 104.0,
        "NetUnitsMTD": 126.0,
        "NetUnitsSTD": 327.0,
        "NetSalesLW": 1340.0,
        "NetSalesFourWkAvg": 2422.5,
        "NetSalesFourWkRolling": 9690.0,
        "NetSalesMTD": 11700.0,
        "NetSalesSTD": 30830.0,
        "NetAURLW": 89.3,
        "NetAURFourWeekAvg": 93.2,
        "NetSalesLWUSD": 1340.0,
        "NetSalesFourWeekAvgUSD": 2422.5,
        "NetSalesFourWeekRollingUSD": 9690.0,
        "NetSalesMTDUSD": 11700.0,
        "NetSalesSTDUSD": 30830.0,
        "NetAURLWUSD": 89.3,
        "NetAURFourWeekAvgUSD": 93.2,
        "DemandUnitsLW": 30.0,
        "DemandUnitsFourWeekAvg": 33.8,
        "DemandUnitsFourWeekRolling": 135.0,
        "DemandUnitsMTD": 36.0,
        "DemandUnitsSTD": 379.0,
        "DemandSalesLW": 363000.0,
        "DemandSalesFourWeekAvg": 408375.0,
        "DemandSalesFourWeekRolling": 1633500.0,
        "DemandSalesMTD": 435600.0,
        "DemandSalesSTD": 4585900.0,
        "DemandAURLW": 12100.0,
        "DemandAURFourWeekAvg": 12100.0,
        "DemandSalesLWUSD": 3300.0,
        "DemandSalesFourWeekAvgUSD": 3712.5,
        "DemandSalesFourWeekRollingUSD": 14850.0,
        "DemandSalesMTDUSD": 3960.0,
        "DemandSalesSTDUSD": 41690.0,
        "DemandAURLWUSD": 110.0,
        "DemandAURFourWeekAvgUSD": 110.0,
        "FirstOrderDate": "2020-07-02T00:00:00",
        "DaysOnSale": 184,
        "WebConversionPct": 1.6,
        "WebConversionFourWeekAvgRPT": 1.1,
        "LastSeasonPlanned": "HO2020",
        "LastSeasonPlannedEndDate": "2021-01-02T00:00:00",
        "InLastFPPlannedSeason": "YES",
        "ClearanceSeason": "SP2021",
        "ClearanceSeasonEndDate": "2021-04-03T00:00:00",
        "Status": "ACTIVE",
        "EPOD": "2021-03-31T00:00:00",
        "LaunchTier": "NO",
        "MSRP": 12100.0,
        "WholesalePriceLocal": 6600.0,
        "CurrentSellingPrice": 12100.0,
        "TotalDiscount": 0.0,
        "LastMDDate": null,
        "MDCount": null,
        "ContributionMargin": 0.5,
        "PriceElasticitySC": null,
        "PriceElasticityRPT": null,
        "PriceElasticityConfidence": null,
        "RecommendedMarkPCTElasticity": null,
        "RecommendedMarkPRCElasticity": null,
        "TotalDiscountAfterMarkElasticity": null,
        "RecommendedMarkPCTInterval": null,
        "RecommendedMarkPRCInterval": null,
        "TotalDiscountAfterMarkInterval": null
      }]);
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
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
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
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
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
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
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
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
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
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
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
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
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
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
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
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setStatus('error');
      setMessage('Error in loading the table data');
      console.log(err);
    });
  }

  return (
    <React.Fragment>
      {status ? <CustomSnackbar key={status.date} status={status.msg} msg={message} /> : null}
      <section>
        <MenuAppBar auth={authorisationApi} />
      </section>

      <section>
        <div className="category-bar-wrapper">
          <CategoryBar auth={authorisationApi} data={categoryApi} isLoading={loading} onCatergorySubmit={onCatergorySubmit} />
        </div>
      </section>

      <main className="container-fluid">
        <div className="table-wrapper">
          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/action">
              {isTableLoading ?
                <div className={classes.root}>
                  <CircularProgress color="secondary" />
                </div> :
                <ActionTable rowData={rowData} onGridReady={onGridReady} />}
            </Route>
            <Route exact path="/allaction">
              {isTableLoading ?
                <div className={classes.root}>
                  <CircularProgress color="secondary" />
                </div> :
                <ActionTable rowData={rowData} onGridReady={onGridReady} />}
            </Route>
            <Route exact path="/cancel">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <CancelTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="/closeout">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <CommonTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="/cmreview">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <CommonTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="/chase">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <ChaseTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="/improveconversion">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <CommonTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="/improvetraffic">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <CommonTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="/exclude">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <CommonTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="/markdown">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <CommonTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="/exception">{isTableLoading ?
              <div className={classes.root}>
                <CircularProgress color="secondary" />
              </div> :
              <CommonTable rowData={rowData} onGridReady={onGridReady} />}</Route>
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
      </main>
    </React.Fragment>
  );
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default App;