import React, { useEffect, useState } from "react";
// import data from "../database/data";

// custome hook
import { useFetchQuestion } from "../hooks/FetchQuestions";
import {useSelector,useDispatch } from "react-redux";
import { PushAnswer, updateResult } from "../hooks/setResults";
import { updateResultAction } from "../redux/result_reducer";


export default function Questions({onChecked}) {
  const [checked, setChecked] = useState(undefined);
 const [{isLoading, apiData, serverError }] = useFetchQuestion();
// updateResult
  // const question = data[0];


  const questions = useSelector(state => state.questions.queue[state.questions.trace]) //// this variable of question comes from the store.js file... you have to use the same name as store.js
  const dispatch = useDispatch();
  // const trace = useSelector(state=> state.result.result)
  const {trace} = useSelector(state => state.questions);

  const result = useSelector(state=> state.result.result)
 useEffect(()=>{
  // console.log({trace, checked})
  dispatch(updateResult({trace, checked}))

 },[checked])


  function onSelect(i) {
    
    onChecked(i)
    setChecked(i)
    dispatch(updateResult({trace, checked}))

  }
  if (isLoading) return <h3 className="text-light">isLoading</h3>
  if (serverError) return <h3 className="text-light">{serverError || "Unknow"}</h3>

  return (  
    <div className="questions">
      <h2 className="text-light">{questions?.question}</h2>
      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={()=> onSelect(i)}
            />

            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div className={`check ${result[trace] == i ?'checked' : ''}`}></div>
          </li>
        ))}
  
      </ul>
    </div>
  );
}
