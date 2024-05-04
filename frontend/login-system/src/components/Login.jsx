import {useForm} from 'react-hook-form'
import styles from './Login.module.css'
import { RiUser3Fill, RiLockFill  } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import userData from '../users.json'

export const Login = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitSuccessful	 },
    setError, 
  } = useForm({
    defaultValues: {
      email: 'usuario@upvalue.com'
    }
  })

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const user = userData.find(user => user.email === data.email)
      if (!user) {
        throw new Error('email_not_found')        
      }
      if (user.password !== data.password) {
        throw new Error('wrong_password')
      }     

    } catch (error) {
      if (error.message === 'email_not_found') {
        setError('root', {
          message: 'Essa conta não existe. Insira uma nova conta ou obtenha uma nova.'
        })  
      } else {
        setError('root', {
          message: 'Ocorreu um problema durante seu login, verifique o email e a senha.'
        }) 
      }           
    }
  }

  return (
    <main className={styles.formBox} id='login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <div className={`${styles.submitSucessfullMsg} ${isSubmitSuccessful  ? '' : styles.msgHidden}`}>Login realizado com sucesso!</div>
        <div className={`${styles.submitErrorMsg} ${errors.root ? '' : styles.msgHidden}`}>{errors.root?.message}</div> 

        <div className={styles.inputBox}>
          <input
            {...register('email', {
              required: 'O email é obrigatório.',
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: 'Insira um email válido (exemplo@email.com).' 
              }
            })} 
            type='text' 
            placeholder='Email'            
          />
          <RiUser3Fill className={styles.icon}/>
        </div>
        
        <div className={`${styles.errorMsg} ${errors.email ? '' : styles.msgHidden}`}>{errors.email?.message}</div>
        
        <div className={styles.inputBox}>
          <input
            {...register('password', {
              required: 'A senha é obrigatória.',
              minLength: {
                value: 8,
                message: 'Senha deve conter 8 caracteres ou mais.'
              },
            })} 
            type='password' 
            placeholder='Senha'            
          />
          <RiLockFill className={styles.icon}/>
        </div>
        
        <div className={`${styles.errorMsg} ${errors.password ? '' : styles.msgHidden}`}>{errors.password?.message}</div>
        
        <div className={styles.rememberForgot}>
          <label>
            <input type='checkbox' />
            Lembrar
          </label>
          <a href='#login'>Esqueceu senha?</a>
        </div>

        <button disabled={isSubmitting} type='submit'>
          {isSubmitting ? 
          <AiOutlineLoading3Quarters  className={styles.loading}/> 
          : 'Entrar'          
          }
        </button>       
                       
        <div className={styles.registerLink}>
          <p>Não tem conta? <a href='#login'>Cadastre-se</a></p>
        </div>
      </form>
    </main>
  )
}
