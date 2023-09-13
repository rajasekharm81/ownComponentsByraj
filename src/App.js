import { useState } from "react";

import Allroutes from "./router/routes";
import { Suspense } from "react";
import Header from "./components/header";

function App() {
  const [count, setCount] = useState(0);
  return (
    <Suspense fallback={null}>
      <Header />
      <Allroutes />
    </Suspense>
  );
}

export default App;
