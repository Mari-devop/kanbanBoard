
import { Column, Issue } from '../types';
import TaskCard from './TaskCard';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  column: Column;
  issues: Issue[];
}

function ColumnContainer(props: Props) {
  const { column, issues } = props;

  const tasksIds = issues.map((issue) => issue.id);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          bg-columnBGC
          opacity-40
          border-2
          border-columnBGC
          w-[350px]
          h-[500px]
          max-h-[500px]
          rounded-md
          flex
          flex-col
        "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        bg-columnBGC
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
      "
    >
      <div
        {...attributes}
        {...listeners}
        className="
          bg-mainBGC
          text-md
          h-[60px]
          cursor-grab
          rounded-md
          rounded-b-none
          p-3
          font-bold
          border-columnBGC
          border-4
          flex
          items-center
          justify-between
        "
      >
        <div className="flex gap-2">
          <div
            className="
              flex
              justify-center
              items-center
              bg-columnBGC
              px-2
              py-1
              text-sm
              rounded-full
            "
          >
            0
          </div>
          {column.title}
        </div>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {issues.map((issue) => (
            <TaskCard key={issue.id} issue={issue} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
