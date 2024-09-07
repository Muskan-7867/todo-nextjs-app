"use client"
import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProbs = {  // type of todosprovider
 children : ReactNode  // reactnode covers wide range of possible children types include jsx, strings and string component

}

export type Todo ={
    id:string;
    task: string;
    completed: boolean;
    createdAt: Date;
    

}

export type TodoContext = {  // type of todocontext
    todos: Todo[]; // type of todos is array
    handleAddTodo:(task:string) => void; // called call signature
    toggleTodoAsCompleted:(id:string) => void;
    handleDeleteTodo:(id:string) => void;
}


export const TodoContext = createContext<TodoContext | null>(null)
export const TodosProvider = ({children}:TodosProviderProbs) =>{

    const [todos, settodos] = useState<Todo[]>( () =>{
        try {
            const  newtodos = localStorage.getItem("todos") || "[]"
            return JSON.parse(newtodos) as Todo[]
        } catch (error) {
            return []
        }
    });

   
    const toggleTodoAsCompleted =(id:string) => {
        settodos((prev) => {
            let newtodos = prev.map((todo) =>{
                if(todo.id === id){
                    return{...todo,completed: !todo.completed }
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newtodos))

            return newtodos
        })
    }

    const handleDeleteTodo = (id:string) =>{
       settodos((prev) => {
        let newtodos = prev.filter((filterTodo) => filterTodo.id != id);
        localStorage.setItem("todos", JSON.stringify(newtodos))

        return newtodos;
       })
    }
    return <TodoContext.Provider value={{todos,toggleTodoAsCompleted, handleDeleteTodo}}>
        {children}
    </TodoContext.Provider>
    
}

/// consumer
export const usetodos = () => {
    const todoconsumer = useContext(TodoContext)
    if(!todoconsumer){
        throw new Error("usetodos used outsides of provider")
    }
    return todoconsumer;
}