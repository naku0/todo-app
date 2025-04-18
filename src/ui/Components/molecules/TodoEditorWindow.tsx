import React, {useEffect, useState} from 'react';
import {ReactComponent as Close} from "../../../utils/assets/close.svg";
import "../../css/todo-editor.css";
import {useTodoStore} from "../../../storage/zustandStores/ZustandStoreInterface";
import Form from "../atoms/Form";
import TodoItemInterface from "../../../core/types/todoItemInterface";
import { generateTodoId } from '../../../core/BuisnessLogic/idGenerator';

/**
 * Props for TodoEditorWindow component
 * @param mode - Editor mode ('create' or 'edit')
 * @param onClose - Callback when editor is closed
 * @param todoId - Required in 'edit' mode to specify which todo to edit
 */
interface TodoEditorProps {
    mode: 'create' | 'edit';
    onClose: () => void;
    todoId?: string | null;
}

/**
 * Modal window for creating/editing todo items
 * - Manages form state and validation
 * - Handles submission to appropriate store action
 * - Pre-fills data in edit mode
 */
const TodoEditorWindow = ({mode, onClose, todoId}: TodoEditorProps) => {
    const {addTodo, editTodo, todos} = useTodoStore();
    const [formData, setFormData] = useState({
        text: '',
        deadline: '',
        priority: 0,
        tags: [] as string[],
    });

    // Initialize form data based on mode
    useEffect(() => {
        if (mode === 'edit' && todoId) {
            const currentTodo = todos.find(t => t.id === todoId);
            if (currentTodo) {
                setFormData({
                    text: currentTodo.text,
                    deadline: currentTodo.deadline,
                    priority: currentTodo.priority,
                    tags: currentTodo.tags || []
                });
            }
        } else {
            // Reset form for create mode
            setFormData({
                text: '',
                deadline: '',
                priority: 0,
                tags: []
            });
        }
    }, [mode, todoId, todos]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePriorityChange = (priority: number) => {
        setFormData(prev => ({ ...prev, priority }));
    };

    const handleTagsChange = (tags: string[]) => {
        if (tags.length > 10) return;
        setFormData(prev => ({ ...prev, tags }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const todoData: TodoItemInterface = {
            ...formData,
            id: mode === 'create' ? generateTodoId() : todoId!,
            completed: false,
            creationDateMark: new Date().toISOString()
        };

        mode === 'create' ? addTodo(todoData) : editTodo(todoData.id, todoData);
        onClose();
    };

    return (
        <div className="todo-editor-layout" role="dialog" aria-modal="true">
            <div className="todo-editor-window">
                <div className="todo-editor-header">
                    <h1>{mode === 'create' ? "Create TODO" : "Edit TODO"}</h1>
                    <button
                        onClick={onClose}
                        className="close-editor-button"
                        aria-label="Close editor"
                    >
                        <Close aria-hidden="true"/>
                    </button>
                </div>
                <div className="todo-editor-main">
                    <Form
                        formData={formData}
                        onTextChange={handleTextChange}
                        onPriorityChange={handlePriorityChange}
                        onTagsChange={handleTagsChange}
                        onSubmit={handleSubmit}
                    />

                </div>
            </div>
        </div>
    );
};

export default TodoEditorWindow;