import './App.css';
import React from 'react';
import image from "./reactBlog.jpg";

// importing components from another file
import { ListComponents } from "./ListComponent"; 

// imports related to DND 
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  // List 1 consisting of all MARVEL super heroes
  const [list1, setList1] = React.useState(['Captain America', 'Iron Man', 'SpiderMan', 'Thor', 'Hulk', 'Black Widow', 'Loki', 'Black Panther', 'Deadpool', 'Doctor Strange', 'Ant Man', 'Captain Marvel'])

  // List 2 consisting of all DC super heroes
  const [list2, setList2] = React.useState(['BatMan', 'SuperMan', 'Wonder Woman', 'Flash', 'Green Lantern', 'AquaMan', 'Robin', 'Cyborg', 'StarFire', 'HawkGirl', 'Shazam'])

  // Function for deleting items from list using index
  const deleteItem = (list, index) => {
    return list.splice(index, 1)
  }

  // // Function called when Drag Ends
  // const onDragEnd = (result) => {
  //   // getting the source and destination object
  //   const { source, destination } = result
  //   if (!destination)
  //     return;

  //   // if drop location is in the same place
  //   if (source.droppableId === destination.droppableId) {
  //     if (source.droppableId === "Marvel_drop_area") {
  //       // create a temporary list equal to area where dropped
  //       let tempList = list1
  //       // remove item from where it was located before it was moved
  //       const removed = deleteItem(tempList, source.index)
  //       // insert item removed from old list to the new list
  //       tempList.splice(destination.index, 0, removed)
  //       // update list to reflect newly added item.
  //       setList1(tempList)
  //     }
  //     else {
  //       let tempList = list2
  //       // assign removed item
  //       const removed = deleteItem(tempList, source.index)
  //       // insert removed item to new list
  //       tempList.splice(destination.index, 0, removed)
  //       // update list
  //       setList2(tempList)
  //     }
  //   }
  //   // if drop location is NOT the same 
  //   else {
  //     let tempList1 = list1
  //     let tempList2 = list2
  //     // from list1 to list 2
  //     if (source.droppableId === "Marvel_drop_area") {
  //       // remove from list 1
  //       const removed = deleteItem(tempList1, source.index)
  //       // add to list 2
  //       tempList2.splice(destination.index, 0, removed)
  //       // update
  //       setList1(tempList1)
  //       setList2(tempList2)
  //     } 
  //     // or from list 2 o list one
  //     else {
  //       const removed = deleteItem(tempList2, source.index)
  //       tempList1.splice(destination.index, 0, removed)
  //       setList1(tempList1)
  //       setList2(tempList2)
  //     }
  //   }
  // }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    switch(true) {
      // if drop location is not set
      case !destination:
        return;
  
      // if drop location is in the same place
      case source.droppableId === destination.droppableId:
        if (source.droppableId === "Marvel_drop_area") {
          let tempList = list1;
          // assign removed item to variable
          const removed = deleteItem(tempList, source.index);
          // insert into new location
          tempList.splice(destination.index, 0, removed);
          // update
          setList1(tempList);
          // if in same location, but not "Marvel_drop_area"
        } else {
          let tempList = list2;
          // assign removed item to a variable
          const removed = deleteItem(tempList, source.index);
          // insert into new position
          tempList.splice(destination.index, 0, removed);
          // update
          setList2(tempList);
        }
        break;
  
      // if drop location is NOT the same 
      default:
        let tempList1 = list1;
        let tempList2 = list2;
        
        if (source.droppableId === "Marvel_drop_area") {
          // assign removed item from list 1
          const removed = deleteItem(tempList1, source.index);
          // insert into list 2
          tempList2.splice(destination.index, 0, removed);
          // update both lists
          setList1(tempList1);
          setList2(tempList2);
        } else {
          // vice versa
          const removed = deleteItem(tempList2, source.index);
          tempList1.splice(destination.index, 0, removed);
          setList1(tempList1);
          setList2(tempList2);
        }
        break;
    }
  }
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <header className="App-header">
          <div style={{ display: 'flex' }}>
              {/* import components and pass props */}
              <ListComponents Marvel={list1} DC={list2} />
          </div>
        </header>
      </div>
    </DragDropContext>
  );
}

export default App;
