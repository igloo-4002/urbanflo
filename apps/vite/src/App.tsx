import { TRPCProvider } from "./utils/api";

function App() {
  return (
    <TRPCProvider>
      <div className="items-center justify-center border">
        <span>Hello World</span>
      </div>
    </TRPCProvider>
  );
}

export default App;
