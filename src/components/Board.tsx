import React from 'react';
import { Task } from '../hooks/AuthContext';
import TaskItem from './TaskItem';

interface BoardProps {
  name: string;
  tasks: Task[];
  color: string;
  setEditId: (id: string) => void;
}
const Board: React.FC<BoardProps> = ({ name, tasks, color, setEditId }) => {
  return (
    <div className={`rounded-md w-1/4 border`}>
      <div
        className={`mb-3 border-b text-center text-xl py-3 font-bold ${color}`}
      >
        {name}
      </div>
      <div className="p-3 gap-3 flex flex-col">
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id} onClick={setEditId} />
        ))}
      </div>
    </div>
  );
};

export default Board;
