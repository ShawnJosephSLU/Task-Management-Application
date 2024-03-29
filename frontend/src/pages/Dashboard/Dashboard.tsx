// Dashboard Component

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
    Card,
} from "@mui/material";
import Header from "../../components/Header/Header";
import Filter from "../../components/Filters/DashboardFilter";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const API_URL_TASK: string = "http://localhost:3333/task"; 

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    assignee: {
        displayName: string;
    };
    priorityLevel: string;
    notes: string[];
    status: string;
}

interface DecodedToken {
    exp?: number; 
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

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortConfig, setSortConfig] = useState<{
        key: SortableTaskKeys;
        direction: "asc" | "desc";
    } | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        const isTokenExpired = (token: string): boolean => {
            try {
              // Explicitly type the decoded token
              const decoded: DecodedToken = jwtDecode(token);
              if (typeof decoded.exp === 'undefined') {
                // Handle the case where exp is undefined
                console.error("Token does not have an expiration time.");
                return true; // Assume the token is expired or invalid
              }
              const currentTime = Date.now() / 1000; // Convert to seconds
              return decoded.exp < currentTime;
            } catch (error) {
              console.error("Failed to decode token", error);
              return true;
            }
          };


        if (!token) {
            // Check if the token does not exist

            navigate("/signin"); // if the token is not there , navigate
        }
        if (token) {

          if(isTokenExpired(token)) {// deletes the auth token if the token is expired
            localStorage.removeItem('authToken'); 
            navigate('/signin');
        }
            axios
                .get(API_URL_TASK, {
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
        }

       
    }, []);


   
    const handleApplyFilters = (filtersFromChild: {
        priorityLevel: string;
        status: string;
        user: string;
    }) => {
        const apiParams = {
            priorityLevel: filtersFromChild.priorityLevel,
            status: filtersFromChild.status,
            "assignee.userId": filtersFromChild.user,
        };

        const queryString = Object.entries(apiParams)
            .filter(([, value]) => value) // filter out empty parameters
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&");

        const requestUrl = `${API_URL_TASK}?${queryString}`;
        const token = localStorage.getItem("authToken"); // Retrieve token from local storage
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
                console.log(displayName);
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

    const sortedTasks = useMemo(() => {
        if (!sortConfig) {
            return tasks;
        }

        const priorityValue = (priorityLevel: string) => {
            // map priority to numbers for sorting
            switch (priorityLevel) {
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
                        All Available Tasks
                    </Typography>
                    <Filter onApplyFilters={handleApplyFilters} />
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
                                    <TableSortLabel
                                        active={sortConfig?.key === "assignee"}
                                        direction={
                                            sortConfig?.direction || "asc"
                                        }
                                        onClick={() => handleSort("assignee")}
                                    >
                                        Assignee
                                    </TableSortLabel>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...sortedTasks].reverse().map((task, index) => (
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </>
    );
};

export default Dashboard;
