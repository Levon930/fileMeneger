
import { Theme } from '@material-ui/core/styles/createTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

declare module '@material-ui/core/styles/createTheme' {
    interface Theme {
        appColor: {
            color: React.CSSProperties['color']
            backgroundColor: React.CSSProperties['backgroundColor']

        }
    }
    
    interface ThemeOptions {
        appColor?: {
            color?: React.CSSProperties['color']
            backgroundColor?: React.CSSProperties['backgroundColor']
        }
    }
}