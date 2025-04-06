/**
 * Modal component for selecting/deselecting planner tasks
 * Parses the planner response to extract task headers and allows users to toggle tasks
 */
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPlannerPromptOutput } from "../../store/wizardSlice";

interface PlannerTaskModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Function to close the modal
   */
  onClose: () => void;
  /**
   * The planner prompt output text containing markdown checkboxes
   */
  plannerText: string;
}

interface Task {
  index: number;
  title: string;
  isChecked: boolean;
  originalLine: string;
  startIndex: number;
  endIndex: number;
}

/**
 * Component that displays a modal with checkboxes for planner tasks
 * Allows users to mark tasks as complete/incomplete
 */
const PlannerTaskModal = ({ 
  open, 
  onClose, 
  plannerText 
}: PlannerTaskModalProps) => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Parse the planner text to extract tasks on mount or when text changes
  useEffect(() => {
    const extractTasks = () => {
      const taskRegex = /-\s+\[([ X])\]\s+(.*?)(?=\n|$)/g;
      const extractedTasks: Task[] = [];
      let match;
      
      // Find all checkbox tasks in the text
      while ((match = taskRegex.exec(plannerText)) !== null) {
        const isChecked = match[1] === 'X';
        const title = match[2].trim();
        const originalLine = match[0];
        const startIndex = match.index;
        const endIndex = startIndex + originalLine.length;
        
        extractedTasks.push({
          index: extractedTasks.length,
          title,
          isChecked,
          originalLine,
          startIndex,
          endIndex
        });
      }
      
      setTasks(extractedTasks);
    };
    
    if (plannerText) {
      extractTasks();
    }
  }, [plannerText]);

  // Toggle task checked state
  const handleToggleTask = (index: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.index === index ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  // Apply changes to the planner text
  const handleApplyChanges = () => {
    let newText = plannerText;
    let offset = 0;
    
    // Sort tasks by startIndex (descending) to avoid position shifts
    const sortedTasks = [...tasks].sort((a, b) => b.startIndex - a.startIndex);
    
    // Replace each task line in the text
    sortedTasks.forEach(task => {
      const checkMark = task.isChecked ? 'X' : ' ';
      const newLine = `-   [${checkMark}] ${task.title}`;
      
      // Calculate positions with current offset
      const actualStart = task.startIndex + offset;
      const actualEnd = task.endIndex + offset;
      
      // Replace the line in the text
      newText = newText.substring(0, actualStart) + 
                newLine + 
                newText.substring(actualEnd);
      
      // Update offset for next replacements
      offset += newLine.length - (task.endIndex - task.startIndex);
    });
    
    // Update Redux state
    dispatch(setPlannerPromptOutput(newText));
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Select Completed Tasks</DialogTitle>
      <DialogContent>
        {tasks.length === 0 ? (
          <Typography color="text.secondary">
            No tasks found in the planner output. Tasks should be in markdown format with checkboxes (e.g., "- [ ] Task description").
          </Typography>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Check/uncheck tasks to mark them as complete or incomplete:
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {tasks.map((task) => (
                <Grid item xs={12} sm={6} key={task.index}>
                  <Box sx={{ py: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={task.isChecked}
                          onChange={() => handleToggleTask(task.index)}
                        />
                      }
                      label={task.title}
                      sx={{ 
                        '& .MuiFormControlLabel-label': { 
                          fontWeight: task.isChecked ? 'bold' : 'normal',
                          textDecoration: task.isChecked ? 'line-through' : 'none',
                          color: task.isChecked ? 'text.secondary' : 'text.primary',
                        } 
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleApplyChanges} 
          variant="contained" 
          disabled={tasks.length === 0}
        >
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlannerTaskModal;