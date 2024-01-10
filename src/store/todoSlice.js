import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async  function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            return await response.json();
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectedWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })
            console.log(response)
            if (!response.ok) {
                throw new Error('Can\'t delete task. Server error.');
            }
            dispatch(removeTodo({id}));
        }
        catch (error) {
            return rejectedWithValue(error.message);
        }
    }
);

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id, {refectWithValue, dispatch, getState}) {
        const todos = getState().todos.todos.find(todos => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            });
        }
        catch (error) {}
        return refectWithValue(error.message);
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
              id: new Date().toISOString(),
              text: action.payload.text,
              completed: false,
            });
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state,) => {
            state.status = 'pending';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
});

export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;