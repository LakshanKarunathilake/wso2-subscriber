import { createMuiTheme } from '@material-ui/core/styles';

export const dark = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        background: '#1a262e',
        color: '#ffffff',
      },
    },

    MuiCardHeader: {
      title: {
        color: '#fe5200',
      },
      subheader: {
        color: '#BDBDBD',
      },
    },
    MuiFormControlLabel: {
      label: {
        color: '#ffffff',
      },
    },
    MuiCheckbox: {
      root: {
        color: '#fe5200',
        '&$checked': {
          color: '#fe5200',
        },
      },
      checked: {},
    },
  },
});

export const light = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        background: 'ffffff',
        color: '#ffffff',
      },
    },
    MuiCardContent: {
      root: {
        color: 'ffffff',
        borderTopStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#fe5200',
      },
    },
    MuiCardHeader: {
      title: {
        color: '#fe5200',
      },
      subheader: {
        color: '#BDBDBD',
      },
    },
    MuiFormControlLabel: {
      label: {
        color: '#ffffff',
      },
    },
    MuiCheckbox: {
      root: {
        color: '#fe5200',
      },
    },
  },
});
