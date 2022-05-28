/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Tabs = (props) => {
  const [currentTab, setCurrentTab] = useState('1');
  // const [data, setData] = useState('');

  function TableTemplate(
    time,
    locationName,
    name,
    pms7003measurementPm10Atmo,
    pms7003measurementPm25Atmo,
    pms7003measurementPm100Atmo,
    bmp280MeasurementTemperature,
    bmp280MeasurementPressure,
    dht11MeasurementHumidity,
  ) {
    return {
      time,
      locationName,
      name,
      pms7003measurementPm10Atmo,
      pms7003measurementPm25Atmo,
      pms7003measurementPm100Atmo,
      bmp280MeasurementPressure,
      bmp280MeasurementTemperature,
      dht11MeasurementHumidity,
    };
  }

  const rows = [];
  console.log(props.readings);
  // eslint-disable-next-line array-callback-return
  props.readings.map((element) => {
    const date = new Date(element.Time / 1000000);
    const row = TableTemplate(
      date.toLocaleString(),
      element.LocationName,
      element.Name,
      element.Pms7003measurementPm10Atmo,
      element.Pms7003measurementPm25Atmo,
      element.Pms7003measurementPm100Atmo,
      Math.round(element.Bmp280MeasurementTemperature),
      Math.round(element.Bmp280MeasurementPressure),
      element.Dht11MeasurementHumidity,
    );
    rows.push(row);
  });

  const pollutionLevel = () => {
    if (props.readings[0].Pms7003measurementPm10Atmo <= 1) {
      return 'good';
    }

    if (
      props.readings[0].Pms7003measurementPm10Atmo > 1
      && props.readings[0].Pms7003measurementPm10Atmo <= 3
    ) {
      return 'moderate';
    }

    if (
      props.readings[0].Pms7003measurementPm10Atmo > 3
      && props.readings[0].Pms7003measurementPm10Atmo <= 5
    ) {
      return 'unhealthyForSensitive';
    }

    if (
      props.readings[0].Pms7003measurementPm10Atmo > 5
      && props.readings[0].Pms7003measurementPm10Atmo <= 10
    ) {
      return 'unhealthy';
    }

    return 'unknown';
  };

  const tabs = [
    {
      id: 1,
      tabTitle: 'Data',
      content: (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Location Name</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Pm 1</TableCell>
                  <TableCell align="right">Pm 2.5</TableCell>
                  <TableCell align="right">Pm 10</TableCell>
                  <TableCell align="right">Pressure</TableCell>
                  <TableCell align="right">Temperature</TableCell>
                  <TableCell align="right">Humidity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.time}</TableCell>
                    <TableCell align="right">{row.locationName}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">
                      {row.pms7003measurementPm10Atmo}
                    </TableCell>
                    <TableCell align="right">
                      {row.pms7003measurementPm25Atmo}
                    </TableCell>
                    <TableCell align="right">
                      {row.pms7003measurementPm100Atmo}
                    </TableCell>
                    <TableCell align="right">
                      {row.bmp280MeasurementPressure}
                    </TableCell>
                    <TableCell align="right">
                      {row.bmp280MeasurementTemperature}
                    </TableCell>
                    <TableCell align="right">
                      {row.dht11MeasurementHumidity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h2 className="headertext">Overall air quality:</h2>
          <div className="text-center mt-3">
            {pollutionLevel() === 'good' && (
              <h3>
                <span className="badge bg-green">Good</span>
              </h3>
            )}
            {pollutionLevel() === 'moderate' && (
              <h3>
                <span className="badge bg-yellow">Moderate</span>
              </h3>
            )}

            {pollutionLevel() === 'unhealthyForSensitive' && (
              <h3>
                <span className="badge bg-orange">
                  Unhealthy for sensitive groups
                </span>
              </h3>
            )}

            {pollutionLevel() === 'unhealthy' && (
              <h3>
                <span className="badge bg-red">Unhealthy</span>
              </h3>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      tabTitle: 'Discount Data',
      title: 'Discount Data',
      content: 'IN DEVELOPMENT',
    },
  ];

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <div className="container">
      <div className="tabs">
        {tabs.map((tab, i) => (
          <button
            type="button"
            key={i}
            id={tab.id}
            disabled={currentTab === `${tab.id}`}
            onClick={handleTabClick}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>
      <div className="content">
        {tabs.map((tab, i) => (
          <div key={i}>
            {currentTab === `${tab.id}` && (
              <div>
                <p className="title">{tab.title}</p>
                <p>{tab.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
