import * as XLSX from 'xlsx/xlsx.mjs';
//import XLSX from 'xlsx';

export function parseData() {
    
    const filePath = "../../assets/HydrolaseCADseekAnalytics-PairsFull.xlsx"
    const workbook = XLSX.readFile(filePath)
    let workSheet = {};

    for (const sheetName of workbook.SheetNames) {
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
        const firstColumn = jsonData.map(row => row[0])
        const uniqueFirstColumn = [...new Set(firstColumn)]
        workSheet[sheetName] = uniqueFirstColumn;
    }
    console.log(workSheet)
}
parseData()
/*
function handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();


    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook =XLSX.read(data, {type: 'array'});

        const firstSheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(workSheet, {header: 1});

        console.log(jsonData);
    } ;
    reader.readAsArrayBuffer(file);
}
  */