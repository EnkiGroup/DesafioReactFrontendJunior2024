import { AddTodoAction } from "./AddTodoAction";
import { ClearCompletedAction } from "./ClearCompletedeAction";
import { DeleteTodoAction } from "./DeleteTodoAction";
import { SetAllCompletedAction } from "./SetAllCompletedAction";
import { ToggleActiveAction } from "./ToggleActiveAction";
import { UpdateDescriptionAction } from "./UpdateDescriptionAction";

export type Action = 
    AddTodoAction | 
    ClearCompletedAction | 
    DeleteTodoAction | 
    SetAllCompletedAction | 
    ToggleActiveAction | 
    UpdateDescriptionAction;