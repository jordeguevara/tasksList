import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import style from './dropdown.style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown,faAngleUp } from '@fortawesome/free-solid-svg-icons'

class Dropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    this.close = this.close.bind(this)
  }

  componentDidUpdate(){
    const { listOpen } = this.state
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      }
      else{
        window.removeEventListener('click', this.close)
      }
    }, 0)

    if(this.props.reset){
      this.setState({
        headerTitle: this.props.title,
        listOpen: false
      })
      this.props.setReset(false)
    }
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  close(timeOut){
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id, stateKey){
      this.props.setPriority(id);
      this.setState({
        headerTitle: title,
        listOpen: false
      }
      )
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <FontAwesomeIcon icon={faAngleUp} size="1x"/>
            : <FontAwesomeIcon icon={faAngleDown} size="1x"/>
          }
        </div>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default Dropdown