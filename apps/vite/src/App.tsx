import { TRPCProvider } from "./utils/api";

function App() {
  return (
    <TRPCProvider>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <h1>Yay</h1>
      </div>
    </TRPCProvider>
  );
}

export default App;
