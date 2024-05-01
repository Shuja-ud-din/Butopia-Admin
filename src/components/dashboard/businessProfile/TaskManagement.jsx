import React, { useEffect, useState } from "react";
import "../../../App.css";
import axios from "axios";
import arrow from "../../../assets/arrow-down.svg";
import add_task from "../../../assets/add_task.svg";
import edit from "../../../assets/edit.svg";
import del from "../../../assets/delete.svg";
import taskIcon from "../../../assets/task.svg";
import expand from "../../../assets/expand.svg"; // The icon for expanding
import collapse from "../../../assets/down_arrow.svg"; // The icon for collapsing

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTasks, setExpandedTasks] = useState(new Set());
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get("https://api.agerlink.it/api/v1/task", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };
  // Apply similar logic to handleCreateTask, handleEditTask, and handleDeleteTask

  const handleCreateTask = async (parentId = null) => {
    const taskName = prompt("Enter Task Name:");
    if (!taskName) return;

    const data = { name: taskName, parent: parentId };

    try {
      await axios.post("https://api.agerlink.it/api/v1/task", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleEditTask = async (taskId) => {
    const taskName = prompt("Enter new Task Name:");
    if (!taskName) return;

    try {
      await axios.patch(
        `https://api.agerlink.it/api/v1/task/${taskId}`,
        { name: taskName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`https://api.agerlink.it/api/v1/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTask = (taskId) => {
    const newExpandedTasks = new Set(expandedTasks);
    if (newExpandedTasks.has(taskId)) {
      newExpandedTasks.delete(taskId);
    } else {
      newExpandedTasks.add(taskId);
    }
    setExpandedTasks(newExpandedTasks);
  };

  const renderTasks = (tasks) => {
    return tasks.map((task) => (
      <div
        key={task._id}
        className=" w-full  px-5 mt-5 w-full bg-[white] rounded-lg"
      >
        <div className="flex justify-between">
          <div
            className="flex items-center gap-1 cursor-pointer "
            onClick={() => toggleTask(task._id)}
          >
            <div>
              {/* {task.types && task.types.length > 0 && ( */}
              <img
                src={collapse}
                alt="Toggle"
                className={`w-[20px] h-[20px] ${
                  expandedTasks.has(task._id) ? "" : "transform rotate-[270deg]"
                }`}
              />
              {/* )} */}
            </div>
            <span className="font-[500] text-[14px]">{task.name}</span>
          </div>

          <div className="flex gap-3 items-center">
            <button onClick={() => handleEditTask(task._id)}>
              <img src={edit} className="w-[24px] h-[24px]" />
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>
              <img src={del} alt="Delete" className="w-[24px] h-[24px]" />
            </button>
          </div>
        </div>

        {expandedTasks.has(task._id) && task.types && (
          <>
            <div
              className="ml-3 flex mt-5 cursor-pointer"
              onClick={() => handleCreateTask(task._id)}
            >
              <img src={add_task} alt="" />
              <p className="ml-2 font-[400] text-[14px] ">
                Create New Sub-Task
              </p>
            </div>
            <div className="task-children">{renderTasks(task.types)}</div>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="p-7" style={{ position: "relative" }}>
      {" "}
      {/* Ensure the container has a relative position */}
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex justify-between items-center pb-5">
            <h1 className="text-[#039443] font-[600] text-[24px]">Tasks</h1>

            <button
              className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
              onClick={handleCreateTask}
            >
              <p className="p-2">Create New Task</p>
            </button>
          </div>
          <div className="tasks-container h-[66vh] overflow-auto text-[#858992]">
            {tasks.map((task, index) => {
              return (
                <div
                  className=" w-full  p-5 w-full bg-[white] border border-[#F2F2F2]  mb-3 rounded-lg"
                  key={index}
                >
                  <div className="flex justify-between pb-5 border-b border-[#F2F2F2]">
                    <div className="flex items-center gap-1">
                      <img src={taskIcon} className="mr-2" alt="" />
                      <span className="font-[500] text-[18px] ">
                        {task.name}
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <button onClick={() => handleEditTask(task._id)}>
                        <img src={edit} className="w-[24px] h-[24px]" />
                      </button>
                      <button onClick={() => handleDeleteTask(task._id)}>
                        <img
                          src={del}
                          alt="Delete"
                          className="w-[24px] h-[24px]"
                        />
                      </button>
                    </div>
                  </div>

                  {task.types &&
                    task.types.length > 0 &&
                    renderTasks(task.types)}

                  <div
                    className="flex mt-5 cursor-pointer"
                    onClick={() => handleCreateTask(task._id)}
                  >
                    <img src={add_task} alt="" />
                    <p className="ml-2 font-[400] text-[14px] ">
                      Create New Sub-Task
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManagement;
