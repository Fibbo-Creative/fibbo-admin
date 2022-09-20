import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useApi } from "../api";
import { useStateContext } from "../context/StateProvider";
import { actionTypes } from "../context/stateReducer";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ auth }, dispatch] = useStateContext();
  const [error, setError] = useState(false);
  const { loginUser } = useApi();
  const logIn = async (e) => {
    e.preventDefault();
    const dbUser = await loginUser(email, password);
    console.log(dbUser);
    if (dbUser) {
      window.localStorage.setItem("authToken", dbUser.token);
      dispatch({
        type: actionTypes.LOGIN_USER,
        token: dbUser.token,
      });
    } else {
      setError(true);
    }
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-10 border shadow-lg w-1/2 items-center py-10 px-2">
        <div className="text-4xl">Login</div>
        <div className=" flex flex-col  w-full px-10">
          <div className="mb-2 block">
            <Label htmlFor="email">Correo electrónico</Label>
          </div>
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="name@gmail.com"
            className="w-full"
            required={true}
            sizing="lg"
          />
        </div>
        <div className="w-full px-10">
          <div className="mb-2 block">
            <Label htmlFor="password">Password</Label>
          </div>
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder=""
            className="w-full"
            required={true}
            sizing="lg"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Recordarme</Label>
        </div>
        <Button type="submit" onClick={(e) => logIn(e)}>
          Iniciar Sesión
        </Button>
        {error && <div className="text-red-600">Credenciales incorrectos!</div>}
      </div>
    </div>
  );
};
