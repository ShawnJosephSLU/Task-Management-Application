// My Todos

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
    TableSortLabel,
    Button,
    Card,
} from "@mui/material";

import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import MyToDoListFilter from "../../components/Filters/MyTodoListFilter";

const API_URL_TASK: string = "http://localhost:3333/task"; 

interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    assignee: {
        userId: string;
        displayName: string;
    };
    priorityLevel: string;
    notes: string[];
    status: string;
}

type SortableTaskKeys = keyof Pick<
    Task,
    | "title"
    | "description"
    | "dueDate"
    | "priorityLevel"
    | "status"
    | "assignee"
>;

const MyCreatedTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortConfig, setSortConfig] = useState<{
        key: SortableTaskKeys;
        direction: "asc" | "desc";
    } | null>(null);

    const navigate = useNavigate();
    const userId = localStorage.getItem("_id");
    useEffect(() => {
        const token = localStorage.getItem("authToken"); // retrieve token from local storage

        if (!token) {
            // Check if the token does not exist

            navigate("/signin"); // if the token is not there , navigate
        }

        if (token) {
            const requestUrl = `${API_URL_TASK}?assignee.userId=${userId}`; // Update the request URL to filter by assignee's user ID
            axios
                .get(requestUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`, // use token in Authorization header
                    },
                })
                .then((res) => setTasks(res.data))
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        } else {
            console.error("No token found in local storage.");
            navigate("/signin");
        }
    }, [userId]); // Added userId as a dependency to the effect

    const handleApplyFilters = (filtersFromChild: {
        priorityLevel: string;
        status: string;
        user?: string;
    }) => {
        if (!userId) {
            console.error("User ID is null. Cannot fetch tasks.");
            navigate("/signin");
            return;
        }

        const apiParams = {
            "assignee.userId": userId, // Include the userId in the API request
            priorityLevel: filtersFromChild.priorityLevel,
            status: filtersFromChild.status,
        };
        const queryString = Object.entries(apiParams)
            .filter(([, value]) => value) // filter out empty parameters
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&");

        const requestUrl = `${API_URL_TASK}?${queryString}`;
        const token = localStorage.getItem("authToken"); // get token from local storage
        const displayName = localStorage.getItem("displayName"); // get displayName from local storage

        axios
            .get(requestUrl, {
                headers: {
                    Authorization: `Bearer ${token}`, // Use token in Authorization header
                },
            })
            .then((res) => {
                console.log("Data fetched with filters:", apiParams);
                console.log("Response data:", res.data);
                console.log("User Display name", displayName);
                console.log("User Id", userId);

                setTasks(res.data); // update the state with the fetched data
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the tasks with filters:",
                    apiParams,
                    "Error:",
                    error
                );
                navigate("/signin");
            });
    };

    const getRowBackgroundColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "#C8E6C9"; // light green
            case "pending":
                return "#E0F7FA"; // light blue
            case "in progress":
                return "#E1BEE7"; // light purple
            case "canceled":
                return "#FFCDD2"; // light red
            default:
                return undefined;
        }
    };

    const handleSort = (key: SortableTaskKeys) => {
        let direction: "asc" | "desc" = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const handleEditButton = (taskId: string): void => {
        const task = tasks.find((task: Task) => task._id === taskId);

        if (task) {
            localStorage.setItem("taskId", taskId); //save the edited task in local storage
            navigate(`/edit-task`);
        } else {
            console.error("Task not found");
        }
    };

    const handleDeleteTask = (taskId: string): void => {
        console.log(taskId);

        // Ensure the taskUrl is constructed with the correct taskId for each delete request
        const taskUrl = `${API_URL_TASK}/${taskId}`;

        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No token found in local storage.");
            navigate("/signin");
            return;
        }

        axios
            .delete(taskUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                setTasks((prevTasks) =>
                    prevTasks.filter((task) => task._id !== taskId)
                );
                navigate("/mytasks");
            })
            .catch((error) => {
                console.error("There was an error deleting the task", error);
            });
    };

    const sortedTasks = useMemo(() => {
        if (!sortConfig) {
            return tasks;
        }

        const priorityValue = (priorityLevel: string) => {
            
            switch (priorityLevel) {// map priority to numbers for sorting
                case "High":
                    return 3;
                case "Medium":
                    return 2;
                case "Low":
                    return 1;
                default:
                    return 0;
            }
        };

        return [...tasks].sort((a, b) => {
            let aValue, bValue;

            if (sortConfig.key === "priorityLevel") {
                aValue = priorityValue(a.priorityLevel); // Use the mapped values for sorting when the key is 'priorityLevel'
                bValue = priorityValue(b.priorityLevel);
            } else if (sortConfig.key === "assignee") {
                aValue = a.assignee?.displayName ?? ""; // sorting by assignee's displayName
                bValue = b.assignee?.displayName ?? "";
            } else {
                aValue = a[sortConfig.key];
                bValue = b[sortConfig.key];
            }

            if (aValue < bValue) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [tasks, sortConfig]);

    const homeContentStyle = {
        marginTop: "90px",
    };

    const topBarStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        marginTop: "90px",
        marginBottom: "3rem",
    };

    return (
        <>
            <Header />

            <Card style={homeContentStyle}>
                <Toolbar style={topBarStyle}>
                    <Typography
                        variant="h5"
                        style={{ fontFamily: "monospace" }}
                    >
                        MY TASKS
                    </Typography>
                    <MyToDoListFilter onApplyFilters={handleApplyFilters} />
                </Toolbar>

                <TableContainer>
                    <Divider />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{ width: "40px" }}
                                ></TableCell>
                                <TableCell style={{ width: "200px" }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === "title"}
                                        direction={
                                            sortConfig?.direction || "asc"
                                        }
                                        onClick={() => handleSort("title")}
                                    >
                                        Title
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: "400px" }}>
                                    <TableSortLabel
                                        active={
                                            sortConfig?.key === "description"
                                        }
                                        direction={
                                            sortConfig?.direction || "asc"
                                        }
                                        onClick={() =>
                                            handleSort("description")
                                        }
                                    >
                                        Description
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: "100px" }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === "dueDate"}
                                        direction={
                                            sortConfig?.direction || "asc"
                                        }
                                        onClick={() => handleSort("dueDate")}
                                    >
                                        Due Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: "200px" }}>
                                    Assignee
                                </TableCell>
                                <TableCell style={{ width: "160px" }}>
                                    <TableSortLabel
                                        active={
                                            sortConfig?.key === "priorityLevel"
                                        }
                                        direction={
                                            sortConfig?.direction || "asc"
                                        }
                                        onClick={() =>
                                            handleSort("priorityLevel")
                                        }
                                    >
                                        Priority Level
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: "400px" }}>
                                    Notes
                                </TableCell>
                                <TableCell style={{ width: "100px" }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === "status"}
                                        direction={
                                            sortConfig?.direction || "asc"
                                        }
                                        onClick={() => handleSort("status")}
                                    >
                                        Status
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    style={{ width: "100px" }}
                                ></TableCell>
                                <TableCell
                                    style={{ width: "100px" }}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...sortedTasks].reverse().map((task, index) =>  (
                                <TableRow
                                    key={index}
                                    style={{
                                        backgroundColor: getRowBackgroundColor(
                                            task.status
                                        ),
                                    }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>
                                        {task.dueDate.slice(0, 10)}
                                    </TableCell>
                                    <TableCell>
                                        {task.assignee?.displayName ??
                                            "Unassigned"}
                                    </TableCell>
                                    <TableCell>{task.priorityLevel}</TableCell>
                                    <TableCell>
                                        {(task.notes || []).join(", ")}
                                    </TableCell>
                                    <TableCell>{task.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                handleEditButton(task._id)
                                            }
                                        >
                                            {" "}
                                           <h3 style={{ color: 'black' }}>Edit</h3> {" "}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                handleDeleteTask(task._id)
                                            }
                                        >
                                            {" "}
                                            <h3 style={{ color: 'black' }}>Delete</h3> {" "}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </>
    );
};

export default MyCreatedTasks;
