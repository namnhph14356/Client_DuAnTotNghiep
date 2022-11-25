import React from 'react'
import { useForm } from 'react-hook-form'
import { uploadAudio } from '../api/googleCloud'

type Props = {}

const Test3 = (props: Props) => {

    function abc (audioFileData, targetFormat) {
        try {
            targetFormat = targetFormat.toLowerCase();
            let reader = new FileReader();
            return new Promise(resolve => {
                reader.onload = function (event: any) {
                    let contentType = 'audio/'+targetFormat;
                    let data = event.target.result.split(',');
                    let b64Data = data[1];
                    let blob = getBlobFromBase64Data(b64Data, contentType);
                    let blobUrl = URL.createObjectURL(blob);
    
                    let convertedAudio = {
                        name: audioFileData.name.substring(0, audioFileData.name.lastIndexOf(".")),
                        format: targetFormat,
                        data: blobUrl
                    }
                    // console.log("convertedImage: ", convertedImage);
                    resolve(convertedAudio);
                }
                reader.readAsDataURL(audioFileData);
            });
    
        } catch (e) {
            console.log("Error occurred while converting : ", e);
        }
    }
    
    function getBlobFromBase64Data(b64Data, contentType, sliceSize=512) {
        const byteCharacters = atob(b64Data);
        const byteArrays: any = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm()

    // const uuidv4 = () => {
    //     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    //       (
    //         c ^
    //         (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    //       ).toString(16)
    //     );
    //   }

    // const onHandleSubmit = (data: any) => {
    //     console.log("data",data);
        
    //     let postid = "uuidv4";

    //     let file = data.img.files[0];
    //     let blob = file.slice(0, file.size, "audio/mp3");
    //     let newFile = new File([blob], `${postid}_audio.mp3`, { type: "audio/mp3" });
    //     let formData = new FormData();
    //     formData.append("audiofile", newFile);
    //     fetch("/upload", {
    //         method: "POST",
    //         body: formData,
    //     })
    //         .then((res) => res.text())
            
    // }

    const onHandleChange = async (data: any) => {
        console.log("data",data);
        
        let postid = "uuidv999";

        let file = data.target.files[0];
        let blob = file.slice(0, file.size, "audio/mp3");
          console.log("blob",blob);
        let newFile = new File([blob], data.target.files[0].name, { type: "audio/mp3" });
        let formData = new FormData();
        formData.append("audiofile", newFile);
        const flag = await uploadAudio(formData)
        console.log("flag",flag);

        // console.log("data",data);
        
        // let postid = "uuidv3";

        // let file = data.target.files[0];
        // let sourceAudioFile = file;
        // let targetAudioFormat = 'wav'
        // let convertedAudioDataObj: any = await abc(sourceAudioFile, targetAudioFormat);
        // let blob = convertedAudioDataObj.slice(0, file.size, "audio/wav");
        //   console.log("blob",blob);
        // let newFile = new File([blob], data.target.files[0].name, { type: "audio/wav" });
        
        // let formData = new FormData();
        // formData.append("audiofile", newFile);
        // console.log("formData",formData);

        // const flag = await uploadAudio(formData)
        // console.log("flag",flag);
            
    }


    return (
        <div>
            {/* <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
                <input {...register("img")} type="file" name="imgfile" accept="audio/*" id="imgfile" />
                <button type="submit" >Submit</button>
            </form> */}
            <input type="file" name="imgfile" accept="audio/*" id="imgfile" onChange={onHandleChange} />

        </div>
    )
}

export default Test3