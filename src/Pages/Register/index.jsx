import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { alertBox } from "../../utils/alertBox";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../store/slices/authSlice";

// Use Google Identity Services instead of Firebase for Google sign-in.
// Make sure VITE_GOOGLE_CLIENT_ID is added to your .env

const loadGoogleScript = () => {
  return new Promise((resolve) => {
    if (window.google && window.google.accounts) return resolve();
    const id = "google-client-script";
    if (document.getElementById(id)) {
      const check = setInterval(() => {
        if (window.google && window.google.accounts) {
          clearInterval(check);
          resolve();
        }
      }, 100);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.id = id;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

const requestGoogleProfile = async () => {
  await loadGoogleScript();
  const clientId = import.meta.env.VITE_API_GOOGLE_AUTH_CLIENT_ID;
  if (!clientId) throw new Error("VITE_API_GOOGLE_AUTH_CLIENT_ID not set in .env");

  return new Promise((resolve, reject) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: async (tokenResponse) => {
        if (!tokenResponse || !tokenResponse.access_token) {
          return reject(new Error("No access token received from Google"));
        }
        try {
          const profileResp = await fetch(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
          );
          const profile = await profileResp.json();
          resolve({ tokenResponse, profile });
        } catch (err) {
          reject(err);
        }
      },
    });

    client.requestAccessToken();
  });
};

const Register = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: ""
  })

  const history = useNavigate();
  const dispatch = useDispatch();

    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
  

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  }

  const valideValue = Object.values(formFields).every(el => el)

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      alertBox("error", "Please enter full name");
      return false
    }

    if (formFields.email === "") {
      alertBox("error", "Please enter email id");
      return false
    }


    if (formFields.password === "") {
      alertBox("error", "Please enter password");
      return false
    }


    postData("/api/user/register", formFields).then((res) => {

      if (res?.error !== true) {
        setIsLoading(false);
        alertBox("success", res?.message);
        localStorage.setItem("userEmail", formFields.email)
        setFormFields({
          name: "",
          email: "",
          password: ""
        })

        history("/verify-email")
      } else {
        alertBox("error", res?.message);
        setIsLoading(false);
      }

    })


  }



  const authWithGoogle = () => {

    requestGoogleProfile()
      .then(({ profile }) => {
        const fields = {
          name: profile.name || profile.given_name || "",
          email: profile.email,
          password: null,
          avatar: profile.picture || null,
          mobile: profile.phone_number || null,
          role: "USER",
        };

        postData("/api/user/authWithGoogle", fields).then((res) => {
          if (res?.error !== true) {
            setIsLoading(false);
            alertBox("success", res?.message);
            localStorage.setItem("userEmail", fields.email);
            localStorage.setItem("accessToken", res?.data?.accesstoken);
            localStorage.setItem("refreshToken", res?.data?.refreshToken);

            dispatch(setIsLogin(true));

            history("/");
          } else {
            alertBox("error", res?.message);
            setIsLoading(false);
          }
        });
      })
      .catch((err) => {
        console.error("Google auth error:", err);
        alertBox("error", "Google authentication failed");
        setIsLoading(false);
      });


  }

  return (
    <section className="section py-5 sm:py-10">
      <div className="container">
        <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Register with a new account
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="name"
                name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                label="Full Name"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>


            <div className="form-group w-full mb-5">
              <TextField
                type="emai"
                id="email"
                name="email"
                label="Email Id"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow === false ? 'password' : 'text'}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                className="w-full"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black" onClick={() => {
                setIsPasswordShow(!isPasswordShow)
              }}>
                {
                  isPasswordShow === false ? <IoMdEye className="text-[20px] opacity-75" /> :
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                }
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" disabled={!valideValue} className="btn-org btn-lg w-full flex gap-3">
                {
                  isLoading === true ? <CircularProgress color="inherit" />
                    :
                    'Register'
                }

              </Button>
            </div>

            <p className="text-center">Already have an account? <Link className="link text-[14px] font-[600] text-primary" to="/login"> Login</Link></p>


            <p className="text-center font-[500]">Or continue with social account</p>

            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black"
              onClick={authWithGoogle}>
              <FcGoogle className="text-[20px]" /> Sign Up with Google</Button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
