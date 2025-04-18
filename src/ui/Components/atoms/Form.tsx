import React, {useState, useEffect} from "react";
import {ReactComponent as Exc} from "../../../utils/assets/priority.svg";
import {ReactComponent as Info} from "../../../utils/assets/info.svg";


/**
 * Form props interface
 * @param formData - Current form values
 * @param onTextChange - Handler for text input changes
 * @param onPriorityChange - Handler for priority selection
 * @param onTagsChange - Handler for tags updates
 * @param onSubmit - Form submission handler
 */
interface FormProps {
    formData: {
        text: string;
        deadline: string;
        priority: number;
        tags: string[];
    };
    onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPriorityChange: (priority: number) => void;
    onTagsChange: (tags: string[]) => void;
    onSubmit: (e: React.FormEvent) => void;
}

/**
 * Todo item form component
 * - Handles text, deadline, priority and tags input
 * - Validates minimum length and date constraints
 * - Provides interactive tag management
 */
const Form = ({formData, onTextChange, onPriorityChange, onTagsChange, onSubmit}: FormProps) => {
    const [tagInput, setTagInput] = useState("");
    const [currentTags, setCurrentTags] = useState(formData.tags);

    // Sync tags when parent formData changes
    useEffect(() => {
        setCurrentTags(formData.tags);
    }, [formData.priority, formData.tags]);

    return (
        <form onSubmit={onSubmit}>
            {/* Text input section */}
            <div className="form-block-input">
                <label className="form-label">
                    Reminder:
                </label>
                <input
                    type="text"
                    name="text"
                    value={formData.text}
                    onChange={onTextChange}
                    required
                    minLength={3}
                    aria-label="Reminder text"
                />
            </div>

            {/* Deadline input section */}
            <div className="form-block-input">
                <label className="form-label">
                    Deadline:
                </label>
                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={onTextChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    aria-label="Deadline"
                />
            </div>

            {/* Priority selector section */}
            <div className="priority-selector reverse-order">
                {[1, 2, 3].map(level => (
                    <button
                        key={level}
                        type="button"
                        onClick={() => onPriorityChange(level)}
                        className={`priority-btn ${formData.priority === level ? "active" : ""}`}
                        aria-label={`Priority ${level}`}
                    >
                        <Exc className={`priority-icon priority-${level}`}/>
                    </button>
                ))}
                <label className="form-label">
                    Priority:
                </label>
            </div>

            {/* Tags management section */}
            <div className="tag-creation-block">
                <label className="form-label">Tags:</label>
                <div className={`tag-collection ${formData.tags.length === 0 ? "empty" : ""}`}>
                    {formData.tags.map(tag => (
                        <span
                            key={tag}
                            onClick={() => onTagsChange(formData.tags.filter(t => t !== tag))}
                            aria-label={`Remove tag ${tag}`}
                        >
                            <p className="tag-item">{tag}</p>
                        </span>
                    ))}
                </div>

                <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault();
                            const newTag = tagInput.trim();
                            if (!newTag) return;
                            const tagExists = formData.tags.some(
                                existingTag => existingTag.toLowerCase() === newTag.toLowerCase()
                            );
                            if (!tagExists) {
                                onTagsChange([...formData.tags, newTag]);
                                setTagInput('');
                            }
                        }
                    }}
                    placeholder="Add tag"
                    aria-label="Tag input"
                />
            </div>

            <div className="editor-tips">
                <div className="tip-item">
                    <Info className="tip-icon"/>
                    <span className="tip-text">Click on tags to remove them</span>
                </div>
                <div className="tip-item">
                    <Info className="tip-icon"/>
                    <span className="tip-text">Press Enter or comma to add tags (max 10)</span>
                </div>
                <div className="tip-item">
                    <Info className="tip-icon"/>
                    <span className="tip-text">Higher priority numbers = more important</span>
                </div>
            </div>

            <button type="submit">Save</button>
        </form>
    );
};

export default Form;