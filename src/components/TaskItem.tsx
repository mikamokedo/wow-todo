import React from 'react';
import { Task } from '../hooks/AuthContext';

interface TaskItemProps {
  task: Task;
}
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="border rounded p-2 cursor-pointer hover:border-blue-300">
      <div className="font-medium mb-2">{task.title}</div>
      <div className="text-sm">{task.description}</div>
    </div>
  );
};

export default TaskItem;
