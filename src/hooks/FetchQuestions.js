

import { useEffect, useState } from "react"
// import data, {answers} from "../database/data"
import { useDispatch } from "react-redux"
// redux actions
import * as Action from '../redux/question_reducer'
import { getServerData } from "../helper/helper"

// fetch question hook to fetch api data and set value to store


export const useFetchQuestion = () =>{
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({isLoading: false, apiData: [], serverError: null })
    useEffect(() =>{
        setGetData(prev  =>({...prev, isLoading: true}));

        // async functin fetch backend data
        (async () =>{
            try { 
                // let question = await data;
                // http://localhost:5000/api/questions
            //  const q =   await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
            const [{questions, answers}] =   await getServerData("http://localhost:5000/api/questions", (data) => data)
                console.log({questions, answers})
                if (questions.length > 0)
                {
                    setGetData(prev =>({...prev, isLoading: false}));
                    setGetData(prev =>({...prev, apiData: questions}));


                    // dispatch
                    dispatch(Action.startExamAction({question: questions, answers}))

                    
                }
                else{
                    throw new Error("No questins available.....")
                }
                
            } catch (error) {
                setGetData(prev =>({...prev, isLoading: false}));
                setGetData(prev =>({...prev, serverError: error}));
                
                
            }

        })();

    }, [dispatch]);
    return [getData,setGetData]
}
// moveAction dispatch function
// export const MoveNextQuestion =() => async (dispatch) =>{
//     try {
//         console.log("entered on move next question.")
//         dispatch(Action.MoveNextAction())
        
        
//     } catch (error) {
//         console.log(error)
        
//     }

// }

/** MoveAction Dispatch function */
export const moveNextQuestion = () => async (dispatch) => {
    // try {
        dispatch(Action.moveNextAction()) /** increase trace by 1 */
    // } catch (error) {
        // console.log(error)

    // }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}