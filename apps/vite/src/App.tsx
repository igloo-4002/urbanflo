import { TRPCProvider } from "./utils/api";

function App() {
  return (
    <TRPCProvider>
      <div className="flex h-screen w-screen items-center justify-center bg-slate-300">
        Hello World
      </div>
    </TRPCProvider>
  );
}

export default App;
