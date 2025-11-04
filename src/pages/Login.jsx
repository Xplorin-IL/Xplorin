    import { useForm } from "react-hook-form";

    export default function Login() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data); // { email: '...', password: '...' }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" />
        <input {...register("password")} type="password" placeholder="Password" />
        <button type="submit">Login</button>
        </form>
    );
}
