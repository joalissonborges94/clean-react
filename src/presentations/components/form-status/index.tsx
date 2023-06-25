import React, {useContext} from 'react';
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentations/components';
import Context from "@/presentations/contexts/form-context";

const FormStatus: React.FC = () => {
    const { state } = useContext(Context);

    return(
        <div data-testid="error-wrap" className={Styles.errorWrap}>
            { state.isLoading && <Spinner className={Styles.spinner}/>}            
            { state.errorMessage && <span className={Styles.error}>{state.errorMessage}</span>}                        
        </div>
    )
}

export default FormStatus;