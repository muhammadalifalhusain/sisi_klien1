import Button from "../Elements/Button";
import CheckBox from "../Elements/CheckBox";
import LabeledInput from "../Elements/LabeledInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import CustomizedSnackbars from "../Elements/SnackBar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const FormSignIn = () => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors, isValid}, } = useForm({
    mode: "onChange",
  });

  
  const onErrors = (errors) => console.error(errors);

  const onFormSubmit = async (data) =>{
    try{
      const response = await axios.post(
        "https://jwt-auth-eight-neon.vercel.app/login",
        {
          email : data.email,
          password: data.password,
        }
      );
      const decoded = jwtDecode(response.data.refreshToken);
    
      setOpen(true);
      setMsg({severity: "success", desc: "Login Success"});

      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate("/");
    }catch(error){
      if(error.response){
        setOpen(true);
        setMsg({severity: "error", desc: error.response.data.msg});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
      <div className="mb-6">
        <LabeledInput
          label="Email address"
          type="email"
          placeholder="hello@example.com"
          name="email"
          register={register("email", {
            required: "Email address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address format",
            },
          })}
        />
        {errors?.email && (
          <div className="text-center text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-6">
        <LabeledInput
          label="Password"
          type="password"
          placeholder="*************"
          name="password"
          register={register("password", {
            required: "Password is required",
          })}
        />
        {errors?.password && (
          <div className="text-center text-red-500">{errors.password.message}</div>
        )}
      </div>
      <div className="mb-3">
        <CheckBox
          label="Keep me signed in"
          name="status"
          register={register("status")}
        />
      </div>
      <Button 
        variant={
          !isValid
          ? "bg-gray-05 w-full text-white"
          : "bg-primary w-full text-white"
        }
        type="submit"
        disabled={!isValid ? "disabled" : ""}
        >
          Login
      </Button>
      {msg && (
        <CustomizedSnackbars
        severity= {msg.severity}
        message= {msg.desc}
        open= {open}
        setOpen= {setOpen}
        />
      )}
    </form>
  );
};

export default FormSignIn;
