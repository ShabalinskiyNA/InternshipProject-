import React, { useEffect, useState } from 'react';
import TableBody from './table/TableBody';
import TableHead from './table/TableHead';
import AddColButton from './table/AddColButton';
import AddRowButton from './table/AddRowButton';
import { json } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Colums: [],
            
        };
        this.cellChangeHandler = this.cellChangeHandler.bind(this);
        this.saveColums = this.saveColums.bind(this);
        this.delCol = this.delCol.bind(this);
    }

    

    saveColums(){
        let dataToSave = this.state.Colums.slice();
        let arrToSave = Array(dataToSave.length);
        for (let i = 0; i < arrToSave.length; i++) {
            let coD = JSON.stringify(dataToSave[i].columnData)
            console.log('coD - ' + coD);
            arrToSave[i] = {
                "id": dataToSave[i].id,
                "tableId": dataToSave[i].tableId,
                "header": dataToSave[i].header,
                "type": dataToSave[i].type,
                "constrain": dataToSave[i].constrain,
                "columnData": coD
            };
        }
        


        const options = {
            method: 'PATCH',
            body: JSON.stringify(arrToSave),
            headers: {
                "Content-Type": "application/json",
              }
        }
        fetch ('api/Table/Colums/upd', options)
        .then(res => console.log(res));
    }
    cellChangeHandler(data, columId, rowId){
        console.log('cellChangeHandler - ');
        
        let { Colums } = this.state;        
        let arrToSetState = Array(Colums.length);
        arrToSetState = Colums.slice();
        for (let i = 0; i < arrToSetState.length; i++) {
            if(arrToSetState[i].id === columId){
                arrToSetState[i].columnData[rowId] = data;
            }            
        }
        console.log('arrToSetState - ');
        console.log(arrToSetState);

        this.setState({ Colums: arrToSetState });
        console.log(this.state.Colums);
        
    }


    render() {
        let { Colums } = this.state;

        const contents = Colums.length === 0
            ? <p><em>Loading...</em></p>
            :
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <table className="table table-striped" aria-labelledby="tabelLabel" style={{ borderCollapse: 'collapse' }}>
                        <thead style={{ border: '1px solid black' }}>
                            <TableHead data={Colums.slice()} />
                        </thead>
                        <tbody key="mykey" style={{ border: '1px solid black' }}>
                            <TableBody 
                            datas={Colums.slice()} 
                            cellClick={this.cellChangeHandler} 
                            delColumHendler={this.delCol}/>
                        </tbody>
                    </table>
                    <div style={{ height: '50' }}>
                        <AddColButton onClick={() => this.addColumn()} />
                    </div>

                </div>
                <AddRowButton onClick={() => this.addRow()}/>
            </div>;


        return (
            <div>
                <h1 id="tabelLabel">Home</h1>
                <button type="button" onClick={() => this.saveColums()} >Save</button>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        )
    }

    componentDidMount() {
        fetch('api/Table/Colums/1')
            .then(response => response.json())
            .then(result => this.setState({ Colums: this.dataConvert(result) }));
    }

    dataConvert(serverData){
        let columDataMaxSize = 2;
        let newColumsArr = Array(serverData.length);
        for (let i = 0; i < newColumsArr.length; i++) {
            newColumsArr[i] = {
                "id": serverData[i].id,
                "tableId": serverData[i].tableId,
                "header": serverData[i].header,
                "type": serverData[i].type,
                "constrain": serverData[i].constrain,
                "columnData": JSON.parse(serverData[i].columnData),
            };
            if(newColumsArr[i].columnData.length > columDataMaxSize){
                columDataMaxSize = newColumsArr[i].columnData.length;
            }            
        }

        for (let i = 0; i < newColumsArr.length; i++) {
            if(newColumsArr[i].columnData.length < columDataMaxSize){
                for (let j = 0; j < columDataMaxSize - newColumsArr[i].columnData.length; j++) {                    
                    newColumsArr[i].columnData.push("");
                }
            } 
        }

        console.log('dataConvert -');        
        console.log(newColumsArr);        
        console.log('- dataConvert');        
        return newColumsArr;
    }
    addColumn() {
        let { Colums } = this.state;
        
        let newArr = Array(Colums.length + 1);

        newArr = Colums.slice();
        newArr[Colums.length] = {
            "id": Colums[Colums.length - 1].id < 1 ? Colums[Colums.length-1].id - 1 : 0,
            "tableId": Colums[0].tableId,
            "header": "ColumName",
            "type": "string",
            "constrain": "noConstr",
            "columnData": ["",""],
        };
        for (let i = 0; i < newArr[0].columnData.length - 2; i++) {
            newArr[Colums.length].columnData.push("");            
        }

        this.setState({ Colums: newArr });

    }
    addRow(){
        let { Colums } = this.state;

        let newArr = Array(Colums.length);
        newArr = Colums.slice();
        for (let i = 0; i < newArr.length; i++) {
            newArr[i].columnData.push("");
            
        }

        console.log('add row -');
        console.log(newArr);
        console.log('- add row');

        this.setState({ Colums: newArr });
    }
    delCol(delId){
        console.log('id delCol - ' + delId);

        let { Colums } = this.state;
        let data = Colums.slice();
        console.log('data -');
        console.log(Colums);
        console.log('- data');
        const newArr = Array(Colums.length - 1);
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            if(data[i].id !== delId){
                newArr[index] = data[i];
                index++;
            }                     
        }
        

        
        console.log('finish colDel data- ');
        console.log(newArr);
        this.setState({ Colums: newArr });
        let delUrl = 'api/Table/Colums/del/' + delId;
        
        
        let options = {
            method: 'DELETE'
        }
        console.log('delUrl - ' + delUrl)
        fetch(delUrl, options)
    }



}

export default Home;