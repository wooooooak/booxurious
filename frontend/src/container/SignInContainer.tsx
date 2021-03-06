import * as React from "react";
// import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IStoreState } from "../store/modules";
import { actionCreators as userActionCreator } from "../store/modules/User";

import SignIn from "../component/SignIn";

interface StoreProps {
  email: string;
  username: string | null;
  goToSignUpPage?: boolean;
}

interface DispatchProps {
  userAction: typeof userActionCreator;
}

type Props = StoreProps & DispatchProps;

interface IState {
  email: string | null;
  password: string | null;
}

class SignInContainer extends React.Component<Props, IState> {
  state = {
    email: "",
    password: ""
  };

  onClickSocialLogin = (response: any) => {
    const { userAction } = this.props;
    switch (response.socialProvider) {
      case "google":
        userAction.socialLoginAsync(
          response.response.profileObj.email,
          response.response.profileObj.imageUrl,
          response.socialProvider
        );
        break;
      case "kakao":
        const { profile } = response.response;
        let profileImage = "";
        if (profile.profile_image) {
          profileImage = profile.profil_image;
        }
        userAction.socialLoginAsync(
          response.response.profile.kakao_account.email,
          profileImage,
          response.socialProvider
        );
        break;
      default:
        break;
    }
  };

  render () {
    const { goToSignUpPage } = this.props;
    if (localStorage.getItem("token") !== null) {
      return <Redirect to="/" />;
    }
    if (goToSignUpPage) {
      return <Redirect to="/signUp" />;
    }
    return <SignIn onClickSocialLogin={this.onClickSocialLogin} />;
  }
}

export default connect<StoreProps, DispatchProps>(
  ({ User }: IStoreState): StoreProps => ({
    email: User.email,
    username: User.username,
    goToSignUpPage: User.goToSignUpPage
  }),
  (dispatch) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(SignInContainer);
