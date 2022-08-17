
import './App.css';
import { useState } from 'react';
import {productTypeEnum} from './contant'
import {productItemInterface,totalProductItemInterface} from './app.interface'

import { BsBook } from 'react-icons/bs';
import { GrMusic } from 'react-icons/gr';
import {GiChocolateBar,GiPerfumeBottle} from 'react-icons/gi'
import {FaPills} from 'react-icons/fa';

const productList = [
  {
   name:'Book',price:12.49,productType:productTypeEnum.BOOKS,imported:false,
  quantity:0,icon:<BsBook/>},
  {
    name:'Music CD',price:14.99,productType:productTypeEnum.OTHERS,imported:false,
  quantity:0,icon:<GrMusic/>},
  {
    name:'Chocolate bar',price:0.85,productType:productTypeEnum.FOOD,imported:false,
  quantity:0,icon:<GiChocolateBar/>},
  {
    name:'Imported box of chocolates',price:10.00,productType:productTypeEnum.FOOD,imported:true,
  quantity:0,icon:<GiChocolateBar/>},
  {
    name:'Imported bottle of perfume',price:47.50,productType:productTypeEnum.OTHERS,imported:true,
  quantity:0,icon:<GiPerfumeBottle/>},
  {
    name:'Bottle of perfume',price:18.99,productType:productTypeEnum.OTHERS,imported:false,
  quantity:0,icon:<GiPerfumeBottle/>},
  {
    name:'Packet of headache pills',price:9.75,productType:productTypeEnum.MEDICAL,imported:false,
  quantity:0,icon:<FaPills/>}, 
  {
    name:'Imported chocolates',price:11.25,productType:productTypeEnum.FOOD, quantity:0,imported:true,icon:<GiChocolateBar/>,
  }
]



function App(): JSX.Element {

  const [productArr,] =useState<productItemInterface[]>(productList)

  const [totalArr,setTotalArr]=useState<totalProductItemInterface[]>([])
  const [salesTax,setSalestax] = useState<number>(0)
  const [totalAmount,setTotalAmount] = useState<number>(0)


  const addTocart = (item:productItemInterface)=>{
    const temp:any = [...totalArr]
   
    let it:totalProductItemInterface = {...item}
    let price:number=it.price
    let tax:number=0

    let taxPercent:number = 0

    if(item?.imported){
      taxPercent = 5
    }
    if(item.productType === productTypeEnum.OTHERS){
      taxPercent=taxPercent+10
    }
    tax = Number((price*taxPercent/100).toFixed(2))
    price = Number((tax+price).toFixed(2));
    
    setSalestax(Number((tax+salesTax).toFixed(2)))
    it.priceIncTax = price
    setTotalAmount(Number((totalAmount+price).toFixed(2)))
    temp.push(it)
    setTotalArr(temp)
  }

  

  const products  = productArr.map((item:productItemInterface,i:number)=>{
    return (
      <div key={i} className="d-f jc-sb productItem">
        <div className='d-f'>
        <div className="icon">{item.icon}</div>
        <div className="title">{item.name}</div>
        <div className="price">{item.price}</div>
        </div>
        <div className="action">
          
        <button onClick={()=>addTocart(item)} className="button">  
            <span>Add to cart</span>  
            <div className="cart">  
              <svg viewBox="0 0 36 26">  
                <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>  
                <polyline points="15 13.5 17 15.5 22 10.5"></polyline>  
            </svg>  
          </div>  
        </button> 
        </div>
      </div>
    )
  })

  const totalList = totalArr.map((item:totalProductItemInterface,i:number)=>{
    return(
      <div key={i} className="d-f">
        <div>{item.name}:- </div>
        <div>{item.priceIncTax}</div>
      </div>
    )
  }) 

  return (
    <div className="App">
     <div>
      {products}
     </div>
     <br></br>
     <br></br>
     <h2>Receipt</h2>
     <div>{totalList}</div>
     <br></br>
    
     <div>Sales Tax- {salesTax}</div>
     <br></br>
     <strong>Total Amount - {totalAmount}</strong>
     
    </div>
  );
}

export default App;
