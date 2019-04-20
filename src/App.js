import React from 'react';
import './App.css';
//import todosData from './todosData';
import TodoItem from './components/TodoItem';
import Input from './components/Input';
import Sorting from './components/Sorting';
//import { Switch } from '@material-ui/core';
import List from '@material-ui/core/List';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Footer from './components/Footer';
import Header from './components/Header';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      //itemsEl: todosData,
      components: localStorage.getItem('componentsTodo') !== null ? JSON.parse(localStorage.getItem('componentsTodo')) : [],
      componentsSort: localStorage.getItem('componentsTodo') !== null ? JSON.parse(localStorage.getItem('componentsTodo')) : [],
      value: 0,
      showAll: false,
      empty: localStorage.getItem('componentsTodo') === null,
      disableDelComplItem: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.checkboxHandler = this.checkboxHandler.bind(this);
    this.handleDeleteElement = this.handleDeleteElement.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.disableTab = this.disableTab.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.handleDeleteCompleted = this.handleDeleteCompleted.bind(this);
  }

  handleChange(value) {
    const uniqueId = `id${new Date().getTime()}`;
    this.setState({
      components: this.state.components.concat([{
        id: uniqueId, 
        value: value, 
        completed: false
      }]),
      componentsSort: this.state.componentsSort.concat([{
        id: uniqueId, 
        value: value, 
        completed: false
      }]),
      empty: false
    });

    if (this.state.value === 2) {
      this.setState({ showAll : true });
    } 
    else this.setState({ showAll : false });
  }

  componentDidUpdate(){
    localStorage.setItem('componentsTodo', JSON.stringify(this.state.components));
  }

  componentDidMount(){
    this.setState({
      disableDelComplItem: this.state.components.filter(item => item.completed === true).length === 0
    })
  }

  checkboxHandler(id) {
    const prevComponents = this.state.components;
    const itemIndex = prevComponents.findIndex(obj => obj.id === id);
    
    prevComponents[itemIndex].completed = !prevComponents[itemIndex].completed;
    
    this.setState({
      components: prevComponents,
      componentsSort: this.state.componentsSort,
      disableDelComplItem: this.state.components.filter(item => item.completed === true).length === 0
    });
    this.handleSorting(this.state.value);
  }

  handleDeleteElement(id) {
    this.setState(prevState =>({
      components: prevState.components.filter(item => item.id !== id),
      componentsSort: prevState.componentsSort.filter(item => item.id !== id),
      disableDelComplItem: prevState.components.filter(item => item.completed === true).length === 1
    }))
  }

  handleDeleteAll(){
    this.setState({
      components: [],
      componentsSort: [],
      empty: false
    })
    localStorage.clear();
  }

  handleDeleteCompleted(){
    this.setState({
      components: this.state.components.filter(item => item.completed !== true),
      componentsSort: this.state.components.filter(item => item.completed !== true),
      disableDelComplItem: true
    });
  }  
  
  handleSorting(value) {
    this.setState({ value: value });

    switch(value) {
      case 0: {
        this.setState({
          componentsSort: this.state.components,
          showAll : false
        });
        break;
      }
      case 1: {
        this.setState({
          componentsSort: this.state.components.filter(item => item.completed === false)
        });
        break;
      }
      case 2: {
        this.setState({
          componentsSort: this.state.components.filter(item => item.completed === true)
        });
        break;
      }
      default:
    }
  }

  disableTab() {
    const completed = this.state.components.filter(item => item.completed === true).length === 0;
    const active = this.state.components.filter(item => item.completed === false).length === 0;

    if (completed && active) {
      return 3
    }
    else if(completed){
        return 2
      }
      else if (active){
          return 1
        }
        else {
          return 0
        }
  }

  render() {
    const items = this.state.componentsSort.map(item => 
      <CSSTransition classNames="fade" timeout={200} key = {item.id}>
      <TodoItem 
        text = {item.value} 
        completed = {item.completed} 
        key = {item.id} 
        checkboxHandler = {this.checkboxHandler}
        id = {item.id}
        handleDeleteElement = {this.handleDeleteElement}
      />
       </CSSTransition>);

    return (
      <>
      <div className = 'box'>
        <Header 
          handleDeleteAll = {this.handleDeleteAll}
          handleDeleteCompleted = {this.handleDeleteCompleted}
          empty = {this.state.empty}
          length = {items.length}
          disableDelComplItem = {this.state.disableDelComplItem}
        />
        <Input handleChange = {this.handleChange}/>
        <Sorting 
          handleSorting = {this.handleSorting} 
          disableTab = {this.disableTab()}
          showAll = {this.state.showAll}
        />
        <List>
          <TransitionGroup component={null}>
            {items}
            {
              (this.state.empty || items.length === 0) && 
              <CSSTransition classNames="fade" timeout={200} exit = {false}>
                <div style = {{textAlign: 'center', fontSize: '20px'}}>Empty!</div>
              </CSSTransition>
            }
          </TransitionGroup>
        </List>
      </div>
      <Footer/>
      </>
    );
  }
}

export default App;
