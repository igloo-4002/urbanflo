import { TRPCProvider } from "./utils/api";

function App() {
  return (
    <TRPCProvider>
      <div className="h-screen w-screen flex-col items-center justify-center">
        <span>Hello World</span>
      </div>
    </TRPCProvider>
  );
}

export default App;
