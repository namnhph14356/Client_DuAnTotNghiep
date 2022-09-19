
import { addQuiz, editQuiz, removeQuiz } from "../../../api/quiz";
import { useAppDispatch } from "../../../app/hooks";
import { addQuizSlide, editQuizSlide } from "./QuizSlide";
import useSWR from "swr";
const useQuiz = () => {

    const dispatch = useAppDispatch();
    let { data, error, mutate } = useSWR("/quizs" )

   

    const add = async (item: any )=>{
        // const {data: product} = await addQuiz(item)
        const data2 = dispatch(addQuizSlide(item));
        return [...data,data2]
    }

    const edit = async (item: any )=>{
        // const {data: product} = await editQuiz(item)
        const data2: any = dispatch(editQuizSlide(item));
        return data = data.map((item2: any)=> item2.id === data2.id ? data2 : item2 )
    }

    const remove = async (item: any )=>{
        const {data: product} = await removeQuiz(item)
        return data = data.filter((item2: any)=> item2.id !== product.id  )
    }

    return{
        data,
        error,
        mutate,
        add,
        edit,
        remove
    }

}

export default useQuiz