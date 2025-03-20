import React, {useState} from 'react';
import {Box, Container, Grid2, List, ListItem, ListItemIcon, ListItemText, Paper, Typography} from '@mui/material';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

// Sample data with a `status`, `assignee`, and `priority` field in each task
const initialTasks = [
    { id: '1', title: 'Task 1', description: 'This is task 1', status: 'todo', priority: 'pending', assignee: 'John Doe' },
    { id: '2', title: 'Task 2', description: 'This is task 2', status: 'todo', priority: 'warning', assignee: 'Jane Smith' },
    { id: '3', title: 'Task 3', description: 'This is task 3', status: 'inProgress', priority: 'pending', assignee: 'Alice Cooper' },
    { id: '4', title: 'Task 4', description: 'This is task 4', status: 'done', priority: 'success', assignee: 'Bob Brown' },
];

const statuses = ['todo', 'inProgress', 'done']; // Predefined statuses

// Icon selection based on task priority
const getPriorityIcon = (priority) => {
    switch (priority) {
        case 'success':
            return <CheckCircleIcon color="success" />;
        case 'warning':
            return <ErrorIcon color="warning" />;
        case 'pending':
            return <HourglassEmptyIcon color="action" />;
        default:
            return null;
    }
};

// Board component
const Backlog = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // If dropped outside of a droppable area, return
        if (!destination) return;

        // Handle moving tasks between columns
        const updatedTasks = tasks.map((task) => {
            if (task.id === result.draggableId) {
                task.status = destination.droppableId; // Update task status
            }
            return task;
        });

        setTasks([...updatedTasks]); // Ensure that the updated tasks is an array
    };

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
            <Grid2 container spacing={3}>
                <DragDropContext onDragEnd={handleDragEnd}>
                    {statuses.map((status) => (
                        <Grid2 item xs={4} key={status}>
                            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize status */}
                                </Typography>

                                <Droppable droppableId={status}>
                                    {(provided) => (
                                        <List
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            sx={{
                                                maxHeight: '400px',
                                                overflowY: 'auto',
                                                paddingTop: 0,
                                                marginTop: 0,
                                            }}
                                        >
                                            {tasks
                                                .filter((task) => task.status === status)
                                                .map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided) => (
                                                            <ListItem
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                sx={{
                                                                    marginBottom: 2,
                                                                    padding: 1.5,
                                                                    backgroundColor: '#f5f5f5',
                                                                    borderRadius: 2,
                                                                    boxShadow: 1,
                                                                    '&:hover': {
                                                                        backgroundColor: '#e0e0e0',
                                                                        boxShadow: 4,
                                                                    },
                                                                }}
                                                            >
                                                                <ListItemIcon>
                                                                    {/* Priority Icon */}
                                                                    {getPriorityIcon(task.priority)}
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={
                                                                        <Typography variant="body1" fontWeight="bold">
                                                                            {task.title}
                                                                        </Typography>
                                                                    }
                                                                    secondary={
                                                                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 0.5 }}>
                                                                            <Typography variant="body2" color="textSecondary">
                                                                                {task.description}
                                                                            </Typography>
                                                                            <Typography variant="body2" color="textSecondary">
                                                                                <strong>Assignee:</strong> {task.assignee}
                                                                            </Typography>
                                                                        </Box>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </List>
                                    )}
                                </Droppable>
                            </Paper>
                        </Grid2>
                    ))}
                </DragDropContext>
            </Grid2>
        </Container>
    );
};

export default Backlog;
