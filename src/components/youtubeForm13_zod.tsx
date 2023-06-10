import React, { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as yup from "yup";

import { z } from "zod";

/**
 * yup
 */

const schema = z.object({
  username: z.string().nonempty("ZOD: username не должен быть пустым"),
  email: z
    .string()
    .nonempty("ZOD: email не должен быть пустым")
    .email("ZOD: Формат email не валидный"),
  channel: z.string().nonempty("ZOD: Channel не должен быть пустым"),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
  socials: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export const YouTubeFormZod = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "default name",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("handle submitted", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("form errors", errors);
  };

  const patternEmail =
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;

  return (
    <div className="youtube-form">
      <h1>ZOD form</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              disabled: true,
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
                emailAvailabel: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Электронная почта уже существует";
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
