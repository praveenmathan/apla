import './App.css';
import React, { useState, useEffect } from 'react';
import MenuAppBar from '../navigation/navigation';
import CategoryBar from '../category/categoryBar';
import authorisationAPI from '../services/authorisationAPI';
import categoryService from '../services/categoryService';
import actionTableService from '../services/actionTableService';
import { Route, useHistory, Switch } from "react-router-dom";
import ActionTable from "../table/actionTable";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import CustomSnackbar from '../utilities/customSnackBar';
import NotFound from '../utilities/notFoundPage';

/* eslint-disable */
const Category = () => (
  <div>
    <h2>Cancel Table</h2>
  </div>
);

const Products = () => (
  <div>
    <h2>Closeout Table</h2>
  </div>
);

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
        setCategoryApi(data);
        setLoading(true);
      }
    }).catch((err) => {
      setCategoryApi({

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

      });
      console.log(err);
      setLoading(true);
    });
  }

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  function onCatergorySubmit(newValue) {
    let navigationTextLwr = newValue.action.toLowerCase();
    let navigationTextTrim = navigationTextLwr.replaceAll(' ', '');
    history.push(`${navigationTextTrim}`);

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

    console.log('request data', requestDataForTable);
    /* testing AG grid - for now */
    getTableAPI(requestDataForTable);
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
          console.log('selected channel value', newValue.channel);
          console.log('listed channel value', eachUser.channels);
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
              if (newValue.category === eachCategory.categoryDescription) {
                categoryarray.push({
                  "categoryDescription": eachCategory.categoryDescription
                })
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
    actionTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        setIsTableLoading(false);
        const { data } = response;
        if (data.inventoryDetails.length != 0) {
          setRowData(data.inventoryDetails);
          setStatus('success');
          setMessage('Table data are loaded');
        } else {
          setStatus('error');
          setMessage('Table is empty, Please contact the support');
        }
      }
    }).catch((err) => {
      setIsTableLoading(false);
      setRowData([
        {
          "styleColor": "AQ2210-006",
          "comment": null,
          "description": "NIKE AIR ZOOM PEGASUS 36 WOMEN'S RUNNING SHOE",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": "Porsche,Toyota,Ford,AAA,BBB,CCC",
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "AQ2210",
          "CATEGORY": "RUNNING",
          "subCategory": "RUNNING",
          "division": "Footwear",
          "gender": "WOMENS",
          "rpt": "Running-Womens-Footwear",
          "franchise": null,
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": null,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 30,
          "oneZeroEightThreeContracts": 10,
          "oneZeroEightFourContracts": 20,
          "oneZeroEightFiveContracts": 30,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": 1,
          "gaOneZeroEightFour": 2,
          "gaOneZeroEightFive": 3,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": 150,
          "totalDiscount": 10,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "CT2301-001",
          "comment": null,
          "description": "AIR FORCE 1 '07 LV8 EMB",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "CT2301",
          "CATEGORY": "Sportswear",
          "subCategory": "NSW BASKETBALL",
          "division": "Footwear",
          "gender": "Male",
          "rpt": "Sportswear-Male-Footwear",
          "franchise": "AIR FORCE 1",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 303,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 303,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "CW5836-010",
          "comment": null,
          "description": "AS M NSW WORLDWIDE GLOBE SSTEE",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "CW5836",
          "CATEGORY": "Sportswear",
          "subCategory": "COE GRAPHIC APPAREL",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Sportswear-Male-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 300,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 0,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "DD5661-010",
          "comment": null,
          "description": "NIKE SPORTSWEAR TECH FLEECE MEN'S JOGGERS",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "DD5661",
          "CATEGORY": "Sportswear",
          "subCategory": "ICONS AND FRANCHISES",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Sportswear-Male-Apparel",
          "franchise": "TECH FLEECE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 865,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 86,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "BV6881-410",
          "comment": null,
          "description": "NIKE REPEL MEN'S WOVEN SOCCER JACKET",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "BV6881",
          "CATEGORY": "Global Football",
          "subCategory": "TEAMSPORT",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Global Football-Male-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 60,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 0,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "BV2667-657",
          "comment": null,
          "description": "AS M NSW CLUB CRW FT",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "BV2667",
          "CATEGORY": "Sportswear",
          "subCategory": "COLLECTIONS",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Sportswear-Male-Apparel",
          "franchise": "CLUB FLEECE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 535,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 161,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "CV1932-084",
          "comment": null,
          "description": "AS M NK THROWBACK JACKET",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "CV1932",
          "CATEGORY": "Basketball",
          "subCategory": "PERFORMANCE",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Basketball-Male-Apparel",
          "franchise": "THROWBACK",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 91,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 0,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "913011-382",
          "comment": null,
          "description": "NIKE SPORTSWEAR HERITAGE86 FUTURA WASHED HAT",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "913011",
          "CATEGORY": "Sportswear",
          "subCategory": "COE HEADWEAR",
          "division": "Apparel",
          "gender": "Unisex",
          "rpt": "Sportswear-Unisex-Apparel",
          "franchise": "HERITAGE86",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 39,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 39,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "CV2368-403",
          "comment": null,
          "description": "JORDAN FLIGHT FLEECE MEN'S GRAPHIC PULLOVER HOODIE",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "CV2368",
          "CATEGORY": "Jordan",
          "subCategory": "JORDAN SPINE",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Jordan-Male-Apparel",
          "franchise": "Unknown",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 189,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 0,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "DC5281-394",
          "comment": null,
          "description": "NIKE SPORTSWEAR NSW WOMEN'S HOODIE",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "DC5281",
          "CATEGORY": "Sportswear",
          "subCategory": "ICONS AND FRANCHISES",
          "division": "Apparel",
          "gender": "Female",
          "rpt": "Sportswear-Female-Apparel",
          "franchise": "Unknown",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 362,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 108,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "DB3194-100",
          "comment": null,
          "description": "AS M NSW TEE PREMIUM ESSENTIAL",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "DB3194",
          "CATEGORY": "Sportswear",
          "subCategory": "COE GRAPHIC APPAREL",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Sportswear-Male-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 399,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 399,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "831433-100",
          "comment": null,
          "description": "AS TRANSPARENT SS JKT",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "831433",
          "CATEGORY": "Golf",
          "subCategory": "WOMENS GOLF APPAREL",
          "division": "Apparel",
          "gender": "Female",
          "rpt": "Golf-Female-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 4,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 0,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "CU6169-010",
          "comment": null,
          "description": "AS W NK RUN DVN HOLOKNIT MID",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "CU6169",
          "CATEGORY": "Running",
          "subCategory": "FUNDAMENTALS",
          "division": "Apparel",
          "gender": "Female",
          "rpt": "Running-Female-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 13,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 0,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "CI0919-100",
          "comment": null,
          "description": "NIKE AIR FORCE 1 SHADOW WOMEN'S SHOE",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "CI0919",
          "CATEGORY": "Sportswear",
          "subCategory": "NSW BASKETBALL",
          "division": "Footwear",
          "gender": "Female",
          "rpt": "Sportswear-Female-Footwear",
          "franchise": "AIR FORCE 1",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 5235,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 2600,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "CU3596-014",
          "comment": null,
          "description": "AS M NSW TCH PCK PANT ENG",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "CU3596",
          "CATEGORY": "Sportswear",
          "subCategory": "ICONS AND FRANCHISES",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Sportswear-Male-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 200,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 60,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "DB6189-010",
          "comment": null,
          "description": "NIKE SPORTSWEAR MEN'S LONG-SLEEVE T-SHIRT",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "DB6189",
          "CATEGORY": "Sportswear",
          "subCategory": "COE GRAPHIC APPAREL",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Sportswear-Male-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 778,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 77,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "DD1473-100",
          "comment": null,
          "description": "AS W NSW TEE BOY NATURE",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "DD1473",
          "CATEGORY": "Sportswear",
          "subCategory": "COE GRAPHIC APPAREL",
          "division": "Apparel",
          "gender": "Female",
          "rpt": "Sportswear-Female-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 438,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 438,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "BV5589-100",
          "comment": null,
          "description": "AS M NP TOP LS TIGHT",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "BV5589",
          "CATEGORY": "Athletic Training",
          "subCategory": "NIKE PRO",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Athletic Training-Male-Apparel",
          "franchise": "365 COOL",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 60,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 60,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "CU5539-043",
          "comment": null,
          "description": "AS M NK RUN DVN MID WVN REPEL",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "CU5539",
          "CATEGORY": "Running",
          "subCategory": "FUNDAMENTALS",
          "division": "Apparel",
          "gender": "Male",
          "rpt": "Running-Male-Apparel",
          "franchise": "NO FRANCHISE",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 11,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 0,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "DD1391-001",
          "comment": null,
          "description": "NIKE DUNK LOW RETRO MEN'S SHOE",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "DD1391",
          "CATEGORY": "Sportswear",
          "subCategory": "NSW BASKETBALL",
          "division": "Footwear",
          "gender": "Male",
          "rpt": "Sportswear-Male-Footwear",
          "franchise": "DUNK",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 402,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 0,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        },
        {
          "styleColor": "BQ3207-104",
          "comment": null,
          "description": "NIKE REVOLUTION 5 WOMEN'S RUNNING SHOE",
          "slimLifecycleSeason": null,
          "recommendedAction": null,
          "recommendedActionOverride": null,
          "retailWeek": "HO20 WK10",
          "currentSeason": null,
          "style": "BQ3207",
          "CATEGORY": "Running",
          "subCategory": "WOMENS CORE RUNNING",
          "division": "Footwear",
          "gender": "Female",
          "rpt": "Running-Female-Footwear",
          "franchise": "REVOLUTION",
          "nikeLABIND": null,
          "nrgind": null,
          "league": null,
          "team": null,
          "athleteName": null,
          "merchClassification": null,
          "nikeIDIND": null,
          "contracts": 672,
          "unassignedZerotoThirtyDaysOut": null,
          "unassignedThirtyonetoSixtyDaysOut": null,
          "unassignedSixtyonePlusDaysOut": 454,
          "oneZeroEightThreeContracts": null,
          "oneZeroEightFourContracts": null,
          "oneZeroEightFiveContracts": null,
          "nsoContracts": null,
          "wholesaleContract": null,
          "storeIOH": null,
          "inTransit": null,
          "onOrder": null,
          "gaOneZeroEightThree": null,
          "gaOneZeroEightFour": null,
          "gaOneZeroEightFive": null,
          "sizeCountOwned": null,
          "sizeCountTotal": null,
          "sizeIntegrity": null,
          "slimWOS": null,
          "recommendedChaseUnits": null,
          "recommendedCancelUnits": null,
          "netUnitsLastWeek": null,
          "netUnitsFourWkAvg": null,
          "netUnitsFourWkRolling": null,
          "netUnitsMTD": null,
          "netUnitsSTD": null,
          "netSalesLW": null,
          "netSalesFourWkRolling": null,
          "netSalesFourWkAvg": null,
          "netSalesMTD": null,
          "netSalesSTD": null,
          "netAURLW": null,
          "netAURFourWeekAvg": null,
          "netSalesLWUSD": null,
          "netSalesFourWeekRollingUSD": null,
          "netSalesFourWeekAvgUSD": null,
          "netSalesMTDUSD": null,
          "netSalesSTDUSD": null,
          "netAURLWUSD": null,
          "netAURFourWeekAvgUSD": null,
          "demandUnitsLW": null,
          "demandUnitsFourWeekRolling": null,
          "demandUnitsFourWeekAvg": null,
          "demandUnitsMTD": null,
          "demandUnitsSTD": null,
          "demandSalesLW": null,
          "demandSalesFourWeekRolling": null,
          "demandSalesFourWeekAvg": null,
          "demandSalesMTD": null,
          "demandSalesSTD": null,
          "demandAURLW": null,
          "demandAURFourWeekAvg": null,
          "demandSalesLWUSD": null,
          "demandSalesFourWeekRollingUSD": null,
          "demandSalesFourWeekAvgUSD": null,
          "demandSalesMTDUSD": null,
          "demandSalesSTDUSD": null,
          "demandAURLWUSD": null,
          "demandAURFourWeekAvgUSD": null,
          "FIRST ORDER DATE": null,
          "daysOnSale": null,
          "webConversionPct": null,
          "webConversionFourWeekAvgRPT": null,
          "lastSeasonPlanned": null,
          "lastSeasonPlannedEndDate": null,
          "inLastFPPlannedSeason": null,
          "clearanceSeason": null,
          "clearanceSeasonEndDate": null,
          "status": null,
          "epod": null,
          "launchTier": null,
          "msrp": null,
          "wholesalePriceLocal": null,
          "currentSellingPrice": null,
          "totalDiscount": null,
          "lastMDDate": null,
          "mdCount": null,
          "contributionMargin": null,
          "priceElasticitySC": null,
          "priceElasticityRPT": null,
          "priceElasticityConfidence": null,
          "recommendedMarkPCTElasticity": null,
          "recommendedMarkPRCElasticity": null,
          "totalDiscountAfterMarkElasticity": null,
          "recommendedMarkPCTInterval": null,
          "recommendedMarkPRCInterval": null,
          "totalDiscountAfterMarkInterval": null
        }
      ]);
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
            <Route exact path="/cancel"><Category /></Route>
            <Route exact path="/closeout"><Products /></Route>
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;