
import { NextRequest, NextResponse } from "next/server";
import Todo from "src/models/todomodel";
import { connect } from "src/utills/db";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    // Ensure the ID is provided
    if (!id) {
      return NextResponse.json(
        { message: "ID is required", success: false },
        { status: 400 }
      );
    }

    // Find and delete the Todo by ID
    const deletedTodo = await Todo.findByIdAndDelete(id);

    // If no Todo is found, return a 404 error
    if (!deletedTodo) {
      return NextResponse.json(
        { message: "Todo not found", success: false },
        { status: 404 }
      );
    }

    // Return a success response
    return NextResponse.json(
      { message: "Todo deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Todo:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the todo", success: false },
      { status: 500 }
    );
  }
}
