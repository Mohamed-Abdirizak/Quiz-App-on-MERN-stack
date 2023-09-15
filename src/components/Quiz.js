import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import {useSelector, useDispatch} from 'react-redux'
import { MovePrevQuestion, moveNextQuestion } from '../hooks/FetchQuestions';
import { movePrevAction } from '../redux/question_reducer';
import { PushAnswer } from '../hooks/setResults';
import { Navigate } from 'react-router-dom';

export default function Quiz() {
  const [check, setCheck] = useState(undefined);

// kan wuxuu gooni uyahay kaliya questions reducer, wuxuuna sii kala lahaa queue,iyo trace: queue: all question noogu keedsan, trace: su'aasha aan mareeno numberkeeda.
///// note: questions: waa isla sidaa ugu qoray markaan joogo: question_reducer....
const {queue, trace} = useSelector(state => state.questions);


/// kan waa all reducers aan heesto, waa 2xabo , mid aa questions midna waa answers.. hadaa soo daabaco waxaa soo baxaayo 2dii reducer aan heeste: question iyo result.
const allStates = useSelector(state=>state)


//// kan waa kaliya result reducer.
const res = useSelector(state =>state.result.result)
const dispatch = useDispatch()
// const res = useSelector(state=>state)

// 
//  const res = useSelector(state=> state.result)

  // next button event handler
  function onNext()
  {
    if (trace < queue.length)
    {
      
      dispatch(moveNextQuestion());
      // insert anew result in the array
      if (res.length <= trace) /// halmar lee listiga wax u kudar, haddii prev lataabto oola update gareeyo listiga mid cusub haku darin.
      {
         //// resus reducer ku dar waxa aan doortay.
      dispatch(PushAnswer(check))
        
      }

// reset the value of checked variable..
      setCheck(undefined);
     
      // console.log(res)

    }

    // console.log("on next clicked")
   
  }

   // prev button event handler
   function onPrev()
  {
    if (trace > 0)
    {
      dispatch(MovePrevQuestion());


    }
    // console.log("on prev click")
  }


  function onChecked(check)
  {
    setCheck(check)
    // console.log(check)
    

  }

  // finished exam after the last question...............
  if (res.length && res.length >= queue.length)
  {
    // console.log("now display the results...")
    return <Navigate to={'/result'} replace={true} > </Navigate>
  }






  return (
    <div className='container'>
     <h1 className='title text-light'>Quiz Application</h1>

     {/* display question.... */}
     <Questions onChecked={onChecked} />
     

     <div className='grid'>
      {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div ></div>}
      
      {trace < 9 ? <button className='btn next' onClick={onNext}>Next</button> : <button className='btn next' onClick={onNext}>finish</button>}

     </div>
      
    </div>
  )
}
