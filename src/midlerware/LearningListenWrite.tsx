


export const changeInput =  (input:any) => {
    const string =  input.replace("___", '<input type="text" {...register("answer", { required: true })} />' );
    // dangerouslySetInnerHTML={{ __html: `${ changeInput(item.text)}` }}
    
    console.log(string);
    return string
}