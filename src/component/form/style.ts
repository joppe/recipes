import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            marginBottom: theme.spacing(3),
        },
        preview: {
            width: 300,
            height: 300,
            objectFit: 'cover',
        },
        slider: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
    }),
);
