import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from 'react-router-dom'
import ResultTable from './ResultTable'
import { useDispatch, useSelector } from 'react-redux'
import { resetAllAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { attempt_Number, earnPoints_number,flagResult } from '../helper/helper'

export default function Result() {

  const dispatch = useDispatch();
  const {questions: {queue, answers}, result : {result, userId}} = useSelector(state =>state)
  useEffect(()=>{
    console.log(flag);
  })

  const totalPoints = queue.length * 10
  const attemps = attempt_Number(result);
  const earnedPoints = earnPoints_number(result, answers, 10)
  const flag = flagResult(totalPoints, earnedPoints)
  const userName = useSelector(state=> state.result.userId)




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
              <span className='bold'>{userName}</span>
            </div>

            <div className='flex'>
              <span>Total Quiz Points: </span>
              <span className='bold'>{totalPoints || 0}</span>
            </div>

            <div className='flex'>
              <span>Total Question: </span>
              <span className='bold'>{queue.length || 0}</span>
            </div>


            <div className='flex'>
              <span>Total Attemp: </span>
              <span className='bold'>{attemps || 0}</span>
            </div>

            <div className='flex'>
              <span>Total Earned Pints: </span>
              <span className='bold'>{earnedPoints || 0}</span>
            </div>

            <div className='flex'>
              <span>quiz Result: </span>
              <span style={{color: `${flag ? "#2aff95" : "#ff2a66"}`}} className='bold'>{flag ? "Passed" : "Failed"}</span>
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
