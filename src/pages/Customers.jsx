import React from 'react'

import Table from '../components/table/Table'
import './food.css'

import customerList from '../assets/JsonData/customers-list.json'

import Modal from 'react-modal'
import axios from 'axios'

import {ButtonGroup, CloseButton, FormGroup, InputGroup} from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const customerTableHead = [
    'id',
    'complex-name',
    'created time'
]
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  Modal.setAppElement('#root');
const renderHead = (item, index) => <th key={index}>{item}</th>


const Customers = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    const [name, setComplex] = useState();
    const [complex, setComplexes] = useState([]);
   

  
      



 useEffect(async() => {
 await axios.get('http://localhost:4000/api/complex/complexes')
  // .then(response => response.json())
  .then(data => setComplexes(data.data.complexes))
  
 } , [])
 const addComplex = async() => {
      const formData = new FormData()
      formData.append('name', name)
      await axios.post('http://localhost:4000/api/complex/complexes', formData)
    }
// const {complexes} = complex




    return (
        <div>
            <h2 className="page-header">
                Complexes
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">


                            <Table
                                // limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={customerList}
                            />
                            { complex.map((e) => {
                                return <>
                                    <div className='complexes'>
                                      <p className='id'>{e.id}</p>
                                      
                                      <p>{e.name}</p>
                                      <p className='time'>{e.createdAt}</p>
                                    </div>
                                </>
                              })}
                        </div>
                        <ButtonGroup onClick={openModal} className='add-btn'>Add</ButtonGroup>
          <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Complex</h2>
            
                <form action='http://localhost:4000/api/complex/complexes' method='post' className='form'>
                    <input onChange={(e) => setComplex(e.target.value)} type="text"  placeholder='name' />
                    <Link onClick={addComplex}  className='btn' to='/complex' type='submit'>Create</Link>
                </form>

        <CloseButton className='close-modal' onClick={closeModal}></CloseButton>

      </Modal>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
