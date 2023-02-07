import CardDestination from "components/Cards/CardDestination.js";
import List from "./List.js";
import {
  DragDropContext,
  Draggable,
} from "react-beautiful-dnd";
import { useState,useEffect } from "react";
import { AdminAPIs } from "API/admin.js";
import DeleteIcon from '@mui/icons-material/Delete';
import { successNotification } from "components/alerts/Alerts.js";

const DraggableList = ({items,setItems,destinations,setDestinations,allDriverDestinations,setAllDriverDestinations,adminId,driverId}) => {
    const [buttonMode, setButtonMode] = useState("Edit");

    const removeFromList = (list, index) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addToList = (list, index, element) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;  
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            console.log(result);
            return;
        }
        let listCopy = items;
        const sourceList = listCopy;
        console.log(sourceList)
        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            result.source.index
        );
        listCopy = newSourceList;

        const destinationList = listCopy;
        listCopy = addToList(
            destinationList,
            result.destination.index,
            removedElement
        );
        setItems(listCopy);
        console.log(items)
    };

    const handleClickButton = async () => {
        if(buttonMode === "Done"){
            const res = await AdminAPIs.postRouteChange(driverId,items)
            if(!res){
                setItems(destinations);
                setButtonMode(buttonMode === "Edit" ? "Done" : "Edit");
                return
            }
            // let temp = allDriverDestinations;
            // temp[adminId][driverId] = items;
            // setAllDriverDestinations(temp);
            // setDestinations(items)
            successNotification("Route Changed Successfully")
            console.log("driverId: ",driverId)
            console.log("adminId ->",adminId)  
        }
        setButtonMode(buttonMode === "Edit" ? "Done" : "Edit");
    }

    const handleCancel = () => {
        setItems(destinations);
        setButtonMode("Edit");
    }

    const handleDelete = (e) => {
        let listCopy = items;
        listCopy.splice(e.target.parentNode.id,1)
        for(let i=0;i<listCopy.length;i++){
            listCopy[i].id = i+1;
        }
        console.log(listCopy);
        setItems(listCopy);
        console.log(items)
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handleClickButton}>
                        {buttonMode}
                    </button>
                    { buttonMode === "Done" &&
                        <button className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    }
                </div>
                <List title="List of Destinations" onDragEnd={onDragEnd} name="available">
                    {items?.map((item, index) => {
                        return(
                            <div className="bg-blueGray-100 rounded-lg p-4">
                                <h5 className="text-lg font-normal leading-normal mt-0 mb-2 text-blueGray-500">
                                    Destination {index+1} :
                                </h5>
                                <Draggable key={item.id} draggableId={item.id + ""} index={index} isDragDisabled={buttonMode === "Edit"? true : false}>
                                    {(
                                        provided,
                                        snapshot
                                    ) => (
                                        <div>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <CardDestination 
                                                    props={item}
                                                    handleDelete={handleDelete}
                                                    buttonMode={buttonMode}
                                                    index={index}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                                <div className={"p-1 flex justify-content-end "+ (buttonMode === "Edit" ? "hidden" : "block")}>
                                    <button onClick={(e) => handleDelete(e)} id={index}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                    )})}
                </List>
            </DragDropContext>
        </>
    );
};

export default DraggableList;
