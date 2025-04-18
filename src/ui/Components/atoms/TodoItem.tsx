import {ReactComponent as Done} from "../../../utils/assets/done.svg";
import {ReactComponent as Edit} from "../../../utils/assets/edit.svg";
import {ReactComponent as Del} from "../../../utils/assets/delete.svg";
import {ReactComponent as Undo} from "../../../utils/assets/undo.svg";
import {useTodoStore} from "../../../storage/zustandStores/ZustandStoreInterface";
import {useEditorStore} from "../../../storage/zustandStores/EditorStore";
import "../../css/todo-item.css"
import {TodoItemWSchedule} from "../../../core/types/todoItemInterface";
import {ReactComponent as Exc} from "../../../utils/assets/priority.svg";

/**
 * Todo item component displaying task information and action buttons
 * @param data - Todo item data including schedule and priority info
 */
export default function TodoItem({data}: { data: TodoItemWSchedule }) {
    const {removeTodo, toggleTodo} = useTodoStore();
    const {open} = useEditorStore();

    return (
        <div className="todo-elem-block" aria-label={`Task: ${data.text}`}>
            {/* Main content section */}
            <div className={`todo-elem-name ${data.completed ? 'completed' : ''}`}>
                <div className="main-info">
                    <h1>{data.text}</h1>
                    {/* Priority indicators */}
                    <p aria-label={`Priority level ${data.priority}`}>
                        {Array(data.priority!==0 ? Math.abs(4 - data.priority) : 0)
                            .fill(0)
                            .map((_, i) => (
                                <Exc
                                    key={i}
                                    className={`priority-icon level-${data.priority}`}
                                    aria-hidden="true"
                                />
                            ))}
                    </p>
                </div>

                {/* Secondary info section */}
                <div className="secondary-info">
                    <p>Deadline: {data.schedule}</p>
                    {/* Tags list */}
                    <ul className="tag-list" aria-label="Task tags">
                        {data.tags.length!==0 && <p>Tags:</p>}
                        {data.tags?.map((tag, index) => (
                            <li key={index} className="tag-item">
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Action buttons */}
            <div className="buttons">
                {/* Toggle completion button */}
                <button
                    className={!data.completed ? 'done-button' : 'undo-button'}
                    onClick={() => toggleTodo(data.id)}
                    aria-label={!data.completed ? 'Mark as done' : 'Mark as not done'}
                >
                    {!data.completed ? <Done/> : <Undo/>}
                </button>

                {/* Edit button (hidden for completed tasks) */}
                {!data.completed &&
                    <button
                        className="edit"
                        onClick={() => open('edit', data.id)}
                        aria-label="Edit task"
                    >
                        <Edit/>
                    </button>
                }

                {/* Delete button */}
                <button
                    className="delete"
                    onClick={() => removeTodo(data.id)}
                    aria-label="Delete task"
                >
                    <Del/>
                </button>
            </div>
        </div>
    );
}