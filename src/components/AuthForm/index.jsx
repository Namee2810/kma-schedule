import FaceIcon from '@material-ui/icons/Face';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { notification } from 'antd';
import userAPI from 'api/userAPI';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import "./style.scss";

function AuthForm() {
  const [checking, setChecking] = useState(false);
  let history = useHistory();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async values => {
    if (!checking) {
      setChecking(true);
      await userAPI.login({
        username: values.username,
        password: values.password
      })
        .then(res => {
          switch (res.status) {
            case 400: {
              notification.error({
                message: "Mã sinh viên hoặc mật khẩu không chính xác 😢",
              });
              setTimeout(() => {
                setChecking(false);
              }, 500);
              break
            }
            case 200: {
              notification.success({
                message: "Đăng nhập thành công 🎉",
              });
              if (res.token) localStorage.setItem("token", res.token);
              history.push("/dashboard");
              break;
            }
            default: {
              notification.error({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau 😢",
              });
              setTimeout(() => {
                setChecking(false);
              }, 500);
            }
          }
        })
        .catch(err => {
          notification.error({
            message: "Đã xảy ra lỗi, vui lòng thử lại sau 😢 !",
          });
          console.log(err)
          setTimeout(() => {
            setChecking(false);
          }, 500);
        });
    }
  }
  useEffect(() => {
    console.log(errors);
    if (errors.username) {
      notification.warn({ message: "Vui lòng nhập mã sinh viên !" })
      return
    }
    if (errors.password) {
      notification.warn({ message: "Vui lòng nhập mật khẩu !" })
    }
  }, [errors])
  useEffect(() => {
    const form_submit = document.getElementById("form_submit");
    if (checking) {
      form_submit.classList.add("form-checking");
      form_submit.textContent = "Đang kiểm tra ..."
    }
    else {
      form_submit.classList.remove("form-checking");
      form_submit.textContent = "Đăng nhập"
    }
  }, [checking])

  return (
    <div className="AuthForm" id="AuthForm">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form_field">
          <FaceIcon className="form_field-icon" style={{ fontSize: "30px" }} />
          <input type="text" name="username"
            className="form_input"
            placeholder="Mã sinh viên"
            autoComplete="off"
            ref={register({ required: true })} />
        </div>
        <div className="form_field">
          <LockOutlinedIcon className="form_field-icon" style={{ fontSize: "30px" }} />
          <input type="password" name="password"
            className="form_input"
            placeholder="Mật khẩu"
            autoComplete="off"
            ref={register({ required: true })} />
        </div>
        <button id="form_submit" type="submit" className="form_submit button">Đăng nhập</button>
      </form>
    </div >
  );
};

export default AuthForm;