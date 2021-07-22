import { createTheme, ThemeOptions } from '@material-ui/core/styles';

export default function createMyTheme(options: ThemeOptions) {
    return createTheme({
        appColor: {
            color: 'white',
            backgroundColor: 'black',
        },
        ...options,
    })
}
