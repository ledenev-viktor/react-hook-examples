import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray } from "react-hook-form";

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
};

export const YouTubeForm2 = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "default name",
      email: "",
      channel: "",
      socials: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

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
        <div>
          <label htmlFor="primary-phone">primary-phone</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Поле обязательно",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="secondary-phone">secondary-phone</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "Поле обязательно",
              },
            })}
          />
        </div>

        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />

                  {
                    index > 0 && (
                      <button type="button" onClick={() => remove(index)}>Удалить</button>
                    )
                  }
                </div>
              );
            })}

            <button type="button" onClick={() => append({number: ""})}>Добавить телефонный номер</button>
          </div>
        </div>

        <button>submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
