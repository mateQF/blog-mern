import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Form from "../components/Form";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { loginUser } = useContext(UserContext);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.username, data.password);
    } catch (error) {
      setError("loginError", { type: "manual", message: error.response.data });
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      title={"Login"}
      errors={errors}
      isLogin={true}
    />
  );
};

export default LoginPage;
