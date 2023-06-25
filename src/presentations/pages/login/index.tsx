import React, { useState } from 'react';
import Styles from './login-styles.scss';
import {LoginHeader, Footer, Input, FormStatus} from '@/presentations/components';
import Context from "@/presentations/contexts/form-context";

const Login: React.FC = () => {
    const [state] = useState({
        isLoading: false,
        errorMessage: ''
    });

    const [errorState] = useState({
        email: 'Campo obrigatório',
        password: 'Campo obrigatório'
    });


    return (
        <div className={Styles.login}>
            <LoginHeader />

            <Context.Provider value={{state, errorState}}>
                <form className={Styles.form}>
                    <h2>Login</h2>

                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite sua senha"/>

                    <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>

                    <span className={Styles.link}>Criar conta</span>
                    
                    <FormStatus/>
                </form>
            </Context.Provider>

            <Footer/>
        </div>
    )
}

export default Login