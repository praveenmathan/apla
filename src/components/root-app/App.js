import './App.css';
import React, { useState, useEffect } from 'react';
import MenuAppBar from '../navigation/navigation';
import CategoryBar from '../category/categoryBar';
import authorisationAPI from '../services/authorisationAPI';
import categoryService from '../services/categoryService';
import actionTableService from '../services/actionTableService';
import { Route, useHistory } from "react-router-dom";
import ActionTable from "../table/actionTable";

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

/**
 * Application Main Layout
 */
function App() {
  const [authorisationApi, setAuthorisationApi] = useState({});
  const [loading, setLoading] = useState(false);
  const [categoryApi, setCategoryApi] = useState({});
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const history = useHistory();

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
        setCategoryApi(data);
        setLoading(true);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  function onCatergorySubmit(newValue) {
    history.push(`${newValue.action}`);

    let requestDataForTable = {
      "action": '',
      "selectionFilters": {
        "marketplace": reqDataMarket(newValue),
        "retailWeek": reqDataRetailWeek(newValue),
        "channel": reqDataChannel(newValue),
        "gender": reqDataGender(newValue),
        "category": reqDataCategory(newValue),
        "division": reqDataDivision(newValue),
        "table": reqDataTable(newValue)
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
          if (newValue.marketPlace === eachUser.marketplaceId) {
            marketplacearray.push({
              "marketplaceId": eachUser.marketplaceId,
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
          if (newValue.marketPlace === eachUser.marketplaceId) {
            eachUser.channels.map(eachChannel => {
              if (newValue.channel === eachChannel.channelId) {
                channelarray.push({
                  "channelId": eachChannel.channelId,
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
              if (newValue.retailWeek === eachweek.weekId) {
                retailWeekarray.push({
                  "weekId": eachweek.weekId,
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
              if (newValue.category === eachCategory.categoryId) {
                categoryarray.push({
                  "categoryId": eachCategory.categoryId,
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
              if (newValue.gender === eachGender.genderId) {
                genderarray.push({
                  "genderId": eachGender.genderId,
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
              if (newValue.division === eachDivision.divisionId) {
                divisionarray.push({
                  "divisionId": eachDivision.divisionId,
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
    let tablearray = [];
    Object.keys(categoryApi).map(each => {
      if (each === 'selectionFilters') {
        Object.keys(categoryApi[each]).map(eachfilters => {
          let selectionFilters = categoryApi[each];
          if (eachfilters === 'table') {
            selectionFilters[eachfilters].map(eachDivision => {
              if (newValue.action === eachDivision.tableId) {
                tablearray.push({
                  "tableId": eachDivision.tableId,
                  "tableDescription": eachDivision.tableDescription
                })
              }
            });
          }
        });
      }
    });
    return tablearray;
  }

  function getTableAPI(requestDataForTable) {
    actionTableService.postData(requestDataForTable).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        setRowData(data.inventoryDetails);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <React.Fragment>
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
          <Route path="/1"><ActionTable rowData={rowData} onGridReady={onGridReady} /></Route>
          <Route path="/2"><Category /></Route>
          <Route path="/3"><Products /></Route>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;