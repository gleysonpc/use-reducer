import { ChangeEvent, FormEvent, useReducer } from 'react';
import './App.scss'
import { login } from './utils';

interface LoginState {
  email: string
  password: string
  error: string
  signedIn: boolean
  loading: boolean
}

type LoginAction =
  | { type: 'login' | 'success' | 'error' | 'logout' }
  | { type: 'field'; fieldName: string; payload: string }

const initalState: LoginState = {
  email: '',
  password: '',
  error: '',
  signedIn: false,
  loading: false
}

function loginReducer(state: LoginState, action: LoginAction) {
  switch (action.type) {

    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    }

    case 'login': {
      return {
        ...state,
        error: '',
        loading: true,
      }
    }

    case 'logout': {
      return {
        ...state,
        email: '',
        password: '',
        error: '',
        signedIn: false,
        loading: false
      }
    }

    case 'success':
      return {
        ...state,
        loading: false,
        signedIn: true,
        error: ''
      }

    case 'error':
      return {
        ...state,
        loading: false,
        signedIn: false,
        error: 'incorrect email or password'
      }

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(loginReducer, initalState)
  const { signedIn, loading, error } = state

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    dispatch({ type: 'login' })
    const result = await login(state.email, state.password)
    if (result) {
      dispatch({ type: 'success' })
    } else {
      dispatch({ type: 'error' })
    }

  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'field', fieldName: e.target.name, payload: e.target.value })
  }


  return (
    <div className='form-container' >
      <form onSubmit={handleSubmit} autoComplete='off' autoCorrect='off' spellCheck={false} >
        {
          !!signedIn
            ? (
              <>
                <h3>WELCOME TO YOU ACCOUNT</h3>
                <button onClick={() => dispatch({ type: 'logout' })} >SIGN OUT</button>
              </>
            )
            :
            (
              <>
                <h3>SIGN IN TO YOUR ACCOUNT</h3>
                <label htmlFor="email">E-mail</label>
                <input type="email" id='email' name='email' placeholder='Enter your e-mail' onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' placeholder='Enter your password' onChange={handleChange} />
                <button disabled={loading}>{loading ? 'LOADING...' : 'SIGN IN'}</button>
              </>
            )
        }
        {error && (<span>{error}</span>)}
      </form>
    </div>
  );
}






export default App;
