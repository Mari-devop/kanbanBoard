import { useState, useMemo } from "react";
import { Column, Issue } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, DragOverEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import Header from "./Header";
import { useSelector } from "react-redux";



const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

// const defaultIssues: Issue[] = [
//   {
//     id: "1",
//     columnId: "todo",
//     title: "Issue title",

//     user: "Admin",
//     comments: 2,
//     body: "List admin APIs for dashboard",
    
//     number: 123,
//     state: 'open'
//   },
//   {
//     id: "3",
//     columnId: "doing",
//     title: "Issue title",
    
//     user: "Admin",
//     comments: 2,
//     body: "List admin APIs for dashboard",
   
//     number: 123,
//     state: 'open'
//   },
//   {
//     id: "5",
//     columnId: "done",
//     title: "Issue title",
 
//     user: "Admin",
//     comments: 2,
//     body: "List admin APIs for dashboard",
    
//     number: 123,
//     state: 'open'
//   }
// ]

function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>(defaultCols);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [tasks, setTasks] = useState<Issue[]>([]);
    const [activeTask, setActiveTask] = useState<Issue | null>(null);

  
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3, //300px
        },
    }))

    const issues = useSelector((store: any) => {
      return store.issues.issues;
    });

  return (
    <div> 
     
    <Header />
     
      
    <div className="
            m-auto
            flex
            min-h-screen
            w-full
            items-center
            overflow-x-auto
            overflow-y-hidden
            px-[40px]
        "
    >
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
            <div className="m-auto flex gap-4">
                <div className="flex gap-4">
                    <SortableContext items={columnsId}>
                        {columns.map((col) => (
                            <ColumnContainer 
                                key={col.id}
                                column={col} 
                                tasks={issues.filter(
                                    (task) => task.columnId === col.id
                                  )}
                            />
                        ))}
                    </SortableContext>
                </div>
            </div>
           {createPortal( 
           <DragOverlay>
                {activeColumn && <ColumnContainer 
                                    column={activeColumn} 
                                    tasks={tasks.filter(
                                        (task) => task.columnId === activeColumn.id
                                      )}
                                  />}
                {activeTask && <TaskCard task={activeTask} />}
       
           </DragOverlay>, document.body )}
        </DndContext>  
    </div>
    </div>
  );


  function onDragStart(event: DragStartEvent) {
    console.log("DRAG START", event)
    if(event.active.data.current?.type === "Column") {
        setActiveColumn(event.active.data.current.column);
        return;
    }

    if (event.active.data.current?.type === "Task") {
        setActiveTask(event.active.data.current.task);
        return;
      }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!active || !over) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    if (activeId === overId) return;
  
    const isActiveATask = active.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";
    const isOverATask = over.data.current?.type === "Task";
  
    if (!isActiveATask) return;
  
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const newTasks = [...tasks];
        const activeIndex = newTasks.findIndex((t) => t.id === activeId);
        const overIndex = newTasks.findIndex((t) => t.id === overId);
  
        if (activeIndex === -1 || overIndex === -1) {
          console.error("Active index or over index not found:", activeIndex, overIndex);
          return tasks; // Return the original tasks array and log an error
        }
  
        // Ensure that tasks are moved only if they are from different columns
        if (newTasks[activeIndex].columnId !== newTasks[overIndex].columnId) {
          newTasks[activeIndex].columnId = newTasks[overIndex].columnId;
        }
  
        // Reorder tasks within the array
        const [removedTask] = newTasks.splice(activeIndex, 1);
        newTasks.splice(overIndex, 0, removedTask);
  
        return newTasks;
      });
    } else if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const newTasks = [...tasks];
        const activeIndex = newTasks.findIndex((t) => t.id === activeId);
  
        if (activeIndex === -1) {
          console.error("Active index not found:", activeIndex);
          return tasks; // Return the original tasks array and log an error
        }
  
        // Move the task to the new column
        newTasks[activeIndex].columnId = overId;
        return newTasks;
      });
    }
  }
  
  
  
}
export default KanbanBoard