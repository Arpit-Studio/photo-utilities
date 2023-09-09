import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading(){
    return <div className="flex items-center justify-center h-52 w-full">
        <AiOutlineLoading3Quarters className="animate-spin w-12 h-12"/>
    </div>
}