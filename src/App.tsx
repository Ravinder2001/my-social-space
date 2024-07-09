import { withSuspense } from "./hoc/withSuspense";
import ProjectRoutes from "./routes/ProjectRoutes";

function App() {
  const ComponentWithSuspense = withSuspense(ProjectRoutes);
  return <ComponentWithSuspense />;
}

export default App;
