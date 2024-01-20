import React from 'react';
import { Task } from '../hooks/AuthContext';
import { useDrag } from 'react-dnd';

interface TaskItemProps {
  task: Task;
  onClick: (id: string) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const isFutureDate = task.date && new Date(task.date) < new Date();

  return (
    <div
      ref={drag}
      className="border rounded p-2 cursor-pointer hover:border-blue-300"
      onClick={() => onClick(task.id)}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="font-medium mb-2">{task.title}</div>
      <div className="text-sm">{task.description}</div>
      <div
        className={`text-xs text-right ${isFutureDate ? 'text-red-500' : ''}`}
      >
        {task?.date}
      </div>
    </div>
  );
};

export default TaskItem;
