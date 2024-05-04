import {useForm} from 'react-hook-form'
import styles from './Login.module.css'
import { RiUser3Fill, RiLockFill  } from "react-icons/ri";

export const Login = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    setError, 
  } = useForm({
    defaultValues: {
      email: 'usuario@upvalue.com'
    }
  })

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      throw new Error()
      console.log(data)    
    } catch (error) {
      setError('email', {
        message: 'Email não cadastrado'
      })
      setError('password', {
        message: 'Senha incorreta'
      })
    }
  }

  return (
    <main className={styles.formBox}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className={styles.inputBox}>
          <input
            {...register('email', {
              required: 'Insira um email',
              validate: (value) => {
                if (!value.includes('@')) {
                  return 'Email deve incluir @'
                }
                return true
              },
            })} 
            type='text' 
            placeholder='Email'            
          />
          <RiUser3Fill className={styles.icon}/>
        </div>
        {errors.email && (
          <div className={styles.textRed}>{errors.email.message}</div>
        )}
        <div className={styles.inputBox}>
          <input
            {...register('password', {
              required: 'Insira uma senha',
              minLength: {
                value: 8,
                message: 'Senha de 8 caracteres ou mais'
              },
            })} 
            type='password' 
            placeholder='Senha'            
          />
          <RiLockFill className={styles.icon}/>
        </div>
        {errors.password && (
          <div className={styles.textRed}>{errors.password.message}</div>
        )}
        <div className={styles.rememberForgot}>
          <label>
            <input type='checkbox' />
            Lembrar
          </label>
          <a href='#'>Esqueceu senha?</a>
        </div>

        <button disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Carregando...' : 'Entrar'}
        </button>

        <div className={styles.registerLink}>
          <p>Não tem conta? <a href='#'>Cadastre-se</a></p>
        </div>
      </form>
    </main>
  )
}
