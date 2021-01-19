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
import CloseOutTable from '../table/closeOutTable';
import CmReviewTable from '../table/cmReviewTable';
import ExceptionTable from '../table/exceptionTable';
import ExcludeTable from '../table/exclude';
import ImproveConversionTable from '../table/improveConversionTable';
import ImproveTrafficTable from '../table/improveTrafficTable';
import MarkdownTable from '../table/markdownTable';

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
        setCategoryApi(formattedData);
        setLoading(true);
      }
    }).catch((err) => {
      console.log(err);
      setLoading(true);
    });
  }

  function stringCompare(a, b) {
    let comparison = 0;
    if (a.tableDescription > b.tableDescription) {
      comparison = 1;
    } else if (a.tableDescription < b.tableDescription) {
      comparison = -1;
    }
    return comparison;
  }

  function getFormattedCategoryApi(data) {
    let formattedData = { ...data };
    let capitalisedData = [];
    formattedData.selectionFilters.table.map(eachTable => {
      capitalisedData.push({ 'tableDescription': eachTable.tableDescription.toLowerCase().capitalize() });
    });

    let sortedCapitalisedData = capitalisedData.sort(stringCompare);
    formattedData.selectionFilters['formattedTableData'] = [...sortedCapitalisedData];
    return formattedData;
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
          setMessage('All Action data are loaded');
        } else {
          setStatus('error');
          setMessage('All Action is empty, Please contact the support');
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
          setMessage('Cancel data are loaded');
        } else {
          setStatus('error');
          setMessage('Cancel table is empty, Please contact the support');
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
          setMessage('Close Out is empty, Please contact the support');
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
          setMessage('CM Review table is empty, Please contact the support');
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
          setMessage('Chase table is empty, Please contact the support');
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
          setMessage('Exception table is empty, Please contact the support');
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
          setMessage('Exclude table is empty, Please contact the support');
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
          setMessage('Markdown table is empty, Please contact the support');
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