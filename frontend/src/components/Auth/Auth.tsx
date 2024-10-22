import { Login } from "./Login";
import { Register } from "./Register";

export const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row gap-20 justify-center">
        <Login />
        <Register />
      </div>
    </div>
  );
};
