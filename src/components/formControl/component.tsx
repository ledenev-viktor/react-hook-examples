
import cn from 'classnames';

import styles from './index.module.css';
import { Fragment, HTMLAttributes, ReactNode, forwardRef } from 'react';

export type FormControlProps = HTMLAttributes<HTMLDivElement> & {
    block?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    filled?: boolean; // заполненное состояние
    focused?: boolean;

    error?: ReactNode;
    hint?: ReactNode;
    label?: ReactNode;
    labelView?: 'inner' | 'outer'; // Вид лейбла - внутри/снаружи
    /** классы */
    className?: string; // доп класс
    fieldClassName?: string; // доп классы для поля
    inputWrapperClassName?: string;  // доп классы для поля
    labelClassName?: string; // доп класс для лейбла

    children?: ReactNode; // компонент поля (инпут и проч.)
}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>((
    { children,
        block,
        disabled,
        readonly,
        filled,
        focused,
        error,
        hint,
        label,
        labelView,
        className,
        fieldClassName,
        inputWrapperClassName,
        labelClassName,
        ...restProps
    },
    ref,
) => {
    return (
        <div
            className={cn(
                styles.component,
                className,
                {
                    [styles.block]: block,
                }
            )}
        >
            {
                label && labelView === 'outer' && (
                    <span>{label}</span>
                )
            }
            <div
                ref={ref}
                className={cn(styles.inputWrapper, inputWrapperClassName)}
                {...restProps}
            >
                {
                    label && labelView === 'inner' && (
                        <Fragment>
                            <span className={styles.hiddenLabel}>
                                {label}
                            </span>
                            <div
                                className={
                                    cn(
                                        styles.label,
                                        labelClassName,
                                    )
                                }
                            >
                                {label}
                            </div>
                        </Fragment>
                    )
                }
                <div className={styles.input}>
                    {children}
                </div>
            </div>
        </div>
    )
});