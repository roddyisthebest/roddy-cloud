import React, { useState } from "react";
import { useForm } from "react-hook-form";
import firebase from "../firebase";
import { useRouter } from "next/router";

function login() {
  const router = useRouter();
  console.log(router);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const onSubmit = async (data) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      console.log(user);
    } catch (e) {
      setErrorFromSubmit(e.message);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };
  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div style={{ textAlign: "center" }} className="logo">
          <h3 style={{ fontSize: 70, fontWeight: 700, margin: "40px 0 " }}>
            LOGIN
          </h3>
        </div>
        <input
          placeholder="Email"
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This field is required</p>}
        {/* include validation with required or other standard HTML validation rules */}

        <input
          placeholder="Password"
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This name password is required</p>
        )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input
          type="submit"
          value="SUBMIT"
          className="register"
          //   disabled={loading}
        />
        {/* <Link to="/register" style={{ color: "gray", textDecoration: "none" }}>
          if you don't have Registered Id...
        </Link> */}
      </form>
    </div>
  );
}

export default login;
