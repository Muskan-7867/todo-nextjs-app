"use client"
import { usetodos } from 'src/store/todos';
import { useSearchParams } from 'next/navigation';

const Todos = () => {
    const { todos, toggleTodoAsCompleted, handleDeleteTodo } = usetodos();
    const  searchParams = useSearchParams();
    const todosData = searchParams.get("todos");
    
    console.log('🚀~ file: todos.tsx:10 ~ Todos ~ todosData:', todosData);
    let filterdata = todos;
    if(todosData === "active"){
        filterdata = filterdata.filter((task) => !task.completed)
    }    
    if(todosData === "completed"){
       filterdata = filterdata.filter((task) => task.completed)
    }


    return (
        <ul className='main-task'>
            {filterdata.map((todo) => (
                <li key={todo.id}>
                    <input
                        type='checkbox'
                        
                        id={`todo-${todo.id}`}
                        checked={todo.completed}
                        onChange={() => toggleTodoAsCompleted(todo.id)}
                    />
                    <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                    {todo.completed && (
                        <button type='button' onClick={() => handleDeleteTodo(todo.id)}>
                            Delete
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Todos;
