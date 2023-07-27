
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { useSelector, useDispatch} from "react-redux";
import ReactDOM from 'react-dom/client';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask
} from "./store/task"
import configureStore from './store/store';
import { getError } from './store/errors';


const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError())
  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(loadTasks());
  }, []);
  const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
  }
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    if (isLoading){
      return <h1>Loading...</h1>
    };
    if (error){
      return <p>{error}</p>
    }
  return <><h1>Arr</h1>
  <button onClick={() => dispatch(createTask())}>Add task</button>
  <ul>
    {state.map(el =>
    <li key={el.id}>
      <p>
        {el.title}
      </p> 
      <p>
        {`Completed:${el.completed}`}
      </p>
      <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
      <button onClick={() => changeTitle(el.id)}>Change title</button>
      <button onClick={() => deleteTask(el.id)}>Delete</button>
    <hr/>
    </li>)}
  </ul>
  </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

