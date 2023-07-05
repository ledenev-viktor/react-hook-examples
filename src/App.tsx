import { ReactNode, useState } from "react";
import { YouTubeForm } from "./components/youtubeForm";
import { YouTubeForm2 } from "./components/youtubeForm2";
import { YouTubeForm3 } from "./components/youtubeForm3";
import { YouTubeForm4 } from "./components/youtubeForm4";
import { YouTubeForm5 } from "./components/youtubeForm5";
import { YouTubeForm6 } from "./components/youtubeForm6";
import { YouTubeForm7 } from "./components/youtubeForm7";
import { YouTubeForm8 } from "./components/youtubeForm8";
import { YouTubeForm9 } from "./components/youtubeForm9";
import { YouTubeForm10 } from "./components/youtubeForm10";
import { YouTubeForm11 } from "./components/youtubeForm11";
import { YouTubeForm12 } from "./components/youtubeForm12_yup";
import { YouTubeFormZod } from "./components/youtubeForm13_zod";
import { MuiLogin } from "./components/muiLoginForm";
import { Multisteps } from "./components/multisteps";
import "./App.css";
import { Steps } from "./components/multi-steps/steps";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";


export type FormValues = {
  username: string;
  usern2: string;
  username3: string;
  username4: string;
  username5: string;
  username6: string;
};
function App() {
  const [count, setCount] = useState(0);


  

  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      usern2: "",
      username3: "",
      username4: "",
      username5: "",
      username6: "",
    },
    mode: 'all',
  });

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    watch,
    getValues,
    setValue,
    reset,
    trigger
  } = form;

  const steps = [{
    name: "step_1",
    nameFields: ["username", "usern2"],
    fields: [
      {
        field:
          <div className="b-input">
            <label htmlFor="username">username</label>
            <input type="text" id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Поле username обязательно",
              },
            })}
            />
            <p style={{fontSize:"12px",fontWeight:600,margin:0, color:"red"}}>{errors.username?.message}</p>
          </div>
      },
      {
        field:
          <div className="b-input">
            <label htmlFor="usern2">usern2</label>
            <input type="text" id="usern2" 
              {...register("usern2", {
                required: {
                  value: true,
                  message: "Поле usern2 обязательно",
                },
              })}
            />
            <p style={{fontSize:"12px",fontWeight:600,margin:0, color:"red"}}>{errors.usern2?.message}</p>
          </div>
      },
    ]
  },
  {
    name: "step_2",
    nameFields: ["username3", "username4"],
    fields: [
      {
        field:
          <div className="b-input">
            <label htmlFor="username3">username3</label>
            <input type="text" id="username3" 
              {...register("username3", {
                required: {
                  value: true,
                  message: "Поле username3 обязательно",
                },
              })}
            />
            <p style={{fontSize:"12px",fontWeight:600,margin:0, color:"red"}}>{errors.username3?.message}</p>
          </div>
      },
      {
        field:
          <div className="b-input">
            <label htmlFor="username4">username4</label>
            <input type="text" id="username4" 
              {...register("username4", {
                required: {
                  value: true,
                  message: "Поле username4 обязательно",
                },
              })}
            />
            <p style={{fontSize:"12px",fontWeight:600,margin:0, color:"red"}}>{errors.username4?.message}</p>
          </div>
      },
    ]
  },
  {
    name: "step_3",
    nameFields: ["username5", "username6"],
    fields: [
      {
        field:
          <div className="b-input">
            <label htmlFor="username5">username5</label>
            <input type="text" id="username5" 
              {...register("username5", {
                required: {
                  value: true,
                  message: "Поле username5 обязательно",
                },
              })}
            />
            <p style={{fontSize:"12px",fontWeight:600,margin:0, color:"red"}}>{errors.username5?.message}</p>
          </div>
      },
      {
        field:
          <div className="b-input">
            <label htmlFor="username6">username6</label>
            <input type="text" id="username6" 
              {...register("username6", {
                required: {
                  value: true,
                  message: "Поле username6 обязательно",
                },
              })}
            />
            <p style={{fontSize:"12px",fontWeight:600,margin:0, color:"red"}}>{errors.username6?.message}</p>
          </div>
      },
    ]
  }];
  return (
    <>
      <h1>Multi-steps</h1>
      {/* <Multisteps /> */}
      <Steps steps={steps} trigger={trigger} reset={reset} errors={errors} />
    </>
  );
}

export default App;
