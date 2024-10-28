import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { FormControlLabel, Radio } from "@mui/material";
type Props = {
  value: {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  } | null;
  action: () => void;
  setValue: React.Dispatch<
    React.SetStateAction<{
      id: number;
      todo: string;
      completed: boolean;
      userId: number;
    } | null>
  >;
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  icon: JSX.Element;
};
const Modals = ({
  value,
  action,
  setValue,
  open,
  handleClose,
  title,
  icon,
}: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  

  useEffect(() => {
    if (value) {
      setIsChecked(value.completed);
    }
  }, [value]);
  const handleChange = (checkedValue: boolean) => {
    setIsChecked(checkedValue);
    setValue((prev) => ({
      ...prev!,
      completed: checkedValue,
    }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex w-full h-full justify-center items-center shadow-xl">
          <div className="w-[400px] h-fit bg-white rounded-lg">
            <div className="py-2 px-2 w-full h-full">
              <p className="text-xl fle x items-center gap-2 text-gray-600">
                {" "}
                <span className="text-xl">{icon}</span>
                {title}
              </p>
              <div className="border w-full my-2"></div>
              <p className="my-2 text-gray-600">Task Name</p>
              <input
                value={value?.todo}
                onChange={(e) =>
                  setValue((prev) => ({ ...prev!, todo: e.target.value }))
                }
                className={`w-full p-2 border rounded-lg ${
                  isError ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Type Here"
              />
              <p className="my-2 text-gray-500">status</p>
              <div>
                <div className="flex  items-center ">
                  <Radio
                    checked={!isChecked}
                    onChange={(e) => {
                      handleChange(true);
                      setValue((prev) => ({
                        ...prev!,
                        completed: e.target.checked ? false : true,
                      }));
                    }}
                    name="status"
                  />
                  <p className="text-gray-500">Pending</p>
                </div>
                <div className="flex  items-center ">
                  <Radio
                    checked={isChecked}
                    onChange={(e) => {
                      handleChange(false);
                      setValue((prev) => ({
                        ...prev!,
                        completed: e.target.checked,
                      }));
                    }}
                    name="status dd"
                  />
                  <p className="text-gray-500">Completed</p>
                </div>
              </div>
              <div className="w-full flex justify-end  items-center gap-2 pt-2 border-t ">
                <button
                  className="bg-blue-500 py-2 rounded-lg px-4 text-white flex items-center"
                  onClick={() => {
                    if (!value?.todo) {
                      setIsError(true);
                      return;
                    }

                    action();
                    handleClose(false);
                  }}
                >
                  Save
                </button>
                <button
                  className="bg-gray-200  py-2 rounded-lg px-4 text-gray-500 flex items-center"
                  onClick={() => {
                    handleClose(false);

                    setValue(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Modals;
