import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import  {Row, Col}  from 'reactstrap';
import logo from './logo.svg';
import {
  PopupboxManager,
  PopupboxContainer
} from 'react-popupbox';
import './react-popupbox.css'
import './App.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.js';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.js';
class App extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      deneme: false,
      english:"",
      turkish:"",
      polish:"",
      spanish:"",
      sentences:""
    // redirect: false
    };
    this.update =this.update.bind(this);
    this.postData =this.postData.bind(this);
  };
  update(e){
    const content = (
      <div>
        <input className="quotes" type="text" onChange={this.update} placeholder="English"></input>
        <input className="quotes" type="text" onChange={this.update} placeholder="Turkish"></input>
        <input className="quotes" type="text" onChange={this.update} placeholder="Polish"></input>
        <input className="quotes" type="text" onChange={this.update} placeholder="Spanish"></input>
        <input type="text" className="quotes-from" onChange={this.update} placeholder="Sentences"></input>
        <button className="quotes" onClick={this.postData} type="submit">Save</button>
      </div>
    )
    PopupboxManager.open({ content })
    this.setState({ 
      english:e.target.value,
      turkish:e.target.value,
      polish:e.target.value,
      spanish:e.target.value,
      sentences:e.target.value
    })
 
  }
  openPopupbox() {
    
  }
  componentDidMount(){
    this.fetchData();
    this.setState({deneme: true}, function () {
      console.log(this.state.deneme);
    });
    this.fetchData();
  }

  fetchData(){
    fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        data : json,
        deneme: true
      },function() {
        console.log(this.state.data);
     })})
      .catch(error => console.log('parsing failder',error))
     
  }
  
  postData() {
    fetch(`http://localhost:8080/ekle`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        english: this.state.english,
        turkish: this.state.turkish,
        polish: this.state.polish,
        spanish: this.state.spanish,
        sentences: this.state.sentences
      })
    })
  }


  
  render() {
    const popupboxConfig = {
      titleBar: {
        enable: true,
        text: 'Adding New Word'
      },
      fadeIn: true,
      fadeInSpeed: 500
    }
    
    return (
      <div>
<button onClick={this.update}>Click Me</button>
<PopupboxContainer{...popupboxConfig}></PopupboxContainer>
              <BootstrapTable search exportCSV data={this.state.data}    scrollTop={ 'Bottom' }
              tableStyle={ { border: '#0000FF 2.5px solid' } }
              containerStyle={ { border: '#FFBB73 2.5px solid' } }
              headerStyle={ { border: 'red 1px solid' } }
              bodyStyle={ { border: 'green 1px solid' } } 
              >
                <TableHeaderColumn width='200' dataField='english' isKey>ENGLISH</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='turkish'>TURKISH</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='polish'>POLISH </TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='spanish'>SPANISH </TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='sentences'>SENTENCES</TableHeaderColumn>
              </BootstrapTable>
              </div>
    );
  }
}



export default App;
