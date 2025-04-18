import './ui/css/App.css';
import Button from "./ui/Components/atoms/Button";
import TodoList from "./ui/Components/molecules/TodoList";
import TodoEditorWindow from "./ui/Components/molecules/TodoEditorWindow";
import {useEditorStore} from "./storage/zustandStores/EditorStore";

function App() {
    const {isOpen, open, mode, close} = useEditorStore();

    return (
        <>
            <div className="App">
                {isOpen && <TodoEditorWindow mode={mode} onClose={close}/>}
                <header className="App-header">
                    task manager
                </header>
                <main>
                    <TodoList/>
                </main>
            </div>
            <footer>
                <p>
                    made by&nbsp;<a href="https://github.com/naku0">naku0</a>
                </p>
            </footer>
        </>
    );
}

export default App;
