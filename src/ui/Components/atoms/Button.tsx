import React from "react";
import {ReactComponent as Add} from "../../../utils/assets/add.svg";

/**
 * Reusable button component with icon
 *
 * @param text - Button label text
 * @param fun - Click handler function
 *
 * @example
 * <Button
 *   text="Add Item"
 *   fun={() => console.log('Clicked')}
 * />
 */
export default function Button({text, fun}: { text: string, fun: React.MouseEventHandler<HTMLButtonElement>}) {
    return (
        <button
            onClick={fun}
            className="add-button"
            aria-label={text}
        >
            <p>{text}</p>
            <Add/>
        </button>
    );
}