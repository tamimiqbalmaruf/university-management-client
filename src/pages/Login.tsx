import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "0001",
      password: "superAdmin",
    },
  });

  const [login] = useLoginMutation();

  const onsubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Log in");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(
        `/${user.role === "superAdmin" ? "admin" : user.role}/dashboard`
      );
      toast.success("User Logged in Successfully", { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
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
