import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface FormTaskData {
  title: string;
  description: string;
  date: Date;
}

interface HeaderProps {
  search: string;
  setSearch: (search: string) => void;
  createTasks: (task: FormTaskData) => void;
}
const Header: React.FC<HeaderProps> = ({ search, setSearch, createTasks }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTaskData>();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const onSubmit = (data: FormTaskData) => {
    createTasks(data);
    reset();
    setIsCreateTaskModalOpen(false);
  };
  return (
    <div className="flex justify-between p-5 bg-gray-100">
      {isCreateTaskModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.3)]">
          <div className="bg-gray-200 rounded-lg p-8 w-1/2 relative">
            <button
              onClick={() => setIsCreateTaskModalOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 mt-4 absolute top-[10px] right-[20px]"
            >
              X
            </button>
            <h2 className="text-lg font-bold mb-10 text-center">Create Task</h2>
            <div className="flex flex-col">
              <input
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Title"
                {...register('title', { required: true })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">Title is required</span>
              )}
              <textarea
                {...register('description', { required: true })}
                className="border border-gray-300 rounded-lg p-2 mt-4"
                placeholder="Description"
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  Description is required
                </span>
              )}
              <input
                {...register('date', { required: false })}
                type="date"
                className="border border-gray-300 rounded-lg p-2 mt-4 mb-4"
                placeholder="Title"
              />
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="task name"
        />
      </div>
      <button
        onClick={() => setIsCreateTaskModalOpen(true)}
        className="w-[200px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Create new task
      </button>
    </div>
  );
};

export default Header;
