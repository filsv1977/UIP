import {useEffect, useState} from 'react';
import {useTasks} from '../сontext/reducer';
import {useNavigate} from "react-router-dom";
import {fetchData} from "../api/fetchData";

export default function useDataAvailability() {
  const [tasks, setTasks] = useState([]);
  const {state, dispatch} = useTasks();
  const navigate = useNavigate();

  useEffect(()=> {
    console.log('@@@@@ 1 state.isTasksUploaded',state.isTasksUploaded, )
    console.log('@@@@@ 1 state.activeFilterBtn',state.activeFilterBtn )

    if(state.isTasksUploaded === 3 ) {
      console.log('@@@@@ 3', state.activeFilterBtn)
      console.log('@@@@@ HERE',)
      let t = state.tasks;

      if(state.activeFilterBtn===1) {
        t = state.tasks.filter(task => !task.implemented)
      }

      if(state.activeFilterBtn===2) {
        t = state.tasks.filter(task => task.implemented)
      }

      if(state.activeFilterBtn===3) {
        t = state.tasks;
      }
      setTasks(t)
      return;
    }

    if(state.isTasksUploaded === state.activeFilterBtn ) {
      console.log('@@@@@ ===',state.activeFilterBtn)
      setTasks(state.tasks)
    } else {
      console.log('@@@@@ !==',state.activeFilterBtn)
      fetchData(dispatch, state.activeFilterBtn).then(res=>setTasks(state.tasks));
    }

  }, [state.activeFilterBtn, state.tasks])


  return {
    tasks
  };
}
