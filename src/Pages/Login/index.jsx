import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setIsLogin, setUserData } from "../../store/slices/authSlice";
import { alertBox } from "../../store/thunks";

// We'll use Google Identity Services (client-side OAuth) instead of Firebase.
// Make sure to add VITE_GOOGLE_CLIENT_ID to your .env with your Google OAuth client id.

// Helper: load Google Identity Services script
const loadGoogleScript = () => {
  return new Promise((resolve) => {
    if (window.google && window.google.accounts) return resolve();
    const id = "google-client-script";
    if (document.getElementById(id)) {
      // if already adding, wait a bit
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

// Request profile using token client and the Google People API
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

    // show popup to request access token
    client.requestAccessToken();
  });
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormsFields] = useState({
    email:'',
    password:''
  });

  const dispatch = useDispatch();
  const history = useNavigate();

 
  useEffect(()=>{
    window.scrollTo(0,0)
    const token = localStorage.getItem('accessToken');

    if (token !== undefined && token !== null && token !== "") {
      history("/")
    }

  },[]);

  const forgotPassword =()=>{
  
          if(formFields.email===""){
            alertBox("error", "Please enter email id");
            return false;
          }
          else{
            alertBox("success", `OTP send to ${formFields.email}`);
            localStorage.setItem("userEmail", formFields.email);
            localStorage.setItem("actionType", 'forgot-password');

            postData("/api/user/forgot-password", {
              email: formFields.email,
            }).then((res) => {
              if (res?.error === false) {
                alertBox("success", res?.message);
                history("/verify-email")
              } else {
                alertBox("error", res?.message);
              }
            })


          }
    
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields(() => {
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
  
      if (formFields.email === "") {
        alertBox("error", "Please enter email id");
        return false
      }
  
  
      if (formFields.password === "") {
        alertBox("error", "Please enter password");
        return false
      }
  
  
      postData("/api/user/login", formFields, { withCredentials: true }).then((res) => {
        console.log(res)
  
        if (res?.error !== true) {
          setIsLoading(false);
          alertBox("success", res?.message);
          setFormsFields({
            email: "",
            password: ""
          })

          localStorage.setItem("accessToken",res?.data?.accesstoken);
          localStorage.setItem("refreshToken",res?.data?.refreshToken);

          dispatch(setIsLogin(true));
  
          history("/")
        } else {
          alertBox("error", res?.message);
          setIsLoading(false);
        }
  
      })
  
  
    }



      const authWithGoogle = () => {
    
        // Use Google Identity Services to get profile (no Firebase)
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
            Login to your account
          </h3>

          <form className="w-full mt-5"  onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="emai"
                id="email"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                label="Email Id"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow===false ? 'password' : 'text'}
                id="password"
                label="Password"
                variant="outlined"
                className="w-full"
                name="password"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black" onClick={()=>{
                setIsPasswordShow(!isPasswordShow)
              }}>
              {
                isPasswordShow===false ? <IoMdEye className="text-[20px] opacity-75"/> :
                <IoMdEyeOff className="text-[20px] opacity-75"/>
              }
              </Button>
            </div>


            <a className="link cursor-pointer text-[14px] font-[600]" onClick={forgotPassword}>Forgot Password?</a>

            <div className="flex items-center w-full mt-3 mb-3">
            <Button type="submit" disabled={!valideValue} className="btn-org btn-lg w-full flex gap-3">
              {
                isLoading === true ? <CircularProgress color="inherit" />
                  :
                  'Login'
              }

            </Button>
          </div>

            <p className="text-center">Not Registered? <Link className="link text-[14px] font-[600] text-primary" to="/register"> Sign Up</Link></p>


            <p className="text-center font-[500]">Or continue with social account</p>

            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black"
            onClick={authWithGoogle}>
            <FcGoogle className="text-[20px]"/> Login with Google</Button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
