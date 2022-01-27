import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


function Orders ()  {
    const [orders, setOrders] = useState([])

                useEffect(() => {
                    fetch('http://localhost:4000/api/user/users')
                    .then(response => response.json())
                    .then(data => setOrders(data))
                }, [])



                return <>
                                 <div className="col-8">
                  
                        <div className="card__header">
                            <h3>latest orders</h3>
                        </div>
                        <div className="card__body">
                                {
                                    orders.map((o) => {
                                        return <>
                                             <tr key={o.id}>
                                                 <p>id</p>
                                                <td>{o.id}:</td>
                                                <p>name</p>

                                                <td>{o.name}: </td>
                                             
                                                <td>{o.email}:</td>
                                                 
                                                <td>{o.adress}:</td>
                                             
                                                <td>{o.number}:</td>
                                             
                                                <td>${o.price}:</td>
                                              
                                                <td>{o.createdAt}</td>
                                            </tr>
                                        </>
                                    })
                                }
                          
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                   
                </div>
                </>
}


export default Orders