import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$((data, {cookie, redirect})=>{
  const {email, password} = data
  //TypeORM, PRISMA, ...
  if(email === 'test@test.com' && password === '123456'){
    cookie.set('jwt', "JWT_INVENT", {secure:true, path:"/"})
    redirect(302, '/')
    // return{
    //   success:true,
    //   jwt:"JWT_INVENT"
    // }
  }
  return{
    success:false,
  }
}, 
  zod$({
    email:z.string().email('Invalid format'),
    password:z.string().min(6, '6 letters or greater')
  })
)

export default component$(() => {
    useStylesScoped$(styles);

    const action = useLoginUserAction()

    return (
        <Form action={action} class="login-form mt-5">
            <div class="relative">
                <input 
                  name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input 
                  id="password" name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>

            {/* <p>
              {
                action.value?.success && (
                  <code>
                    Autenticado - Token: {action.value.jwt}
                  </code>
                )
              }
            </p>

            <code>
                { JSON.stringify( action.value, undefined , 2 ) }
            </code> */}
        </Form>
    )
});