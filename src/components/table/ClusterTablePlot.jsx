import React, { useRef, useState } from "react";
import { Button, Flex, Input, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { SearchOutlined } from "@ant-design/icons";

const ClusterTablePlot = ({ data }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const navigate = useNavigate();

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  // search Props from Antd
  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && clearFilters()}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filteredValue: filteredInfo[dataIndex] || null,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
  });
  // example from Antd

  const columns = [
    {
      title: "Pdb Id",
      dataIndex: "pdbId",
      key: "pdbId",
      ...getColumnSearchProps("pdbId"),
      sorter: (a, b) => a.pdbId.localeCompare(b.pdbId),
      sortOrder: sortedInfo.columnKey === "pdbId" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Ligand",
      dataIndex: "ligand",
      key: "ligand",
      ...getColumnSearchProps("ligand"),
      sorter: (a, b) => a.ligand.localeCompare(b.ligand),
      sortOrder: sortedInfo.columnKey === "ligand" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Residue Position",
      dataIndex: "residuePosition",
      key: "residuePosition",
      sorter: (a, b) => a.residuePosition.localeCompare(b.residuePosition),
      sortOrder: sortedInfo.columnKey === "residuePosition" ? sortedInfo.order : null,
      // sorter: (a, b) =>
      //   a.residuePosition.localeCompare(b.residuePosition, undefined, {
      //     numeric: true,
      //   }),
      // sortOrder:
      //   sortedInfo.columnKey === "residuePosition" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "EC Class",
      dataIndex: "ecClass",
      key: "ecClass",
      filters: [...new Set(data.map((e) => e.ecClass))]
        .toSorted((a, b) =>
          a.localeCompare(b, undefined, {
            numeric: true,
          })
        )
        .map((e) => ({ text: e, value: e })),
      filteredValue: filteredInfo.ecClass || null,
      onFilter: (value, record) => record.ecClass.includes(value),
      sorter: (a, b) => a.ecClass.localeCompare(b.ecClass),
      sortOrder: sortedInfo.columnKey === "ecClass" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Organism",
      dataIndex: "organism",
      key: "organism",
      ...getColumnSearchProps("organism"),
      sorter: (a, b) => parseInt(a.organism) - parseInt(b.organism),
      sortOrder: sortedInfo.columnKey === "organism" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
      sortOrder: sortedInfo.columnKey === "score" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Flex justify="space-between" align="center">
        <p>Total data: {data.length}</p>
        <Flex gap={12}>
          <Button style={{ marginBottom: "12px" }} onClick={() => clearAll()}>
            Clear
          </Button>
          <Button style={{ marginBottom: "12px" }} onClick={() => clearAll()}>
            Download
          </Button>
        </Flex>
      </Flex>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate("/pdb/" + record.pdbId);
            }, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        columns={columns}
        pagination={{ position: ["bottomRight"] }}
        dataSource={data ? data : []}
        onChange={handleChange}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </div>
  );
};
export default ClusterTablePlot;
