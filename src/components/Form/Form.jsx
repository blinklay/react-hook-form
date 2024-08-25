import { useEffect } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";

const requiredText = "*Это поле обязательное";

function hasDigits(str) {
  return (
    str
      .split("")
      .map((item) => Number(item))
      .filter((item) => !isNaN(item)).length > 0
  );
}

function countDigits(str) {
  return str
    .split("")
    .map((item) => Number(item))
    .filter((item) => !isNaN(item)).length;
}

function validateNames(value, { fieldName }) {
  if (value.includes(" ")) {
    return `*${fieldName} не может содержать пробелов!`;
  }
  if (hasDigits(value)) {
    return `*${fieldName} не может содержать чисел!`;
  }
  return true;
}

function countUppercase(str) {
  console.log(str);

  let count = 0;
  const upperCaseStr = str
    .split("")
    .map((letter) => letter.toUpperCase())
    .join("");

  for (let i = 0; i < str.length; i++) {
    if (str[i] === upperCaseStr[i]) count++;
  }

  return count;
}

export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    console.log(countUppercase("фывВ"));
  }, []);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form className="app-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="app-form__header">Registration Form</h1>

      <div className="app-form__name">
        <div className={classNames("app-form__row")}>
          <label htmlFor="first-name">
            First Name
            {errors?.firstName && <p>{errors?.firstName?.message}</p>}
          </label>
          <input
            {...register("firstName", {
              required: requiredText,
              validate: (value) => {
                return validateNames(value, { fieldName: "Имя" });
              },
            })}
            type="text"
            id="first-name"
            placeholder="Jhonny"
            className={classNames({
              "error-input": errors?.firstName,
            })}
          />
          <div className="app-form__input-line"></div>
        </div>

        <div className={classNames("app-form__row")}>
          <label htmlFor="last-name">
            Last Name
            {errors?.lastName && <p>{errors?.lastName?.message}</p>}
          </label>
          <input
            {...register("lastName", {
              required: requiredText,
              validate: (value) => {
                return validateNames(value, { fieldName: "Фамилия" });
              },
            })}
            type="text"
            id="last-name"
            placeholder="Nelson"
            className={classNames({
              "error-input": errors?.lastName,
            })}
          />
          <div className="app-form__input-line"></div>
        </div>
      </div>

      <div className="app-form__row">
        <label htmlFor="email">
          Email
          {errors?.email && <p>{errors?.email?.message}</p>}
        </label>
        <input
          {...register("email", {
            required: requiredText,
            validate: (value) => {
              if (!value.includes("@")) {
                return "*Адрес почты введен не корректно!";
              }
              return true;
            },
          })}
          type="text"
          id="email"
          placeholder="example@.org"
          className={classNames({
            "error-input": errors?.email,
          })}
        />
        <div className="app-form__input-line"></div>
      </div>

      <div className="app-form__row">
        <label htmlFor="password">
          Password
          {errors?.password && <p>{errors?.password?.message}</p>}
        </label>
        <input
          {...register("password", {
            required: requiredText,
            validate: (value) => {
              if (value.length < 6) {
                return "*Длинна пароля менее 6 символов!";
              }
              if (countUppercase(value) < 2) {
                return "*Пароль должен содержать 2 заглавных символа!";
              }
              if (countDigits(value) < 2) {
                return "*Пароль должен содержать 2 числа!";
              }
              return true;
            },
          })}
          type="text"
          id="password"
          className={classNames({
            "error-input": errors?.password,
          })}
        />
        <div className="app-form__input-line"></div>
      </div>

      <button className="app-form__submit">Submit</button>
    </form>
  );
}
