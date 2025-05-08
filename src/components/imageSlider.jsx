import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [selectedImage, setSelectedImage] = useState(images[0]);
    return(
        <div className="w-full h-full flex flex-col items-center">
            <img src={selectedImage} alt="product" className="w-[90%] h-[450px] object-cover"></img>
            <div className="w-full mt-[20px] h-[150px] flex justify-center">
                {
                    images.map((image,index)=>{
                        return <img key={index} src={image} className={`w-[100px] h-[100px] mr-[2px] object-cover ${image == selectedImage && "border border-blue-500"} cursor-pointer`} onClick={()=>{
                            setSelectedImage(image);
                        }}></img>
                    })
                }
            </div>
        </div>
    )
}