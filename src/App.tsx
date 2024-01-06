import './App.css';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';
import { ChangeEvent } from 'react';

interface MyData {
  rollNo: string;
  roomNo: string;
  hostel: string;
}

function App() {
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;

    if (file) {
      const data: ArrayBuffer = await file.arrayBuffer();
      const workbook: WorkBook = read(data);
      const worksheet: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonExcelData = utils.sheet_to_json(worksheet);
      console.log(jsonExcelData);
      let RESULT:MyData[]=[];
      let rollNoArray:string[]=[];
      jsonExcelData.map((item:any)=>{
        if(/^[A-Z]{3}\d{3}$/.test(item["Room No"]) && /^\d{4}[A-Z]{3}\d{4}$/.test(item["Roll No"]) && !rollNoArray.includes(item["Roll No"])){
          rollNoArray.push(item["Roll No"]);
          RESULT.push({
             rollNo:item["Roll No"],
             roomNo:item["Room No"],
             hostel:item["Hostel"]
          });
        }else{
          console.log('Invalid entry')
        }
      });
      console.log("Final result");
      console.log(RESULT);
    }
  }
  return (
    <div className="App">
      <input type="file"
            style={{ padding: '8px',margin :'100px', borderRadius: '4px', border: '1px solid #ccc' }}
            onChange={(e) => handleFileUpload(e)} />
    </div>
  );
}

export default App;
