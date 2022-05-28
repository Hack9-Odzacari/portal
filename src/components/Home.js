/* eslint-disable max-len */
/* eslint-disable array-callback-return, no-unused-vars, react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control, react/self-closing-comp */

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addState, addCity } from '../redux/home/home';
import { urlLocation } from '../redux/urlLocation/urlLocation';

import serbiaFlag from '../assets/images/serbia-flag.png';
import dutchFlag from '../assets/images/dutch-flag.png';
import romaniaFlag from '../assets/images/romania-flag.png';
import Tabs from './Tabs';

function Home() {
  const dispatch = useDispatch();
  dispatch(urlLocation('homeScreen'));
  const states = useSelector((state) => state.homeReducer);

  const flags = [
    {
      imageSource: serbiaFlag,
      imageTitle: 'Serbia',
    },
    {
      imageSource: dutchFlag,
      imageTitle: 'Dutch',
    },
    {
      imageSource: romaniaFlag,
      imageTitle: 'Romania',
    },
  ];

  const [flag, setFlag] = useState(flags[0].imageSource);
  const [index, setIndex] = useState('0');

  const flagHandler = ({ target }) => {
    const index = target.options.selectedIndex;
    const image = flags[index];
    setFlag(image.imageSource);
    setIndex(index);
  };

  const [readings, setReadings] = useState([
    {
      Country: 'Serbia',
      Time: '1653550921992152181',
      LocationLatitude: '52.368515464923036',
      LocationLongitude: '4.905746869314592',
      LocationName: '"Muiderstraat; Amsterdam; Netherlands"',
      Name: 'Levi9 NineAir Amsterdam',
      Pms7003measurementPm10Atmo: '3',
      Pms7003measurementPm25Atmo: '6',
      Pms7003measurementPm100Atmo: '9',
      Bmp280MeasurementTemperature: '19.5142578125',
      Bmp280MeasurementPressure: '1018.7720124385132',
      Dht11MeasurementHumidity: '57',
    },
  ]);
  const [lastUpdateDate, setLastUpdateDate] = useState([]);
  const [country, setCountry] = useState([]);

  // useEffect(() => {
  //   if (Object.keys(states).length === 0) {
  //     // axios
  //     // // GET CITIES FROM A STATE
  //     //   .get(
  //     //     `https://api.airvisual.com/v2/states?country=${Object.keys(states)[0]}&key=8e3830ea-6737-4d7f-b331-4c2656760577`,
  //     //   )
  //     //   .then((response) => {
  //     //     const { data } = response.data;
  //     //     data.map((item) => {
  //     //       dispatch(addState(item.state));
  //     //       return item.state;
  //     //     });

  //     //     axios
  //     //       .get(
  //     //         `https://api.airvisual.com/v2/cities?state=${
  //     //           Object.keys(states)[0]
  //     //         }&country=Serbia&key=8e3830ea-6737-4d7f-b331-4c2656760577`,
  //     //       )
  //     //       .then((response) => {
  //     //         const { data } = response.data;
  //     //         const result = data.map((item) => item.city);

  //     //         result.map((city) => {
  //     //           axios(
  //     //             `https://api.airvisual.com/v2/city?city=${city}&state=${
  //     //               Object.keys(states)[0]
  //     //             }&country=Serbia&key=8e3830ea-6737-4d7f-b331-4c2656760577`,
  //     //           ).then((response) => {
  //     //             dispatch(addCity(response.data.data));
  //     //             const statesName = Object.keys(states);
  //     //             const citiesOfFirstState = Object.entries(
  //     //               states[statesName[0]],
  //     //             );
  //     //             setCities(citiesOfFirstState);
  //     //           });
  //     //         });
  //     //       });
  //     //   });
  //   } else {
  //     const statesName = Object.keys(states);
  //     const citiesOfFirstState = Object.entries(
  //       states[statesName[0]],
  //     );
  //     setCities(citiesOfFirstState);
  //   }
  // }, []);

  // useEffect(() => {
  //   cities.sort(
  //     (a, b) => b[1].current.pollution.aqius - a[1].current.pollution.aqius,
  //   );
  //   if (cities.length !== 0) {
  //     setLastUpdateDate(moment(cities[0][1].current.pollution.ts).format('hh:mm, MMM DD'));
  //   }
  // }, [cities]);

  const getData = () => {
    axios
      .get(
        'https://py2qxhv9vk.execute-api.eu-central-1.amazonaws.com/default/amsterdam',
      )
      .then((response) => {
        console.log(response);
        const utcSeconds = response.data[0].Time;
        // console.log(utcSeconds);
        const date = new Date(utcSeconds / 1000000);
        setLastUpdateDate(date.toLocaleString());
        setReadings(response.data);
      });
  };

  if (Object.keys(flags).length !== 0) {
    // const flagsName = Object.keys(flags);

    // cities.sort(
    //   (a, b) => b[1].current.pollution.aqius - a[1].current.pollution.aqius,
    // );

    return (
      <main className="container">
        <div className="d-flex justify-content-around align-items-center p-5 shadow-lg country-block">
          <img src={flag} alt="Not found" className="px-2" />
          <div className="px-2 text-center">
            <h2 className="text-white fw-normal fst-italic">
              {flags[index].imageTitle}&apos;s
            </h2>
            <h2 className="text-white fw-normal fst-italic">AIR QUALITY</h2>
            <p className="text-white fs-sm">LAST UPDATE: {lastUpdateDate}</p>
          </div>
        </div>

        <div className="my-4 selection-block">
          <label htmlFor="statesName" className="d-block text-white mb-2">
            Switch between the states from the following dropdown menu to view
            the air quality of its cities.
          </label>
          <select
            id="flagsName"
            className="form-select d-block"
            onChange={flagHandler}
          >
            {flags.map((flag) => (
              <option value={flag.imageSource} key={flag.imageTitle}>
                {flag.imageTitle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Tabs readings={readings}></Tabs>
        </div>
      </main>
    );
  }
  return (
    <div className="text-center p-5 my-5">
      <div className="lds-ellipsis mb-3">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h5 className="text-white fw-light fst-italic">
        Sorry, it seems there&apos;s a problem in fetching the data from the
        server now.
      </h5>
      <h5 className="text-white fw-light fst-italic">
        Please wait a few minutes before you try again.
      </h5>
    </div>
  );
}

export default Home;
