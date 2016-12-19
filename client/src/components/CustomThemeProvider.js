import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const customTheme = getMuiTheme({
  appBar: {
    height: 60,
    color: '#8BC34A',
  },
  textField: {
    textColor: '#5b6f44',
    hintColor: '#88a666',
  }
});

const CustomThemeProvider = (props) => (
  <MuiThemeProvider muiTheme={customTheme}>
    {props.children}
  </MuiThemeProvider>
);

export default CustomThemeProvider;
