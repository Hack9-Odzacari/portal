/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import axios from 'axios';

const Tabs = () => {
  const [currentTab, setCurrentTab] = useState('1');
  // const [data, setData] = useState('');
  const tabs = [
    {
      id: 1,
      tabTitle: 'Data',
      title: 'Title 1',
      content:
        'Las tabs se generan automáticamente a partir de un array de objetos, el cual tiene las propiedades: id, tabTitle, title y content.',
    },
    {
      id: 2,
      tabTitle: 'My Devices',
      title: 'Title 2',
      content: 'Contenido de tab 2.',
    },
  ];

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  const getData = () => {
    axios.get('https://r70mdqnjd5.execute-api.eu-central-1.amazonaws.com/Prod/data')
      .then((response) => {
        console.log(response);
      });
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
      <button type="button" onClick={getData}>Get</button>
    </div>
  );
};

export default Tabs;
