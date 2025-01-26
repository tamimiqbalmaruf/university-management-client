import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "0001",
      password: "superAdmin",
    },
  });

  const [login, { error }] = useLoginMutation();

  const onsubmit = async (data) => {
    const res = await login(data).unwrap();
    const user = verifyToken(res.data.accessToken)
    dispatch(setUser({user: user, token: res.data.accessToken}))
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <input type="text" {...register("id")} />
      <input type="text" {...register("password")} />
      <button type="submit">Button</button>
    </form>
  );
};

export default Login;
