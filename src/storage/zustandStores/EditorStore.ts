import { create } from 'zustand';

/**
 * Controls the todo item editor popup state
 */
interface EditorStore {
    isOpen: boolean;         // Is editor open now?
    mode: 'create' | 'edit'; // Is it creating new or editing existing todo?
    todoId: string | null;   // ID of todo being edited (null for new)
    open: (mode: 'create' | 'edit', todoId?: string) => void; // Open editor
    close: () => void;       // Close editor
}

/**
 * Store for managing todo editor state
 * Usage:
 * - useEditorStore.getState().open('edit', '123')
 * - useEditorStore.getState().close()
 */
export const useEditorStore = create<EditorStore>((set) => ({
    isOpen: false,
    mode: 'create',
    todoId: null,
    open: (mode, todoId) => set({ isOpen: true, mode, todoId: todoId || null }),
    close: () => set({ isOpen: false, todoId: null }),
}));