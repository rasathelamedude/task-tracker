import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import EditTaskPage from "@/pages/EditTaskPage";

const DashboardPage = () => {
  const token = localStorage.getItem("token") || null;
  const [tasks, setTasks] = useState([]);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("/api/v1/tasks/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setTasks(data.data.tasks || []);
    };

    getTasks();
  }, [shouldRefresh]);

  return (
    <>
      {isBeingEdited && selectedTask && (
        <EditTaskPage
          id={selectedTask.id}
          name={selectedTask.name}
          description={selectedTask.description}
          status={selectedTask.status}
          onClose={() => {
            setIsBeingEdited(false);
            setSelectedTask(null);
          }}
          onEdit={() => setShouldRefresh((prev) => !prev)}
        />
      )}
      <Grid
        gridTemplateColumns={"repeat(3, 1fr)"}
        gap={3.5}
        w={"full"}
        alignItems={"stretch"}
        p={6}
      >
        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <TaskCard
              key={index}
              id={task._id}
              name={task.name}
              description={task.description}
              status={task.status}
              onClick={(taskClicked) => {
                setIsBeingEdited(true);
                setSelectedTask(taskClicked);
              }}
            />
          ))}
      </Grid>
    </>
  );
};

export default DashboardPage;
