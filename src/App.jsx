import ThemeProvider from "./theme/ThemeProvider";
import Header from "./header/Header";
import TaskForm from "./task/TaskFrom";

function App() {
 

  return (
    <>
    <ThemeProvider>
      <Header/>
      <TaskForm/>
    </ThemeProvider>
    </>
  )
}

export default App
