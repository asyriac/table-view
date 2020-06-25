import React, { Component } from "react";

import axios from "axios";
import ReactTable from "react-table-6";

import "react-table-6/react-table.css";
import { CSVLink } from "react-csv";

import "./People.css";

class People extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searchInput: "",
    };
  }

  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.get(url);
    this.setState({
      data: response.data,
    });
  }

  handleChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };
  render() {
    const columns = [
      {
        Header: "User ID",
        accessor: "userId",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Message",
        accessor: "body",
        style: { whiteSpace: "unset" },
      },
    ];

    const headers = [
      { label: "UserID", key: "userId" },
      { label: "ID", key: "id" },
      { label: "Title", key: "title" },
      { label: "Message", key: "body" },
    ];
    const { searchInput, data } = this.state;
    let filteredData = data.filter((value) => {
      return value.userId.toString().toLowerCase().includes(searchInput.toLowerCase()) || value.id.toString().toLowerCase().includes(searchInput.toLowerCase()) || value.title.toLowerCase().includes(searchInput.toLowerCase()) || value.body.toLowerCase().includes(searchInput.toLowerCase());
    });
    return (
      <div className="App">
        <CSVLink data={filteredData} headers={headers} filename={"user_data.csv"} className="btn-download">
          Download CSV
        </CSVLink>
        <input className="search-bar" type="search" onChange={this.handleChange} placeholder="Search..." />
        <ReactTable columns={columns} data={filteredData}></ReactTable>
      </div>
    );
  }
}

export default People;
