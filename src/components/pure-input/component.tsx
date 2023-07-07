import { ChangeEvent, InputHTMLAttributes, MouseEvent, ReactNode, Ref, forwardRef, useRef, useState } from "react";
import cn from "classnames";

import { FormControl } from "../formControl"
import { useFocus } from "./hooks/useFocus";
import {mergeRefs} from 'react-merge-refs';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 
'type' 
| 'value' 
| 'defaultValue' 
| 'onChange' 
| 'onClick' 
| 'onMouseDown' 
| 'enterKeyHint'> & {
    value?: string;
    defaultValue?: string;
    block?: boolean;
    clear?: boolean;
    errors?: ReactNode | boolean;
    success?: boolean; // отображение иконки успеха
    label?: ReactNode; // лейбл компонента
    labelView?: 'inner' | 'outer';
    type?: 'number' | 'email' | 'money' | 'password' | 'tel' | 'text';
    wrapperRef?: Ref<HTMLDivElement>; // ref для обертки инпут
    className?: string;
    focusedClassname?: string;
    filledClassName?: string; // класс, который будет установлен, если в поле есть значение
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: {value: string}) => void; // обработчик поля ввода
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void; // обработчик нажатия на кнопку очистки
    onClick?: (even: MouseEvent<HTMLDivElement>) => void; // обработчик клика по полю
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void; // обработчик MouseDown по полю
    onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void; // обработчик MouseUp по полю
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
    {
        value,
        defaultValue,
        block,
        clear,
        errors,
        success,
        label,
        labelView,
        type,
        wrapperRef,
        className,
        focusedClassname,
        filledClassName,
        onChange,
        onClear,
        onClick,
        onMouseDown,
        onMouseUp,
        ...restProps
    },
    ref
) => {
    const uncontrolled = value === undefined;
    const [stateValue, setStateValue] = useState(defaultValue || '');
    const filled = Boolean(uncontrolled ? stateValue : value);

    const [autofilled, setAutofilled] = useState(false); 

    const [focused, setFocused] = useState(restProps.autoFocus);

    // отображаем кнопку очистки только для заполненного и активного поля ввоада
    const clearButtonVisible = clear && filled && !restProps.disabled && !restProps.readOnly;

    const isInnerLabel = label && labelView === 'inner';

    const inputRef = useRef(null);
    const [fcusVisible] = useFocus(inputRef, 'keyboard');
    



    return (
        <FormControl
            ref={wrapperRef}
            className={cn(className, focused && focusedClassname, filled && filledClassName)}
        >
            <input
                type={type}
                ref={mergeRefs(ref, [inputRef])}
                {...restProps}

            />
        </FormControl>
    )
});