import React from 'react';
import { Task } from '../hooks/AuthContext';

interface TaskItemProps {
  task: Task;
  onClick: (id: string) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, onClick }) => {
  return (
    <div
      className="border rounded p-2 cursor-pointer hover:border-blue-300"
      onClick={() => onClick(task.id)}
    >
      <div className="font-medium mb-2">{task.title}</div>
      <div className="text-sm">{task.description}</div>
      <div className="text-xs text-right">{task?.date}</div>
    </div>
  );
};

export default TaskItem;
