let counter = 0;

export const generateTodoId = (): string => {
    return `todo-${Date.now()}-${counter++}-${Math.random().toString(36).substring(2, 8)}`;
};