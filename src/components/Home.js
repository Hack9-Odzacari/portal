/* eslint-disable array-callback-return, no-unused-vars, react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control, react/self-closing-comp */

import * as moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addState, addCity } from '../redux/home/home';
import { urlLocation } from '../redux/urlLocation/urlLocation';

import serbiaFlag from '../assets/images/serbia-flag.png';
import dutchFlag from '../assets/images/dutch-flag.png';
import romaniaFlag from '../assets/images/romania-flag.png';

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
    // console.log(index);
    const image = flags[index];
    setFlag(image.imageSource);
    setIndex(index);
  };

  const [cities, setCities] = useState([]);
  const [lastUpdateDate, setLastUpdateDate] = useState([]);

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
            <h2 className="text-white fw-normal fst-italic">{flags[index].imageTitle}&apos;s</h2>
            <h2 className="text-white fw-normal fst-italic">AIR QUALITY</h2>
            <p className="text-white fs-sm">LAST UPDATE: {lastUpdateDate}</p>
          </div>
        </div>

        <div className="my-4 selection-block">
          <label htmlFor="statesName" className="d-block text-white mb-2">
            Switch between the states from the following dropdown menu
            to view the air quality of its cities.
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

        <div className="cities-block mb-4">
          <ul className="list-unstyled">
            {cities.map((item) => (
              <li
                key={item[1].city}
                className="shadow py-3 px-4"
              >
                <Link to={`/city/${item[1].state}/${item[1].city}`} className="text-decoration-none w-100 d-flex justify-content-between align-items-center">
                  <h5 className="text-white mb-0">{item[1].city}</h5>

                  <div className="text-center">
                    {item[1].current.pollution.aqius <= 50 && (
                    <h6>
                      <span className="badge bg-green">Good</span>
                    </h6>
                    )}

                    {item[1].current.pollution.aqius > 50
                    && item[1].current.pollution.aqius <= 100 && (
                      <h6>
                        <span className="badge bg-yellow">Moderate</span>
                      </h6>
                    )}

                    {item[1].current.pollution.aqius > 100
                    && item[1].current.pollution.aqius <= 150 && (
                      <h6>
                        <span className="badge bg-orange">
                          Unhealthy for sensitive groups
                        </span>
                      </h6>
                    )}

                    {item[1].current.pollution.aqius > 150
                    && item[1].current.pollution.aqius <= 200 && (
                      <h6>
                        <span className="badge bg-red">Unhealthy</span>
                      </h6>
                    )}

                    <p className="text-white mb-2">
                      {item[1].current.pollution.aqius}
                      <span className="ms-1">US AQI</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
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
      <h5 className="text-white fw-light fst-italic">Sorry, it seems there&apos;s a problem in fetching the data from the server now.</h5>
      <h5 className="text-white fw-light fst-italic">Please wait a few minutes before you try again.</h5>
    </div>
  );
}

export default Home;
