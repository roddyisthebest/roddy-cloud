import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import firebase from "../firebase";
import md5 from "md5";
import { GrSoundcloud } from "react-icons/gr";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const password = useRef();
  password.current = watch("password");
  const onSubmit = async (data) => {
    try {
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      await createdUser.user.updateProfile({
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      console.log(createdUser);

      await firebase
        .database()
        .ref("users")
        .child(createdUser.user.displayName)
        .set({
          name: createdUser.user.displayName,
          image: createdUser.user.photoURL,
        });

      setLoading(false);
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
        <div style={{ textAlign: "center" }} className="title">
          <div className="logo">
            {/* <GrSoundcloud
              style={{ fontSize: 120, fontWeight: 700, margin: "0" }}
            /> */}
            <span
              style={{
                fontSize: 65,
                fontWeight: 700,
                margin: "0",
              }}
            >
              REGISTER
            </span>
          </div>
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
          placeholder="Name"
          name="name"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {/* errors will return when field validation fails  */}
        {errors.name && errors.name.type === "required" && (
          <p>This name field is required</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>Your input exceed maximum length</p>
        )}
        <input
          placeholder="Password"
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          //   ref={password}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This name password is required</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>Password must have at least 6 characters</p>
        )}

        <input
          placeholder="Password Comfirm"
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value == password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p>This name password_confirm is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>The passwords do not match</p>
          )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input
          type="submit"
          value="SUBMIT"
          className="register"
          style={{ backgroundColor: "blue" }}
          disabled={loading}
        />
        {/* <Link to="/login" style={{ color: "gray", textDecoration: "none" }}>
          if you have Registered Id...
        </Link> */}
      </form>
    </div>
  );
}

export default Register;
