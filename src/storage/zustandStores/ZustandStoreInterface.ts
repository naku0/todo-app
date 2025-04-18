import {create} from 'zustand'
import TodoItemInterface, {TodoItemWSchedule} from "../../core/types/todoItemInterface";
import StorageInterface from "../storageInterface/StorageInterface";
import {calculateSchedule} from "../../core/BuisnessLogic/dateHelper";

/**
 * Todo Store (Flux Architecture)
 *
 * @flux_store Manages todo state and business logic
 */
interface TodoStore {
    /** @flux_state Current todo list */
    todos: TodoItemInterface[];

    /** @flux_action Load todos from storage */
    load: () => void;

    /** @flux_action Add new todo */
    addTodo: (todo: Omit<TodoItemInterface, 'id'>) => void;

    /** @flux_action Remove todo by ID */
    removeTodo: (id: string) => void;

    /** @flux_action Toggle todo completion */
    toggleTodo: (id: string) => void;

    /** @flux_action Edit todo properties */
    editTodo: (id: string, changes: Partial<TodoItemInterface>) => void;

    /** @flux_action Get todo with schedule data */
    getTodoWithSchedule: (id: string) => TodoItemWSchedule;
}

/**
 * @flux_dispatcher Uses Zustand's built-in 'set' function
 */
export const useTodoStore = create<TodoStore>((set, get) => ({
    todos: [],

    load: () => set({todos: Object.values(StorageInterface.getAll())}),

    addTodo: (todo) => {
        const newTodo = StorageInterface.addTodo({
            ...todo,
            completed: false,
            tags: todo.tags || [],
        });
        set((state) => ({todos: [...state.todos, newTodo]}));
    },

    removeTodo: (id) => {
        StorageInterface.deleteTodo(id);
        set((state) => ({todos: state.todos.filter(t => t.id !== id)}));
    },

    toggleTodo: (id) => set((state) => {
        const todo = state.todos.find(t => t.id === id);
        if (!todo) return state;
        const updated = {...todo, completed: !todo.completed};
        StorageInterface.updateTodo(id, {completed: updated.completed});
        return {todos: state.todos.map(t => t.id === id ? updated : t)};
    }),

    editTodo: (id, changes) => set((state) => {
        const updatedTodos = state.todos.map(t =>
            t.id === id ? {...t, ...changes} : t
        );
        StorageInterface.updateTodo(id, changes);
        return {todos: updatedTodos};
    }),

    getTodoWithSchedule: (id) => {
        const todo = get().todos.find(t => t.id === id);
        if (!todo) throw new Error('Todo not found');
        return {...todo, schedule: calculateSchedule(todo.deadline)};
    },
}));