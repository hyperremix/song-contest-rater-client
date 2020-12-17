import { ActsPageState } from 'app/containers/ActsPage/types';
import { ThemeState } from 'styles/theme/types';
import { CompetitionListPageState } from 'app/containers/CompetitionListPage/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  theme?: ThemeState;
  actsPage?: ActsPageState;
  competitionListPage?: CompetitionListPageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
