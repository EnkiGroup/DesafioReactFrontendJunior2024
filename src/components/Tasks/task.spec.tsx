import { render } from "@testing-library/react";
import { TaskItem } from "../TaskItem";

describe("Task component", () => {
  const taskMock = [
    { id: "1", title: "Lavar os pratos", isDone: false },
    { id: "2", title: "Cortar a grama", isDone: true },
    { id: "3", title: "Comprar pão", isDone: false },
  ];

  it("should render tasks correctly", () => {
    const wrapper = render(
      <div>
        {taskMock.map((task) => (
          <div key={task.id!}>
            <TaskItem item={task} />
          </div>
        ))}
      </div>
    );

    taskMock.forEach((task) => {
      const taskTitleElement = wrapper.getByDisplayValue(task.title);
      expect(taskTitleElement).toBeInTheDocument();
    });
  });
});
