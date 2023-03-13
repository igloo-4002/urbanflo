import { TRPCProvider } from "./utils/api";

function App() {
  return (
    <TRPCProvider>
      <div className="border">Hello World</div>
    </TRPCProvider>
  );
}

export default App;
