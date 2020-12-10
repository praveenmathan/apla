import './App.css';
import React, { useState, useEffect } from 'react';
import MenuAppBar from '../navigation/navigation';
import CategoryBar from '../category/categoryBar';
import { Route, Switch } from "react-router-dom";
import authorisationAPI from '../services/authorisationAPI';

/**
 * Application Main Layout
 */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
);

function App() {

  const [authorisationApi, setAuthorisationApi] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let requestData = {
      query: { userName: 'praveen.kumarmathan@nike.com' },
      accessToken: '',
    };

    authorisationAPI.postData(requestData).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        setAuthorisationApi(data);
        setLoading(true);
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
    })
  }, []);

  return (
    <React.Fragment>
      <section>
        {loading ? <MenuAppBar auth={authorisationApi} /> : ''}
      </section>

      <section>
        <div className="category-bar-wrapper">
          {loading ? <CategoryBar auth={authorisationApi} /> : ''}
        </div>
      </section>

      <main className="container-fluid">
        <div className="table-wrapper">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/category">
              <Category />
            </Route>
          </Switch>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
