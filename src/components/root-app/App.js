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