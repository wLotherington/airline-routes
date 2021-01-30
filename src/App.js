import React, { useState } from 'react';
import './App.css';
import DATA from './data.js'
import { getAirlineById, getAirportByCode } from './data.js'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Select from './components/Select'
import Map from './components/Map'

const App = () => {
  const [ page, setPage ] = useState(0);
  const [ perPage, setPerPage ] = useState(25)
  const [ airlineFilter, setAirlineFilter ] = useState(0)
  const [ airportFilter, setAirportFilter ] = useState("")

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  const formatValue = (property, value) => {
    return property === 'airline'
      ? getAirlineById(value)
      : getAirportByCode(value)
  }

  const totalRoutes = () => filteredRoutes().length;
  const totalPages = () => Math.ceil(totalRoutes() / perPage);
  const pageStartIdx = () => page * perPage;
  const pageEndIdx = () => pageStartIdx() + perPage;

  const filteredRoutes = () => {
    let routes = DATA.routes

    if (airlineFilter) {
      routes = routes.filter(route => route.airline === airlineFilter)
    }

    if (airportFilter) {
      routes = routes.filter(route => route.src === airportFilter || route.dest === airportFilter)
    }

    return routes;
  }

  const paginatedRoutes = () => {
    return filteredRoutes().slice(pageStartIdx(), pageEndIdx());
  };

  const filteredAirlines = DATA.airlines.reduce((acc, cur, idx) => {
    if (idx === DATA.airlines.indexOf(cur) && filteredRoutes().filter(route => route.airline === cur.id).length > 0) {
      acc.push(cur)
    }
    return acc
  }, []);

  const filteredAirports = DATA.airports.reduce((acc, cur, idx) => {
    if (idx === DATA.airports.indexOf(cur) && filteredRoutes().filter(route => route.src === cur.code || route.dest === cur.code).length > 0) {
      acc.push(cur)
    }
    return acc
  }, []);

  const handleAirlineFilter = event => {
    setAirlineFilter(+event.target.value);
  };

  const handleAirportFilter = event => {
    setAirportFilter(event.target.value);
  };

  const clearFilters = () => {
    setAirlineFilter(0);
    setAirportFilter("");
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          <Select options={filteredAirlines}
                  valueKey="id"
                  titleKey="name"
                  allTitle="All Airlines"
                  value=""
                  onSelect={handleAirlineFilter} />
          <Select options={filteredAirports}
                  valueKey="code"
                  titleKey="name"
                  allTitle="All Airports"
                  value=""
                  onSelect={handleAirportFilter} />
          <button onClick={clearFilters}>Clear Filter</button>
        </p>

        <Map filteredRoutes={filteredRoutes}
             airportFilter={airportFilter}
             setAirportFilter={setAirportFilter}
             DATA={DATA} />

        <Pagination pageStartIdx={pageStartIdx}
                    totalRoutes={totalRoutes}
                    pageEndIdx={pageEndIdx}
                    setPerPage={setPerPage}
                    perPage={perPage}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage} />
        <Table className="routes-table"
               columns={columns}
               rows={paginatedRoutes()}
               format={formatValue} />
      </section>
    </div>
  );
};

export default App;