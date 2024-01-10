import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addTodo, fetchTodos } from './store/todoSlice';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';
import './App.css';


function App() {
    const {status, error} = useSelector(state => state.todos);
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleAction = () => {
        if(text.trim().length) {
        dispatch(addTodo({text}));
        setText('');
        }
    }

    useEffect(() => {
    dispatch(fetchTodos());
    }, [dispatch]);

    return (
    <div className='App'>
    <NewTodoForm
    value={text}
    updateText={setText}
    handleAction={handleAction}
    />

    {status  === 'pending' && <h2>Loading...</h2>}
    {error && <h2>An error occured: {error}</h2>}

    <TodoList />
    </div>
    );
}

export default App;
