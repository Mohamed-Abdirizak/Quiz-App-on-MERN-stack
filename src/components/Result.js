import React from 'react'
import '../styles/Result.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch } from 'react-redux'
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'


export default function Result() {

  const dispatch = useDispatch();

  function onRestart()
  {
    dispatch(resetAllAction());
    dispatch(resetResultAction())
    console.log("on restart")
  }



  return (
    <div className='container'>
           <h1 className='title text-light'>Quiz Application</h1>
           
           <div className='result flex-center'>
            <div className='flex'>
              <span>Username</span>
              <span className='bold'>Fatih Jimale</span>
            </div>

            <div className='flex'>
              <span>Total Quiz Points: </span>
              <span className='bold'>50</span>
            </div>

            <div className='flex'>
              <span>Total Question: </span>
              <span className='bold'>5</span>
            </div>


            <div className='flex'>
              <span>Total Attemp: </span>
              <span className='bold'>03</span>
            </div>

            <div className='flex'>
              <span>Total Earned Pints: </span>
              <span className='bold'>30</span>
            </div>

            <div className='flex'>
              <span>quiz Result: </span>
              <span className='bold'>Passed</span>
            </div>



           </div>
           


           <div className='start'>
            <Link className='btn' to={'/'} onClick={onRestart} >Restart</Link>
           </div>

           <div className='container'>
            {/* result table.. */}
            <ResultTable />

           </div>
        




           

      
    </div>
  )
}
