import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Todos } from "@/components/shared/todoTypes";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Modals from "./Modal";
import { toast } from "react-toastify";
const ViewDetails = (
  {
    setpenBoxIndex,
    todo,
    todoList,
    setTodoList,
  }: {
    setpenBoxIndex: React.Dispatch<React.SetStateAction<number | null>>;
    todo: Todos;
    todoList: Todos[];
    setTodoList: React.Dispatch<React.SetStateAction<Todos[]>>;
  },
  index: number
) => {
  const [todoTask, setTodoTask] = useState<{
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  } | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const deleteCard = async (id: number) => {
    try {
      
      const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
  
      if (response.data.isDeleted) {
        const filterData = todoList.filter((todo) => todo.id !== id);
        setTodoList(filterData);
        toast.success("Todo deleted successfully");
      }
    }catch (error) {
      toast.error("Something went wrong");
    }
  };

  const updateCard = async () => {
    try {
      const response = await axios.put(
        `https://dummyjson.com/todos/${todoTask!.id}`,
        {
          todo: todoTask!.todo,
        }
      );

      const filterData = todoList.map((todo) => {
        if (todo.id === todoTask!.id) {
          return {
            ...todo,
            todo: todoTask!.todo,
            completed: todoTask!.completed,
          };
        }
        return todo;
      });
      setTodoList(filterData);
      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      key={index}
      className="w-[250px] px-2 py-2 h-[200px] flex-col rounded-2xl overflow-hidden bg-white shadow-lg flex "
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex justify-between px-3 items-center">
            <p className="text-lg">Todo</p>
            <CloseIcon
              className="cursor-pointer"
              onClick={() => setpenBoxIndex(null)}
            />
          </div>

          <div className="border my-1"> </div>
        </div>
        <div className="overflow-auto">
          <p className="text-lg overflow-auto">{todo.todo}</p>
        </div>

        <div className="w-full flex justify-end  items-center gap-2">
          <button
            className="bg-blue-500 py-2 rounded-lg px-2 text-white flex items-center"
            onClick={() => {
              setTodoTask(todo);
              setIsOpenModal(true);
            }}
          >
            <EditNoteIcon />
          </button>
          <button
            className="bg-red-500 py-2 rounded-lg px-2 text-white flex items-center"
            onClick={() => {
              deleteCard(todo.id);
            }}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </div>
      <Modals
        handleClose={() => setIsOpenModal(false)}
        open={isOpenModal}
        title="Edit Task"
        icon={<EditNoteIcon />}
        setValue={setTodoTask}
        action={updateCard}
        value={todoTask}
      />
    </div>
  );
};

export default ViewDetails;
