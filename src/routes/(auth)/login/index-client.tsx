import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {

    useStylesScoped$(styles);
    const formState = useStore({
      email:'',
      password:'',
      formPosted:false,
    })

    const emailError = useComputed$(()=>{
      if(formState.email.includes('@')) return ''
      else return 'not-valid'
    })

    const passwordError = useComputed$(()=>{
      if(formState.password.length >= 6) return ''
      else return 'not-valid'
    })

    const isFormValid = useComputed$(()=>{
      if(
        emailError.value === 'not-valid' ||
        passwordError.value === 'not-valid'
      ) return false
      return true
    })

    const submit = $(()=>{
      formState.formPosted = true
      const {email, password} = formState
    })

    return (
        <form onSubmit$={submit} class="login-form" preventdefault:submit>
            <div class="relative">
                <input 
                  value={formState.email}
                  class={formState.formPosted ? emailError.value : ''}
                  onInput$={(event)=>formState.email = (event.target as HTMLInputElement).value}
                  name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                  value={formState.password}
                  class={formState.formPosted ? passwordError.value : ''}
                  onInput$={(event)=>formState.password = (event.target as HTMLInputElement).value}
                  id="password" name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>


            <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code>
        </form>
    )
});