import React, {useContext} from 'react';
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentations/components';
import Context from "@/presentations/contexts/form-context";

const FormStatus: React.FC = () => {
    const { state } = useContext(Context);

    return(
        <div data-testid="error-wrap" className={Styles.errorWrap}>
            { state.isLoading && <Spinner className={Styles.spinner}/>}            
            { state.mainError && <span className={Styles.error}>{state.mainError}</span>}                        
        </div>
    )
}

export default FormStatus;