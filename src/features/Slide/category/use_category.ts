
import { addQuiz, editQuiz, removeQuiz } from "../../../api/quiz";
import { useAppDispatch } from "../../../app/hooks";
import useSWR from "swr";
import { addCategorySlide, editdCategorySlide } from "./CategorySlide";
import { removeCategory } from "../../../api/category";
import { CategoryType } from "../../../types/category";
const useCategory = () => {

    const dispatch = useAppDispatch();
    let { data, error, mutate } = useSWR("/categories" )
    
    const add = async (item: CategoryType )=>{
        const data2 = await dispatch(addCategorySlide(item));
            return [...data,data2]
    }

    const edit = async (item: CategoryType )=>{
        const data2: CategoryType = await dispatch(editdCategorySlide(item));
        return data = data?.map((item2: CategoryType)=> item2._id === data2._id ? data2 : item2 )
    }

    const remove = async (item: CategoryType )=>{
        const {data: product} = await removeCategory(item)
        return data = data.filter((item2: CategoryType)=> item2._id !== product.id  )
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

export default useCategory