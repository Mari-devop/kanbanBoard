import React, { useState, useMemo } from "react";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import { Column, Issue } from "../types";
import TaskCard from "./TaskCard";
import Header from "./Header";
import { useSelector } from "react-redux";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors, DragOverEvent } from "@dnd-kit/core";

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
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

 

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  }));

  const issues = useSelector((store: any) => store.issues.issues);

  return (
    <div>
      <Header />
      <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col, index) => (
                  <ColumnContainer
                    key={`${col.id}-${index}`}
                    column={col}
                    tasks={issues.filter(
                      (task: Issue) => task.columnId === col.id
                    )}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && <ColumnContainer column={activeColumn} tasks={[]} />}
              {activeIssue && <TaskCard issue={activeIssue} />}
            </DragOverlay>, document.body)}
        </DndContext>
      </div>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
    if (event.active.data.current?.type === "Issue") {
      setActiveIssue(event.active.data.current.issue);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    
  }
  

  function onDragOver(event: DragOverEvent) {
  }
}

export default KanbanBoard;

