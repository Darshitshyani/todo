import axios from "axios";
import React, { useEffect, useState } from "react";
import { Todos } from "@/components/shared/todoTypes";
import ViewDetails from "./components/ViewDetails";
import Modals from "./components/Modal";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [todoList, setTodoList] = useState<Todos[]>([]);
  const [openBoxIndex, setpenBoxIndex] = useState<number | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(0);
  const [select, setSelect] = useState<number>(0);
  const [todoTask, setTodoTask] = useState<{
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  } | null>(null);
  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/todos?limit=${12}&skip=${limit}`
      );
      setTodoList(response.data.todos);
      setIsloading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  const addTodoTask = async () => {
    try {
      const response = await axios.post("https://dummyjson.com/todos/add", {
        ...todoTask!,
        userId: 5,
      });
      setTodoList([
        ...todoList,
        { ...response.data, id: todoList[todoList.length - 1]!.id + 1 },
      ]);
      setIsOpenModal(false);
      toast.success("Todo added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-full py-2 flex-col">
      <div className="h-full flex flex-col flex-grow overflow-hidden justify-center items-center">
        <div className="flex justify-between items-center gap-6">
          <h1 className="text-3xl from-neutral-50">Todo List</h1>
          <div
            className="w-[40px] h-[40px] border-2 border-dashed rounded-xl cursor-pointer border-gray-400 flex items-center justify-center text-gray-600"
            onClick={() => setIsOpenModal(true)}
          >
            <AddIcon />
          </div>
        </div>
        <div className="grid  p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 overflow-auto w-fit my-2 h-[700px]">
          {!isloading ? (
            todoList.map((todo, index) => (
              <>
                {openBoxIndex !== todo.id ? (
                  <div
                    key={index}
                    className=" w-[250px] h-[200px] flex-col rounded-2xl overflow-hidden bg-blue-600 shadow-lg flex items-center justify-center"
                  >
                    <div className="bg-white h-[50%] w-full flex justify-center items-center gap-2 flex-col">
                      <h1 className="text-2xl ">Task : #{todo.id} </h1>
                      <p>Status : {todo.completed ? "Completed" : "Pending"}</p>
                    </div>
                    <div className="h-[50%] w-full flex justify-center items-center">
                      <button
                        className="py-2 px-5 rounded-xl text-slate-200 text-lg font-[400] "
                        onClick={() => setpenBoxIndex(todo.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <ViewDetails
                    key={index}
                    todo={todo}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    setpenBoxIndex={setpenBoxIndex}
                  />
                )}
              </>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
      <Modals
        handleClose={() => setIsOpenModal(false)}
        open={isOpenModal}
        title="Add Task"
        icon={<AddIcon />}
        setValue={setTodoTask}
        action={addTodoTask}
        value={todoTask}
      />
      <div className="flex gap-2 cursor-pointer">
        <div
          className="w-[50px] h-[50px] border-2 text-gray-500 rounded-xl flex items-center justify-center border-gray-500 hover:bg-blue-500 hover:text-white hover:border-white"
          onClick={() => {
            if (limit <= 0) return;
            setLimit(limit - 12);
          }}
        >
          {"<"}
        </div>
        <div
          className={`w-[50px] h-[50px] border-2 text-gray-500 rounded-xl flex items-center justify-center border-gray-500 ${
            select === 1 ? "bg-blue-500 text-white border-white" : ""
          }`}
          onClick={() => {
            setLimit(0);
            setSelect(1);
          }}
        >
          1
        </div>
        <div
          className={`${
            select === 2 ? "bg-blue-500 text-white border-white" : ""
          } w-[50px] h-[50px] border-2 text-gray-500 rounded-xl flex items-center justify-center border-gray-500`}
          onClick={() => {
            setLimit(24);
            setSelect(2);
          }}
        >
          2
        </div>
        <div
          className={`${
            select === 3 ? "bg-blue-500 text-white border-white" : ""
          } w-[50px] h-[50px] border-2 text-gray-500 rounded-xl flex items-center justify-center border-gray-500`}
          onClick={() => {
            setLimit(36);
            setSelect(3);
          }}
        >
          3
        </div>
        <div
          className="w-[50px] h-[50px] border-2 text-gray-500 rounded-xl flex items-center justify-center border-gray-500 hover:bg-blue-500 hover:text-white hover:border-white"
          onClick={() => {
            setLimit(limit + 12);
          }}
        >
          {">"}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Todo;
