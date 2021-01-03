import React, { useEffect, useRef, useState } from 'react';
import { StepInterface } from '../../context/RecipeFormContext';
import { FormContainerBottomSheet, Input } from '../../styles/form';

const StepItem: React.FC = ({ item, index, handleChangeStep }) => {
    const descriptionRef = useRef()
    const [step, setStep] = useState<StepInterface>(item)
    
    useEffect(() => {
        handleChangeStep(step)
    }, [step])

    function handleInputChange(event: any, attr: string) {
        handleChange(event.nativeEvent.text, attr)
    }

    function handleChange(value: any, attr: string) {
        setStep({ ...step, [attr]: value })
    }

    function handleOnBlur() {
        // TODO - verify errors
    }

    useEffect(() => {
        setTimeout(() => {
            if (descriptionRef.current) {
                descriptionRef.current.focus()
            }
        }, 500)
    }, [])

    return (
        <FormContainerBottomSheet
            
        >           
                
            <Input
                textAlignVertical='top'
                multiline
                numberOfLines={4}
                onBlur={handleOnBlur}
                // ref={provisionOfflineRef}
                placeholder={`Passo ${index + 1}`}
                value={step.description}
                onChange={(e: any) => { handleInputChange(e, 'description') }}
            />            

        </FormContainerBottomSheet>
    );
}

export default StepItem;