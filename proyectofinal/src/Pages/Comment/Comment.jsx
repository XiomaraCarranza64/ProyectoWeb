import { UserCircleIcon } from '@heroicons/react/solid';
const Comment= () => {
    return (
        <div className="font-quicksand h-full flex justify-center ">
            <div className="bg-white mt-10 mx-6 border-gray-400 shadow-2xl">
                <div className="flex justify-center flex-grow gap-5" >
                    <UserCircleIcon className=" w-6 mt-1 "/>
                      <h1 className="mt-1 ">@usuario</h1>
                 </div>

            <p className="text-justify text-xs p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi consequatur officiis sed! Nemo, quia quasi vel vitae omnis possimus repudiandae debitis iste iure dolores esse illum aliquam blanditiis! Quo, repellat.</p>
                   
            </div >
        </div >


    );
};

export default Comment;