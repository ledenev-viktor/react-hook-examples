
import { FC, MouseEvent, useState, ReactNode } from "react";
import { Step } from "./step";
import { UseFormTrigger, UseFormReset, FieldErrors } from "react-hook-form";
import { FormValues } from "../../App";
import { boolean } from "yup";

export type StepType = {
    name: string;
    nameFields: string[];
    fields?: { field: ReactNode }[];
}
export type StepsProps = {
    steps: StepType[];
    trigger: UseFormTrigger<FormValues>;
    reset: UseFormReset<FormValues>;
    errors: FieldErrors<FormValues>;
}

export const Steps: FC<StepsProps> = ({ steps, trigger, reset, errors }) => {

    const [currentPage, setCurrentPage] = useState(0);
    const currentStep = steps.map((item, index) => (
        currentPage == index && (
            (<Step key={`step${index}`} step={steps[index]} count={index + 1} countLength={steps.length} />)
        )
    )).filter(Boolean);



    const nextStep = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        const checkFields = steps.map((item, index) => {
            if (currentPage == index && item.nameFields) {
                return item.nameFields
            }
        }).filter(Boolean);

        const validStep = (async () => {
            try {
                return await trigger(...checkFields);
            } catch (e) {
                console.error(e);
            }
        })();
        validStep.then(res => {
            if (!res) return;
            if (currentPage === steps.length - 1) return;
            setCurrentPage(prev => prev + 1);

        })
    }

    const prevStep = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        if (currentPage === 0) return;
        setCurrentPage(prev => prev - 1)
    }

    const handleReset = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        reset();
    }

    return (
        <>
            <form className="b-steps" noValidate>
                <div className="steps__inner">
                    <div className="steps__list">
                        {currentStep}
                    </div>
                    {currentPage !== 0 && (<button onClick={(e) => prevStep(e)}>Назад</button>)}
                    {currentPage !== steps.length - 1 && (<button onClick={(e) => nextStep(e)}>Далее</button>)}
                    <button onClick={e => handleReset(e)}>Очистить</button>
                    {
                        currentPage == steps.length - 1 &&
                        <button type="submit">Отправить</button>
                    }
                </div>
            </form>
        </>
    )
}