import { Issue } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  issue: Issue;
}

function TaskCard({ issue }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: issue.id,
    data: {
      type: "Issue",
      issue,
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
            opacity-30
          bg-mainBGC p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-columnBGC  cursor-grab relative
          "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        bg-taskBGC 
        p-5 
        h-[100px]
        min-h-[100px] 
        max-w-[500px]
        items-center 
        flex-col
        text-left 
        rounded-xl 
        hover:ring-2 hover:ring-inset hover:ring-columnBGC 
        cursor-grab 
        relative"
    >
      <h2 className="
          my-auto 
          w-full
          overflow-hidden 
          whitespace-nowrap
          text-ellipsis
        "
      >
        {issue.title}
      </h2>
      <p className="
          my-auto 
          w-full
          overflow-y-auto 
          overflow-x-hidden 
          whitespace-pre-wrap
        "
      >
        Number: {issue.number}
      </p>
      <p>
        User: {issue.user.login} | Comments: {issue.comments}
      </p>
    </div>
  );
}

export default TaskCard;
