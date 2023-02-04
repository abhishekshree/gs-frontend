import { AdminAPIs } from "API/admin.js";
import { useForm } from "react-hook-form";
import { useStore } from "store/store.js";

export default function DynamicPoint({adminId,showModal, setShowModal}) {
    const { allDriverDestinations, setAllDriverDestinations } = useStore();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const reqData = {
            admin_id:adminId,
            ...data
        }
        console.log(reqData)
        const res = await AdminAPIs.postAdminDynamicPoints(reqData);
        if(!res){
            setShowModal(false);
            return;
        }
        setShowModal(false);
    }
    return (
        <>
        {showModal ? (
            <>
                <div className="w-full opacity-0 fixed inset-0 z-40">
                    <div
                        className="relative flex flex-col min-w-0 break-words lg:w-1/2 shadow-lg rounded-lg bg-blueGray-100 border-0"
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="text-blueGray-700 text-xl font-bold">Add New Destination</h6>
                                </div>
                            </div>
                            <div className="flex flex-wrap mt-4">
                                <div className="w-full lg:w-6/12 px-4"> 
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            defaultValue=""
                                            {...register("name", { required: true })}
                                        />
                                        {errors.name && <span>This field is required</span>}
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            {...register("address", { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            {...register("location", { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            AWB Number
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            {...register("awb", { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Product ID
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            {...register("product_id", { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Volume
                                        </label>
                                        <input
                                            type="number"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            {...register("volume", { required: true })}
                                        />
                                    </div>
                                </div>  
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    value="Add"
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => handleSubmit(onSubmit)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        ) : null}
        </>
    );
}
