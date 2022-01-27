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
    'ComplexId',
    'Name',
    'Price',
    'Img (url)'
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


const Foods = () => {
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
    const [foodName, setFoodName] = useState();
    const [price, setPrice] = useState([]);
    const [img, setImg] = useState([]);
   const [fastFood, setFastFood] = useState([])
   const [nationalFood, setNationalFood] = useState([])
   const [complexId, setComplexId] = useState([])

  
      



        useEffect(async() => {
        await axios.get('http://localhost:4000/api/foods/fastfood')
        // .then(response => response.json())
        .then(data => setFastFood(data.data))
        
        } , [])
        useEffect(async() => {
        await axios.get('http://localhost:4000/api/foods/nationalfood')
        // .then(response => response.json())
        .then(data => setNationalFood(data.data))
        
        } , [])
 const addFastFood = async() => {
      const formData = new FormData()
      formData.append('name', foodName)
      formData.append('price', price)
      formData.append('complexId', complexId)
      formData.append('img', img)
      await axios.post('http://localhost:4000/api/foods/fastfood', formData)
    }
 const addNationalFood = async() => {
      const formData = new FormData()
      formData.append('name', foodName)
      formData.append('price', price)
      formData.append('img', img)
      formData.append('complexId', complexId)
      await axios.post('http://localhost:4000/api/foods/nationalfood', formData)
    }




    return (
        <div>
            <h2 className="page-header">
                Foods
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
                        <h3 className='title'>Fast Foods</h3>
                            {
                                fastFood.map((fastfood) => {
                                    return <>
                                            <div className='fastfood-food'>
                                                <p className='id'>{fastfood.id}</p>
                                                <p className='complexId'>{fastfood.complexId}</p>
                                                <p className='name'>{fastfood.name}</p>
                                                <p className='price'>{fastfood.price}sum</p>
                                            </div>
                                    </>
                                })
                            } 

                           <hr />
                            <br />
                        <h3 className='title'>National Foods</h3>
                            {
                                nationalFood.map((national) => {
                                    return <>
                                             <div className='fastfood-food'>
                                                <p className='id'>{national.id}</p>
                                                <p className='complexId'>{national.complexId}</p>
                                                <p className='name'>{national.name}</p>
                                                <p className='price'>{national.price}sum</p>
                                            </div>
                                    </>
                                })
                            } 
                            
                           
                        </div>
                        <ButtonGroup onClick={openModal} className='add-btn'>Add</ButtonGroup>
          <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className='title' ref={(_subtitle) => (subtitle = _subtitle)}>Add fast food</h2>
                              
                <form action='http://localhost:4000/api/foods/fastfood' method='post' className='form'>
                    <input onChange={(e) => setFoodName(e.target.value)} type="text"  placeholder='name' />
                    <input onChange={(e) => setPrice(e.target.value)} type="number"  placeholder='price' />
                    <input onChange={(e) => setComplexId(e.target.value)} type="number"  placeholder='complex' />
                    <input onChange={(e) => setImg(e.target.value)} type="text"  placeholder='img' />
                    <Link onClick={addFastFood} className='btn' to='/foods'  type='submit'>Create</Link>
                </form>
        <h2 className='title' ref={(_subtitle) => (subtitle = _subtitle)}>Add national food</h2>
                              
                <form action='http://localhost:4000/api/foods/nationalfood' method='post' className='form'>
                    <input onChange={(e) => setFoodName(e.target.value)} type="text"  placeholder='name' />
                    <input onChange={(e) => setPrice(e.target.value)} type="number"  placeholder='price' />
                    <input onChange={(e) => setComplexId(e.target.value)} type="number"  placeholder='complex' />
                    <input onChange={(e) => setImg(e.target.value)} type="text"  placeholder='img' />
                    <Link onClick={addNationalFood} className='btn' to='/foods' type='submit'>Create</Link>
                </form>

        <CloseButton className='close-modal' onClick={closeModal}></CloseButton>

      </Modal>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Foods
