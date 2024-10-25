import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import {parseData} from './utils';

const TablePlot = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100, // Adjust the page size for better performance
    total: 0, // Will be updated when data is loaded
  });

  useEffect(() => {
    // Fetch and parse data when the component mounts
    const fetchData = async () => {
      setLoading(true);
      try {
        const parsedData = parseData(); // Call the parseData function from utils.js
        setTableData(parsedData);
        setPagination((prev) => ({
          ...prev,
          total: parsedData.length, // Update total to reflect the number of entries
        }));
      } catch (error) {
        console.error("Error parsing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(newPagination);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns = [
    {
      title: "PDB ID",
      dataIndex: "pdbId",
      key: "pdbId",
      sorter: (a, b) => a.pdbId.localeCompare(b.pdbId),
      sortOrder: sortedInfo.columnKey === "pdbId" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Download",
      dataIndex: "Download",
      key: "Download",
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Button style={{ marginBottom: "12px" }} onClick={clearAll}>
        Clear
      </Button>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey={(record) => record.key}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ y: 600 }} // Enable virtual scroll with a fixed height
      />
    </div>
  );
};

export default TablePlot;
