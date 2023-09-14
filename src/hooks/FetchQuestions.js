

import { useEffect, useState } from "react"
import data, {answers} from "../database/data"
import { useDispatch } from "react-redux"
// redux actions
import * as Action from '../redux/question_reducer'

// fetch question hook to fetch api data and set value to store


export const useFetchQuestion = () =>{
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({isLoading: false, apiData: [], serverError: null })
    useEffect(() =>{
        setGetData(prev  =>({...prev, isLoading: true}));

        // async functin fetch backend data
        (async () =>{
            try { 
                let question = await data;

                if (question.length > 0)
                {
                    setGetData(prev =>({...prev, isLoading: false}));
                    setGetData(prev =>({...prev, apiData: question}));


                    // dispatch
                    dispatch(Action.startExamAction({question, answers}))

                    
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