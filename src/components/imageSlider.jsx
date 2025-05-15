import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [selectedImage, setSelectedImage] = useState(images[0]);
    return(
        <div className="w-full flex flex-col items-center">
            <img src={selectedImage} alt="product" className="w-full h-[300px] md:h-[500px] object-cover"></img>
            <div className="w-full mt-[20px] h-[90px] flex justify-center items-center">
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