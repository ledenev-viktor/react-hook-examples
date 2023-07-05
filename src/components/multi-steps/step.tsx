
import {FC} from "react";
import { StepType } from "./steps";


export type StepProps = {
    count: number;
    countLength: number;
    step: StepType;
}
export const Step:FC<StepProps> = ({count, countLength, step}) => {
    console.log("step", step.fields);

    const fields = step.fields ? step.fields : []; 
    return (
        <>
            <div className="b-step">
                <div className="step__inner">
                    step {`${count} / ${countLength}`}
                </div>
            </div>
            
            {
                fields && fields.map((item, index) => <div key={index}>{item.field}</div>)
            }
        </>
    )
}