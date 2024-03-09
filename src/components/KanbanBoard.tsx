import { useState } from "react";
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import { Column, Issue } from "../types";
import TaskCard from "./TaskCard";
import Header from "./Header";
import { useSelector } from "react-redux";
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";


const defaultCols: Column[] = [
  {
    id: "todo",
    title: "Todo",
    issue: [],
  },
  {
    id: "doing",
    title: "Work in progress",
    issue: [],
  },
  {
    id: "done",
    title: "Done",
    issue: [],
  },
];

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = columns.map((col) => col.id)

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);



  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  }));

  const issues = useSelector((store: any) => store.issues.issues);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
    if (event.active.data.current?.type === "Issue") {
      setActiveIssue(event.active.data.current.issue);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveIssue(null);

    const { active, over } = event;
    if (!over) return;
    console.log(active, over);

    const activeId = active.id;
    const overId = over.id;

    console.log(activeId, overId);
    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      console.log(activeColumnIndex, overColumnIndex);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  // const onDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event;
  //   if (!over || !active) return;
  
  //   const activeId = active.id;
  //   const overId = over.id;
  
  //   if (activeId === overId) return;
  
  //   const isActiveIssue = active.data.current?.type === "Issue";
  //   const isOverIssue = over.data.current?.type === "Issue";
  
  //   if (isActiveIssue && isOverIssue) {
  //     setColumns((columns) => {
  //       const updatedColumns = columns.map((col) => {
  //         if (col.id === activeId) {
  //           const updatedIssues = [...col.issue];
  //           const draggedIssueIndex = updatedIssues.findIndex((issue) => issue.id === activeId);
  //           if (draggedIssueIndex !== -1) {
  //             const [draggedIssue] = updatedIssues.splice(draggedIssueIndex, 1);
  //             const insertIndex = updatedIssues.findIndex((issue) => issue.id === overId);
  //             updatedIssues.splice(insertIndex, 0, draggedIssue);
  //           }
  //           return { ...col, issue: updatedIssues };
  //         }
  //         return col;
  //       });
  //       return updatedColumns;
  //     });
  //   }
  // }

  

  return (
    <div>
      <Header />
      <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} 
        >
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col, index) => (
                  <ColumnContainer
                    key={`${col.id}-${index}`}
                    column={col}
                    issues={issues.filter(
                      (issue: Issue) => issue.columnId === col.id
                    )}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && <ColumnContainer column={activeColumn} issues={[]} />}
              {activeIssue && <TaskCard issue={activeIssue} />}
            </DragOverlay>, document.body)}
        </DndContext>
      </div>
    </div>
  );
}

export default KanbanBoard;
