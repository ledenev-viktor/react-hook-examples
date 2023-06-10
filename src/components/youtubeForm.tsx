import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("handle submitted", data);
  };

  //   const { name, ref, onChange, onBlur } = register("username");
  const patternEmail =
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;

  return (
    <div className="youtube-form">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Поле username обязательно",
              },
            })}
          />
          <p>{errors.username?.message}</p>
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Поле emial обязательно",
              },
              pattern: {
                value: patternEmail,
                message: "Неправильный email",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@test.ru" ||
                    "Введите другой email адресс"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomen.ru") ||
                    "Этот домен не поддерживается"
                  );
                },
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="channel">channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Поле обязательно",
              },
            })}
          />
          <p>{errors.channel?.message}</p>
        </div>
        <button>submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
