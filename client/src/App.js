import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
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
      data2: [],
      deneme: false,
      english: "",
      turkish: "",
      polish: "",
      spanish: "",
      sentences: "",
      t_english: "",
      t_turkish: "",
      t_polish: "",
      t_spanish: "",
      error: false
      // redirect: false
    };
    this.saveWords = this.saveWords.bind(this);
    this.update = this.update.bind(this);
    this.translate = this.translate.bind(this);
    this.translateWords = this.translateWords.bind(this);
    this.postData = this.postData.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.english = React.createRef();
    this.turkish = React.createRef();
    this.polish = React.createRef();
    this.spanish = React.createRef();
    this.t_english = React.createRef();
    this.t_turkish = React.createRef();
    this.t_polish = React.createRef();
    this.t_spanish = React.createRef();


  };
  validateInput(word) {
    if (word.match(/\d/) != null) {
      return false;
    }
    return true;
  }

  translate() {
    const content = (
      <div>
        <input
          className="quotes" type="text" ref={this.t_turkish} onChange={e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
          }}
          placeholder="Turkish"></input>
        <Button variant="dark" size="sm" style={{ color: 'olivedrab', margin: '5px', width: '%10',marginBottom: '9px' }} onClick={this.translateWords} type="submit">Translate</Button>
        <div>{this.data2}</div>
        {/* <input
          className="quotes" type="text" ref={this.english}
          placeholder="English">{this.state.t_english}</input>
        <input className="quotes" type="text"
          ref={this.turkish} placeholder="Turkish">{this.state.t_turkish}</input>
        <input className="quotes" type="text" ref={this.polish} placeholder="Polish">{this.state.t_polish}</input>
        <input className="quotes" type="text" ref={this.spanish} placeholder="Spanish">{this.state.t_english}</input>

        <div style={{
          position: "relative", textAlign: "center"
        }}>
          <Button variant="dark" size="sm" style={{ color: 'olivedrab', margin: '5px', width: '%10' }} onClick={this.postData} type="submit">Save</Button>
        </div> */}
      </div >
    )
    PopupboxManager.open({ content })
  }

  update() {
    const content = (
      <div>
        <input
          className="quotes" type="text" ref={this.english} onChange={e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
            this.saveWords()
          }
          }
          placeholder="English"></input>
        <input className="quotes" type="text"
          ref={this.turkish} onChange={
            e => {
              e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
              this.saveWords()
            }
          } placeholder="Turkish"></input>
        <input className="quotes" type="text" ref={this.polish} onChange={
          e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
            this.saveWords()
          }
        } placeholder="Polish"></input>
        <input className="quotes" type="text" ref={this.spanish} onChange={
          e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
            this.saveWords()
          }
        } placeholder="Spanish"></input>
        {/* <input className="quotes" type="text" ref={this.sentences}  onChange={this.saveWords} placeholder="Sentences"></input> */}
        <div style={{
          position: "relative", textAlign: "center"
        }}>
          <Button variant="dark" size="sm" style={{ color: 'olivedrab', margin: '5px', width: '%10' }} onClick={this.postData} type="submit">Save</Button>
        </div>
      </div >
    )
    PopupboxManager.open({ content })
  }
  saveWords(event) {

    this.setState({
      english: this.english.current.value.toLowerCase(),
      turkish: this.turkish.current.value.toLowerCase(),
      polish: this.polish.current.value.toLowerCase(),
      spanish: this.spanish.current.value.toLowerCase()
    });
  }

  translateWords() {
    this.setState({
      t_turkish: this.t_turkish.current.value.toLowerCase()
    })
    fetch('http://localhost:3000/api/translate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        t_turkish: this.state.t_turkish
      })
    }).then(res => res.json())
      .catch(err => {
        console.log(err)
        this.setState({
          error: true
        })
      })
    if (this.state.error === true) {
      alert("Word could not add!")
    }
    fetch('http://localhost:3000/api/translate')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({
          data2: json,
          deneme: true
        }, function () {
          console.log(this.state.data2);
          
        })
      })
      .catch(error => console.log('parsing failder', error))
  }
  createCustomInsertButton = (onClick) => {
    return (
      <div>
        <Button variant="outline-success" onClick={this.update}>Add Word</Button>
        <Button variant="outline-success" onClick={this.translate}>Use Google-Translate</Button>
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
    fetch('http://localhost:3000/api')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({
          data: json.words,
          deneme: true
        }, function () {
          console.log(this.state.data);
        })
      })
      .catch(error => console.log('parsing failder', error))

  }
  //https://language-support.herokuapp.com/api/ekle
  postData() {
    fetch('http://localhost:3000/api/ekle', {
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
      .catch(err => {
        console.log(err)
        this.setState({
          error: true
        })
      })
    if (this.state.error === true) {
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
          pagination
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
