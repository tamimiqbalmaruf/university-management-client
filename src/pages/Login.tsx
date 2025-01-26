import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {

    const {register, handleSubmit} = useForm({
        defaultValues: {
            id: "0001",
            password: "superAdmin"
        }
    });

    const [login, {data, error}] = useLoginMutation();

    console.log(data);

    const onsubmit = (data) => {
       login(data)
    }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
     <input type="text"  {...register("id")} />
     <input type="text" {...register("password")} />
     <button type="submit">Button</button>
    </form>
  );
};

export default Login;
