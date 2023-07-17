import React from 'react';  //importing the required functionalities 
import ReactDOM from 'react-dom';

import JqxDataTable from 'jqwidgets-react/react_jqxdatatable.js';

class ReadASM extends React.Component {
 render () {
   let source =
   {
       localdata: generatedata(50),
       datatype: "list",  //generation of the DataTable 
       datafields:
       [
           { name: 'employeename', type: 'string' },
           { name: 'employeeid', type: 'number' },
           { name: 'salary', type: 'number' },
       ]
   };
   let dataAdapter = new $.jqx.dataAdapter(this.source);

   let columns = 
   [
       { text: 'Name', dataField: 'employeename', width: 200 },
       { text: 'ID', dataField: 'employeeid', width: 200 },
       { text: 'Income', dataField: 'salary', width: 180 },
   ];
   return (
       <JqxDataTable 
           source={dataAdapter} sortable={true}
           pageable={true} columns={columns}
        />
   )
 }
}

ReactDOM.render(<ReadASM />, document.getElementById('st-box')); //rendering the component to the desired HTML element