import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Header from './components/header'
import { Alert } from 'reactstrap';
import { Button } from 'react-bootstrap';
import Pagination from '@material-ui/lab/Pagination';
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
      translatedWords: {},
      currentPage: 1,
      totalPages: null,
      page: null,
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
      error: false,
      errorMessage: "",
      succeed: false
    };
    this.saveWords = this.saveWords.bind(this);
    this.update = this.update.bind(this);
    this.translate = this.translate.bind(this);
    this.translateWords = this.translateWords.bind(this);
    this.postData = this.postData.bind(this);
    this.fetchPages = this.fetchPages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchChange = this.searchChange.bind(this);
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
          <input type="text" placeholder="English" value={this.state.translatedWords.en}></input>
          <input type="text" placeholder="Polish" value={this.state.translatedWords.pl}></input>
          <input type="text" placeholder="Spanish" value={this.state.translatedWords.es}></input>
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
        this.setState({
          translatedWords: json
        })
        this.translate()
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
    );
  }
  componentDidMount() {
    this.fetchData();
    this.setState({ deneme: true }, function () {
      console.log(this.state.deneme);
    });
  }
  fetchData() {
    fetch('/api')
      .then(response => response.json())
      .then(json => {
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
  postData() {
    fetch('/api/ekle', {
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
      .then(json => {
        if (json.details != null) {
          this.setState({
            error: true,
            errorMessage: json.details
          }, function () { console.log(json.details) })
        }
        else {
          this.setState({
            succeed: true
          })
        }
      },
      )
      .catch(err => {
        console.log(err)
        this.setState({
          error: true,
          errorMessage: "Invalid inputs! Please check your words!"
        })
      })
    PopupboxManager.close()
  }

  searchChange(event) {
    console.log(event.target.value);
    //Reuest - > mongo find ... Db 
  }

  createCustomSearchField = (props) => {
    return (
      <input onChange={this.searchChange} />
    );
  }
  fetchPages(number) {
    fetch(`/api?page=${number}&limit=20`)
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
  handleChange = (event, value) => {
    this.setState({
      page: value
    })
    this.fetchPages(value)
  };
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
      page: 1,
      sizePerPageList: [
        {
          text: '10', value: 10
        }, {
          text: 'All', value: 50
        }],
      sizePerPage: 20,
      pageStartIndex: 0,
      paginationSize: 0,
      hideSizePerPage: true
    };

    return (
      <div style={{ width: 'auto' }}>
        <Alert color="danger" isOpen={this.state.error} toggle={() => this.setState({ error: !this.state.error })}>
          <h1>{this.state.errorMessage}</h1>
        </Alert>
        <Alert color="success" isOpen={this.state.succeed} toggle={() => this.setState({ succeed: !this.state.succeed })}>
          <h1>Word added !</h1>
        </Alert>
        <Header />
        <PopupboxContainer{...popupboxConfig}></PopupboxContainer>
        <BootstrapTable search insertRow exportCSV data={this.state.data} scrollTop={'Bottom'}
          options={options}
          tableStyle={{ border: '#0000FF 2.5px solid' }}
          containerStyle={{ border: '#FFBB73 2.5px solid' }}
          headerStyle={{ border: 'red 1px solid' }}
          bodyStyle={{ border: 'green 1px solid' }}
        >
          <TableHeaderColumn width='150' dataSort={true} dataField='english' isKey>ENGLISH</TableHeaderColumn>
          <TableHeaderColumn width='150' dataSort={true} dataField='turkish'>TURKISH</TableHeaderColumn>
          <TableHeaderColumn width='150' dataSort={true} dataField='polish'>POLISH </TableHeaderColumn>
          <TableHeaderColumn width='150' dataSort={true} dataField='spanish'>SPANISH </TableHeaderColumn>
        </BootstrapTable>
        <div>
          <Pagination count={this.state.totalPages} page={this.state.page} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default App;
