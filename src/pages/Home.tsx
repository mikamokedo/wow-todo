import React, { useEffect } from 'react';
import Board from '../components/Board';
import { Task, TaskStatus, useAuthContext } from '../hooks/AuthContext';
import Header, { FormTaskData } from '../components/Header';

const boards = [
  { name: 'Todo', id: TaskStatus.TODO, color: 'bg-gray-300' },
  { name: 'In Progress', id: TaskStatus.IN_PROGRESS, color: 'bg-yellow-300' },
  { name: 'Done', id: TaskStatus.DONE, color: 'bg-green-300' },
];

const Home = () => {
  const { tasks, handleCreateTask } = useAuthContext();
  const [filteredTasks, setFilteredTasks] = React.useState<Task[]>([]);
  const [search, setSearch] = React.useState('');
  const createTasks = (data: FormTaskData) => {
    handleCreateTask({
      ...data,
      status: TaskStatus.TODO,
      id: Math.random().toString(),
    });
  };

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) => {
        return task.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, tasks]);

  return (
    <div className="">
      <Header search={search} setSearch={setSearch} createTasks={createTasks} />
      <div className="flex justify-center gap-5 py-10">
        {boards.map((board) => (
          <Board
            name={board.name}
            tasks={filteredTasks.filter((task) => task.status === board.id)}
            key={board.id}
            color={board.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
