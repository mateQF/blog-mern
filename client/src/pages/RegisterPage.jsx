import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Form from "../components/Form";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { registerUser } = useContext(UserContext);
  let errorMessage = []

  const onSubmit = async (data) => {
    try {
      await registerUser(data.username, data.password);
    } catch (error) {
      if (error.response.data.errors) {
        errorMessage = error.response.data.errors.map((error) => error.message)
      } else {
        errorMessage.push(error.response.data);
      }
      setError("registerError", {
        type: "manual",
        message: errorMessage.join("\n")
      });
    }
  };
  return (
    <Form
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      title={"Register"}
      clearErrors={clearErrors}
    />
  );
};

export default RegisterPage;
