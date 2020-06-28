import React, { Component } from 'react';
import { BootstrapTable, SizePerPageDropDown, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import Header from './components/header'
import { Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination'
import Input from './components/Input'
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
import { size } from 'lodash';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: {},
      currentPage: 1,
      totalPages: null,
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
    this.fetchPages = this.fetchPages.bind(this);
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
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçıİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
          }}
          placeholder="Turkish"></input>
        <Button variant="dark" size="sm" style={{ color: 'olivedrab', margin: '5px', width: '%10', marginBottom: '9px' }}
          onClick={this.translateWords} type="submit">Translate</Button>
        <div>
          <input type="text" placeholder="English" value={this.state.data2.en}></input>
          <input type="text" placeholder="Polish" value={this.state.data2.pl}></input>
          <input type="text" placeholder="Spanish" value={this.state.data2.es}></input>
        </div>
      </div >
    )
    PopupboxManager.open({ content })
  }

  update() {
    const content = (
      <div>
        <input
          className="quotes" type="text" ref={this.english} onChange={e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçıİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
            this.saveWords()
          }
          }
          placeholder="English"></input>
        <input className="quotes" type="text"
          ref={this.turkish} onChange={
            e => {
              e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçıİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
              this.saveWords()
            }
          } placeholder="Turkish"></input>
        <input className="quotes" type="text" ref={this.polish} onChange={
          e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçıİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
            this.saveWords()
          }
        } placeholder="Polish"></input>
        <input className="quotes" type="text" ref={this.spanish} onChange={
          e => {
            e.target.value = e.target.value.replace(/[^A-Za-z-ğüşöçıİĞÜŞÖÇĄąĆćĘęŁłŃńÓóŚśŹźŻżÑñáÁéÉíÍóÓúÚ]/gi, "");
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
    fetch('https://language-support.herokuapp.com/api/translate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        t_turkish: this.t_turkish.current.value.toLowerCase()
      })
    }).then(res => res.json())
      .then(json => {
        console.log(json.pl)
        this.setState({
          data2: json
        })
        this.translate()
        console.log(this.state.data2)
      })
      .catch(err => {
        console.log(err)
      })
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
    //  this.fetchData();
  }
  //https://language-support.herokuapp.com/api
  fetchData() {
    fetch('https://language-support.herokuapp.com/api')
      .then(response => response.json())
      .then(json => {
        // let obj = this.state.data;
        // Object.assign(obj, { 1: json.words, 2: json.words.slice(20, 40), 3: json.words.slice(40, 60) })
        this.setState({
          data: json.words,
          totalPages: json.totalPages,
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
  fetchPages(number) {
    fetch(`https://language-support.herokuapp.com/api?page=${number}&limit=20`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json.words,
          deneme: true
        }, function () {
          console.log(this.state.data);
        })

      })
      .catch(error => console.log('parsing failder', error))

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
      insertBtn: this.createCustomInsertButton,
      // sizePerPageDropDown: this.renderSizePerPageDropDown.bind(this),
      page: 1,  // which page you want to show as default
      sizePerPageList: [
        {
          text: '10', value: 10
        }, {
          text: 'All', value: 50
        }], // you can change the dropdown list for size per page
      sizePerPage: 20,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 0,  // the pagination bar size.
      //paginationShowsTotal: this.renderShowsTotal.bind(this),  // Accept bool or function

      hideSizePerPage: true // > You can hide the dropdown for sizePerPage
      //alwaysShowAllBtns: false // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      //  onSizePerPageList: this.sizePerPageListChange.bind(this)
    };
    let active = 2;
    let items = [];
    for (let number = 1; number <= this.state.totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
    const paginationBasic = items.map(number => {
      return (
        <Pagination
          key={number}
          onClick={() => this.fetchPages(number.key)}>
          {number}
        </Pagination>
      );
    });

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
        <div style={{display: "inline-flex"}}>{paginationBasic}</div>
      </div>
    );
  }
}



export default App;
