(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{116:function(e,t,a){e.exports=a.p+"static/media/logo.ee7cd8ed.svg"},117:function(e,t,a){},118:function(e,t,a){},121:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(8),i=a.n(o),r=(a(70),a(18)),l=a(127),h=a(129),c=a(128),p=a(53),d=a.n(p);class u extends s.a.Component{render(){return s.a.createElement(l.a,{bg:"light",expand:"lg"},s.a.createElement(l.a.Brand,{href:"#home"},"Language Support"),s.a.createElement(l.a.Toggle,{"aria-controls":"basic-navbar-nav"}),s.a.createElement(l.a.Collapse,{id:"basic-navbar-nav"},s.a.createElement(h.a,{className:"mr-auto"},s.a.createElement(h.a.Link,{href:"#home"},"Home"),s.a.createElement(h.a.Link,{href:"https://github.com/gokhansisman"},"Github"),s.a.createElement(c.a,{title:"Feedback",id:"basic-nav-dropdown"},s.a.createElement(c.a.Item,{href:"#action/3.1"},"Recommendation"),s.a.createElement(c.a.Item,{href:"#action/3.2"},"Comment"),s.a.createElement(c.a.Divider,null),s.a.createElement(c.a.Item,{href:""},"Contact"))),s.a.createElement("img",{src:d.a,style:{width:"3.5rem",align:"right"}})))}}var m=u,g=a(61),b=(a(116),a(28));a(117),a(118),a(119),a(120),a(52);class f extends n.Component{constructor(e){super(e),this.createCustomInsertButton=e=>s.a.createElement("div",null,s.a.createElement(g.a,{variant:"outline-success",onClick:this.update},"Add Word")),this.state={data:[],deneme:!1,english:"",turkish:"",polish:"",spanish:"",sentences:"",error:!1},this.openPopupbox=this.openPopupbox.bind(this),this.update=this.update.bind(this),this.postData=this.postData.bind(this),this.validateInput=this.validateInput.bind(this),this.english=s.a.createRef(),this.turkish=s.a.createRef(),this.polish=s.a.createRef(),this.spanish=s.a.createRef(),this.sentences=s.a.createRef()}validateInput(e){return null==e.match(/\d/)}update(){const e=s.a.createElement("div",null,s.a.createElement("input",{className:"quotes",type:"text",ref:this.english,onChange:this.openPopupbox,placeholder:"English"}),s.a.createElement("input",{className:"quotes",type:"text",ref:this.turkish,onChange:this.openPopupbox,placeholder:"Turkish"}),s.a.createElement("input",{className:"quotes",type:"text",ref:this.polish,onChange:this.openPopupbox,placeholder:"Polish"}),s.a.createElement("input",{className:"quotes",type:"text",ref:this.spanish,onChange:this.openPopupbox,placeholder:"Spanish"}),s.a.createElement("button",{className:"quotes",onClick:this.postData,type:"submit"},"Save"));b.PopupboxManager.open({content:e})}openPopupbox(e){this.setState({english:this.english.current.value,turkish:this.turkish.current.value,polish:this.polish.current.value,spanish:this.spanish.current.value})}componentDidMount(){this.fetchData(),this.setState({deneme:!0},(function(){console.log(this.state.deneme)})),this.fetchData()}fetchData(){fetch("https://language-support.herokuapp.com/api").then(e=>e.json()).then(e=>{console.log(e),this.setState({data:e,deneme:!0},(function(){console.log(this.state.data)}))}).catch(e=>console.log("parsing failder",e))}postData(){fetch("https://language-support.herokuapp.com/api/ekle",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({english:this.state.english,turkish:this.state.turkish,polish:this.state.polish,spanish:this.state.spanish,sentences:this.state.sentences})}).then(e=>e.json()).catch(e=>{console.log(e),this.setState({error:!0})}),!0===this.state.error&&alert("Word could not add!"),b.PopupboxManager.close()}render(){const e={titleBar:{enable:!0,text:"Adding New Word"},fadeIn:!0,fadeInSpeed:500},t={insertBtn:this.createCustomInsertButton};return s.a.createElement("div",{style:{width:"auto"}},s.a.createElement(m,null),s.a.createElement(b.PopupboxContainer,e),s.a.createElement(r.BootstrapTable,{search:!0,insertRow:!0,exportCSV:!0,data:this.state.data,scrollTop:"Bottom",options:t,tableStyle:{border:"#0000FF 2.5px solid"},containerStyle:{border:"#FFBB73 2.5px solid"},headerStyle:{border:"red 1px solid"},bodyStyle:{border:"green 1px solid"}},s.a.createElement(r.TableHeaderColumn,{width:"150",dataField:"english",isKey:!0},"ENGLISH"),s.a.createElement(r.TableHeaderColumn,{width:"150",dataField:"turkish"},"TURKISH"),s.a.createElement(r.TableHeaderColumn,{width:"150",dataField:"polish"},"POLISH "),s.a.createElement(r.TableHeaderColumn,{width:"150",dataField:"spanish"},"SPANISH ")))}}var E=f;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})},53:function(e,t,a){e.exports=a.p+"static/media/ls.61d4dcbc.png"},65:function(e,t,a){e.exports=a(121)},70:function(e,t,a){}},[[65,1,2]]]);
//# sourceMappingURL=main.3c652133.chunk.js.map