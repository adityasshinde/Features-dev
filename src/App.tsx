import './App.css';
import { ChangeEvent, useRef, useState } from 'react';
import * as ExcelJS from 'exceljs';

interface IEnrollStudents {
  id : string
  name : string
  role : number
}

interface IUpdateHostels {
  id : string,
  hostel : string,
  roomNumber : string
}


function fileHandlerForEnrollment(workbook: ExcelJS.Workbook) {
      let res:Array<IEnrollStudents> = []
      let name : string = ""
      let id : string = ""

      const worksheet = workbook.worksheets[0];
      worksheet.eachRow({ includeEmpty: false }, (row:any, rowNumber:any) => {

      row.eachCell({ includeEmpty: true }, (cell:any, colNumber:any) => {
        if (colNumber === 1) {
           name = cell.value as string;
        } else {
          id = cell.value as string;
        }
      });

      let obj: IEnrollStudents = {
        id : id?.toLowerCase(),
        name : name,
        role: 0
      }

      res.push(obj)
    });

    //API Call 
    console.log(res);
}


function fileHandlerForHostelUpdate(workbook: ExcelJS.Workbook) {
      let res:Array<IUpdateHostels> = []
      let id : string = ""
      let roomNumber : string = ""
      let hostel : string = ""

      const worksheet = workbook.worksheets[0];
      worksheet.eachRow({ includeEmpty: false }, (row:any, rowNumber:any) => {

      row.eachCell({ includeEmpty: true }, (cell:any, colNumber:any) => {
        if (colNumber === 1) {
           id = cell.value as string;
        } else if(colNumber === 2){
          hostel = cell.value as string;
        }else{
          roomNumber = cell.value as string;
        }
      });

      let obj: IUpdateHostels = {
        id : id?.toLowerCase(),
        hostel ,
        roomNumber
      }

      res.push(obj)
    });

    //API Call 
    console.log(res);
}


function App() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const fileInputRef=useRef<HTMLInputElement>(null);

  const handleFileUpload=async()=>{
    if (file) {

      const data: ArrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(data)
      // fileHandlerForEnrollment(workbook)
      fileHandlerForHostelUpdate(workbook)

    }else{
      console.log('No file selected')
    }
  }
  const handleFileSelection = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | null = e.target.files?.[0] || null;
    //Validation for the file that the selected file is of excel.
     if(selectedFile && selectedFile.name.split('.')[1].includes('xl')){
      setFile(selectedFile);
     }else{
      console.log('Please select a valid excel file');
     }
    
  }
  const handleCancel = () => {
    // Reset the file selection
    setFile(undefined);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div className="App">
      <input type="file"
      ref={fileInputRef}
            style={{ padding: '8px',margin :'100px', borderRadius: '4px', border: '1px solid #ccc' }}
            onChange={(e) => handleFileSelection(e)} />
            <button
            onClick={handleCancel}
             style={{ cursor:'pointer',padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
             >Cancel</button>
            <button
            onClick={handleFileUpload}
             style={{ cursor:'pointer',padding: '8px',margin :'10px', borderRadius: '4px', border: '1px solid #ccc' }}
             >Submit</button>
    </div>
  );
}

export default App;