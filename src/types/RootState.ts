import { ActsPageState } from 'app/containers/ActsPage/types';
import { CompetitionListPageState } from 'app/containers/CompetitionListPage/types';
import { EmailConfirmationPageState } from 'app/containers/EmailConfirmationPage/types';
import { ForgotPasswordPageState } from 'app/containers/ForgotPasswordPage/types';
import { ForgotPasswordSubmitPageState } from 'app/containers/ForgotPasswordSubmitPage/types';
import { LoginPageState } from 'app/containers/LoginPage/types';
import { SignUpPageState } from 'app/containers/SignUpPage/types';
import { ThemeState } from 'styles/theme/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  theme?: ThemeState;
  actsPage?: ActsPageState;
  competitionListPage?: CompetitionListPageState;
  loginPage?: LoginPageState;
  signUpPage?: SignUpPageState;
  emailConfirmationPage?: EmailConfirmationPageState;
  forgotPasswordPage?: ForgotPasswordPageState;
  forgotPasswordSubmitPage?: ForgotPasswordSubmitPageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
