import { TRPCProvider } from "./utils/api";

function App() {
  return (
    <TRPCProvider>
      <div className="flex h-screen w-screen items-center justify-center">
        Hello World
      </div>
    </TRPCProvider>
  );
}

export default App;
