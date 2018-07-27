import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
// import produce from 'immer';

const SOCIAL_LOGIN_SUCCESS = 'user/SocailLogin';
const SOCIAL_LOGIN_FAIL = 'user/SocialLoginFail';
const FETCH_USER_DATA_SUCCESS = 'user/FetchUserDataSuccess';
const FETCH_USER_DATA_FAIL = 'user/FetchUserDataFail';
const GO_TO_SIGN_IN_PAGE = 'user/goToSignInPage';
const SIGN_UP_SUCCESS = 'user/signUpSuccess';
const SIGN_UP_FAIL = 'user/signUpFail';

const isUserExist = (result: any): boolean => {
  return result.data.code === 1 ? true : false;
};

export const fetchUserData = (token: string) => {
  return (dispatch: any) => {
    axios({
      method: 'get',
      url: `http://localhost:8080/user/token`,
      headers: { 'Auth-Header': token }
    })
      .then((res) => {
        dispatch(
          actionCreators.fetchUserDataSuccess({
            email: res.data.email,
            username: res.data.username,
            code: 200
          })
        );
      })
      .catch((err) => {
        console.dir(err);
      });
  };
};

export const socialLoginAsync = (socialEmail: string) => {
  return async (dispatch: any) => {
    axios({
      method: 'post',
      url:
        // 'https://2bu3ko5b6j.execute-api.ap-northeast-2.amazonaws.com/dev/auth/login/social',
        'http://localhost:8080/auth/login/social',
      data: {
        // email: socialEmail
        email: `beabasdv@aba.com`
      }
    })
      .then((res) => {
        // email이 존재해서 바로 로그인 된다면
        if (isUserExist(res)) {
          localStorage.token = res.data.token;
          dispatch(
            actionCreators.socialLoginSuccess({
              email: res.data.user.email,
              username: res.data.user.username,
              social: {
                provider: res.data.user.provider
              },
              code: 200
            })
          );
        } else {
          dispatch(
            actionCreators.socialLoginFail({
              email: res.data.email,
              goToSignUpPage: true,
              code: 500
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const signUp = (username: string, email: string) => {
  return (dispatch: any) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/register/local',
      data: {
        email,
        username
      }
    })
      .then((res) => {
        console.log('res : ');
        console.log(res);
        localStorage.token = res.data.token;
        dispatch(
          actionCreators.signUpSuccess({
            username,
            email,
            code: 200
          })
        );
      })
      .catch((err) => {
        if (err.response.status === 422 || err.status === 422) {
          console.log('error occur');
          console.log(err.response);
          dispatch(
            actionCreators.signUpFail({
              email,
              code: 422
            })
          );
        }
      });
  };
};

export const actionCreators = {
  // 원래 작업은,
  // const localLogin = (payload) =>{type:'user/LocalLogin', payload:payload}
  socialLoginSuccess: createAction<IUserState>(SOCIAL_LOGIN_SUCCESS),
  socialLoginFail: createAction<IUserState>(SOCIAL_LOGIN_FAIL),
  fetchUserDataSuccess: createAction<IUserState>(FETCH_USER_DATA_SUCCESS),
  fetchUserDataFail: createAction<IUserState>(FETCH_USER_DATA_FAIL),
  signUpSuccess: createAction<IUserState>(SIGN_UP_SUCCESS),
  signUpFail: createAction<IUserState>(SIGN_UP_FAIL),
  goToSignInPage: createAction(GO_TO_SIGN_IN_PAGE),
  fetchUserData,
  socialLoginAsync,
  signUp
};

export interface IUserState {
  email: string;
  username?: string | null;
  social?: {
    provider?: string;
  };
  message?: string;
  goToSignUpPage?: boolean;
  code: number | null;
}

const initialState: IUserState = {
  email: '',
  username: '',
  social: {
    provider: ''
  },
  message: '',
  goToSignUpPage: false,
  code: null
};

// <A,B> A는 STATE의 타입이고, B는 payload의 타입
export default handleActions<IUserState, any>(
  {
    [SOCIAL_LOGIN_SUCCESS]: (state, action): IUserState => {
      const { email, username, code } = action.payload;
      return {
        email,
        username,
        social: {
          provider: action.payload.provider
        },
        code
      };
    },
    [SOCIAL_LOGIN_FAIL]: (state, action): IUserState => {
      const { email, goToSignUpPage, code } = action.payload;
      return {
        email,
        goToSignUpPage,
        code
      };
    },
    [FETCH_USER_DATA_SUCCESS]: (state, action): IUserState => {
      const { email, username, code } = action.payload;
      return {
        ...state,
        email,
        username,
        code
      };
    },
    [FETCH_USER_DATA_FAIL]: (state, action): IUserState => {
      return {
        ...state
      };
    },
    [GO_TO_SIGN_IN_PAGE]: (state, action): IUserState => {
      return {
        ...state,
        goToSignUpPage: false
      };
    },
    [SIGN_UP_SUCCESS]: (state, action): IUserState => {
      const { email, username, code } = action.payload;
      console.log('signup fail', username, code);
      return {
        ...state,
        username,
        email,
        code
      };
    },
    [SIGN_UP_FAIL]: (state, action): IUserState => {
      const { email, code } = action.payload;
      return {
        ...state,
        email,
        code
      };
    }
  },
  initialState
);
