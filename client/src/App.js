import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import Header from './components/header'
import { Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';

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
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deneme: false,
      english: "",
      turkish: "",
      polish: "",
      spanish: "",
      sentences: "",
      error:false
      // redirect: false
    };
    this.openPopupbox = this.openPopupbox.bind(this);
    this.update = this.update.bind(this);
    this.postData = this.postData.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.english = React.createRef();
    this.turkish = React.createRef();
    this.polish = React.createRef();
    this.spanish = React.createRef();
    this.sentences = React.createRef();

  };
  validateInput(word) {
    if (word.match(/\d/) != null) {
      return false;
    }
    return true;
  }

  update() {
    const content = (
      <div>
        <input
          className="quotes" type="text" ref={this.english} onChange={e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
            this.openPopupbox()
          }
          } 
          placeholder="English"></input>
        <input className="quotes" type="text"
          ref={this.turkish} onChange={
            e => {
              e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
              this.openPopupbox()
            }
          } placeholder="Turkish"></input>
        <input className="quotes" type="text" ref={this.polish} onChange={
          e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
            this.openPopupbox()
          }
        } placeholder="Polish"></input>
        <input className="quotes" type="text" ref={this.spanish} onChange={
          e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
            this.openPopupbox()
          }
        } placeholder="Spanish"></input>
        {/* <input className="quotes" type="text" ref={this.sentences}  onChange={this.openPopupbox} placeholder="Sentences"></input> */}
        <button className="quotes" onClick={this.postData} type="submit">Save</button>
      </div>
    )
    PopupboxManager.open({ content })
  }
  openPopupbox(event) {

      this.setState({
        english: this.english.current.value.toLowerCase().replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇę]/gi, ""),
        turkish: this.turkish.current.value.toLowerCase(),
        polish: this.polish.current.value.toLowerCase(),
        spanish: this.spanish.current.value.toLowerCase()

      });
    // }
    // else {
    //   alert("Please do not enter numbers !")

    // }


  }
  createCustomInsertButton = (onClick) => {
    return (
      <div>
      <Button variant="outline-success" onClick={this.update}>Add Word</Button>
      </div>
      //<button style={{ color: 'red' }} onClick={this.update}>Add rows</button>
    );
  }
  componentDidMount() {
    this.fetchData();
    this.setState({ deneme: true }, function () {
      console.log(this.state.deneme);
    });
    this.fetchData();
  }
//https://language-support.herokuapp.com/api
  fetchData() {
    fetch('https://language-support.herokuapp.com/api')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({
          data: json,
          deneme: true
        }, function () {
          console.log(this.state.data);
        })
      })
      .catch(error => console.log('parsing failder', error))

  }
//https://language-support.herokuapp.com/api/ekle
  postData() {
    fetch('https://language-support.herokuapp.com/api/ekle', {
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
    }).then(res => res.json())
    .catch(err=> {
      console.log(err)
      this.setState({
        error:true
      })
    })
    if(this.state.error===true){
     alert("Word could not add!")
    }
    PopupboxManager.close()
   
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

    const options = {
      insertBtn: this.createCustomInsertButton
    };

    return (

      <div style={{ width: 'auto' }}>
        <Header />

        <PopupboxContainer{...popupboxConfig}></PopupboxContainer>
        <BootstrapTable search insertRow exportCSV data={this.state.data} scrollTop={'Bottom'}
          options={options}
          tableStyle={{ border: '#0000FF 2.5px solid' }}
          containerStyle={{ border: '#FFBB73 2.5px solid' }}
          headerStyle={{ border: 'red 1px solid' }}
          bodyStyle={{ border: 'green 1px solid' }}
        >

          <TableHeaderColumn width='150' dataField='english' isKey>ENGLISH</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='turkish'>TURKISH</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='polish'>POLISH </TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='spanish'>SPANISH </TableHeaderColumn>
          {/* <TableHeaderColumn width='150' dataField='sentences'>SENTENCES</TableHeaderColumn> */}
        </BootstrapTable>
      </div>
    );
  }
}



export default App;
