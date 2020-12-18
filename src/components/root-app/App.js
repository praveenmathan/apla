import './App.css';
import React, { useState, useEffect } from 'react';
import MenuAppBar from '../navigation/navigation';
import CategoryBar from '../category/categoryBar';
import authorisationAPI from '../services/authorisationAPI';
import categoryService from '../services/categoryService'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import axios from 'axios';

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

  useEffect(() => {
    /* Get CUP roles, Marketplace and Channel details  */
    let requestData = {
      query: { userName: 'NIKE\\SUppoo' },
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

    /* To get authorisation code options */
    setLoading(true);
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
              "channelId": 2,
              "channelDescription": "COMPANY"
            },
            {
              "channelId": 3,
              "channelDescription": "NSO"
            },
            {
              "channelId": 4,
              "channelDescription": "ZOZO TOWN"
            },
            {
              "channelId": 5,
              "channelDescription": "LAB"
            },
            {
              "channelId": 6,
              "channelDescription": "LAZADA"
            },
            {
              "channelId": 7,
              "channelDescription": "MERCADO LIBRE"
            }
          ]
        },
        {
          "userAccessMode": "ReadWrite",
          "marketplaceId": "2",
          "marketplaceDescription": "Mexico",
          "channels": [
            {
              "channelId": 1,
              "channelDescription": "NDDC"
            },
            {
              "channelId": 2,
              "channelDescription": "COMPANY"
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
    setCategoryApi({
      "returnCode": 0,
      "returnMessage": "Success",
      "selectionFilters": {
        "marketplace": null,
        "retailWeek": [
          {
            "weekId": 38,
            "weekDescription": "FA20 WK12"
          },
          {
            "weekId": 39,
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

    /* testing AG grid - for now */
    getTableAPI();
  }, []);

  function getTableAPI() {
    axios.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json')
      .then(result => result.data)
      .then(rowData => setRowData(rowData));
  }

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
    console.log('params', params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  return (
    <React.Fragment>
      <section>
        <MenuAppBar auth={authorisationApi} />
      </section>

      <section>
        <div className="category-bar-wrapper">
          <CategoryBar auth={authorisationApi} data={categoryApi} isLoading={loading} />
        </div>
      </section>

      <main className="container-fluid">
        <div className="table-wrapper">
          <div className="ag-theme-alpine" style={{ height: '70vh' }}>
            <AgGridReact
              defaultColDef={{
                width: 150,
                sortable: true,
                resizable: true,
                filter: true,
              }}
              onGridReady={onGridReady}
              rowData={rowData}
              pagination={true}
            >
              <AgGridColumn headerName="Athlete">
                <AgGridColumn field="athlete" pinned="left" lockPinned={true}
                  cellClass="lock-pinned" />
                <AgGridColumn field="age" />
                <AgGridColumn
                  field="country"
                  headerTooltip="The country the athlete represented"
                />
              </AgGridColumn>
              <AgGridColumn headerName="Athelete details">
                <AgGridColumn field="year" headerTooltip="The year of the Olympics" />
                <AgGridColumn field="date" headerTooltip="The date of the Olympics" />
                <AgGridColumn
                  field="sport"
                  headerTooltip="The sport the medal was for"
                />
              </AgGridColumn>
              <AgGridColumn headerName="Athelete Details">
                <AgGridColumn field="gold" headerTooltip="How many gold medals" />
                <AgGridColumn field="silver" headerTooltip="How many silver medals" />
                <AgGridColumn field="bronze" headerTooltip="How many bronze medals" />
                <AgGridColumn
                  field="total"
                  headerTooltip="The total number of medals"
                />
              </AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;

