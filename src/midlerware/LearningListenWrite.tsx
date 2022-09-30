import { async } from "@firebase/util";



export const changeInput = (input: any) => {
    const string = input.replace("___", '<input type="text" {...register("answer", { required: true })} />');
    // dangerouslySetInnerHTML={{ __html: `${ changeInput(item.text)}` }}

    console.log(string);
    return string
}



export const speakInput = (question: any, answer:any) => {
    
   if (answer && answer.answer.length > 0) {
    // const arrayAnswer = speech.answer[0].split(",");
    const quesToArr = question.text.split("___")
    var tempQues: any = [];
    console.log(quesToArr);
    
    quesToArr.forEach((item2: any, index2: number) => {
        // console.log(question.answer[index2]);

        if (index2 < quesToArr.length - 1) {
            tempQues.push(<span key={index2 + 1}>{item2}</span>,
                <span>{answer.answer[index2]}</span>)

        } else {
            tempQues.push(<span key={index2 + 1}>{item2}</span>)
        }
        // lọc mảng thêm phần tử vào mảng mới (tempQues)
    })

    let mangAbc: any = [];
    tempQues.forEach(e => {
        mangAbc.push(e.props.children)

    });
    console.log(mangAbc);
    const result = mangAbc.join("")
    console.log(result);
    
    return result
   }
   console.log(question.text);
   
   return question.text


}
