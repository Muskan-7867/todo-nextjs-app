import { NextResponse } from "next/server";
import Todo from "src/models/todomodel";
import { connect } from "src/utills/db";
connect()

export async function DELETE(request) {
  try {
    const { id } = await request.json(); 
   const deletedTodo = await Todo.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "Todo deleted successfully",
        Todo: deletedTodo,
      },
      {
        status: 200, // or 204 if you prefer no content
      }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred while deleting the todo",
      },
      {
        status: 500,
      }
    );
  }
}
