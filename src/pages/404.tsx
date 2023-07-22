import { styled } from '@mui/system';
import { Grid } from '@mui/material';
import { ThemeProps } from 'theme';
import { useRouter } from 'next/router';

const Div = styled('div')({
  marginLeft: '5%',
  marginTop: '6%',
  marginBottom: '6%',
  minHeight:'400px'
});
const Img = styled('img')({
  width: '483px',
});
const Form = styled('div')({
  borderRadius: '24px',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#FFFFFF',
  width: 460,
  padding: 40,
  height: '60%',
  marginTop: 20,
  paddingBottom:'40%'
});
const Error = styled('h1')({
  fontWeight: '600',
  fontSize: '72px',
});
const Pre = styled('p')({
  fontWeight: '400',
});
const CustomButtonActive = styled('a')((props: { theme?: ThemeProps }) => ({
  borderRadius: 16,
  background: props.theme && props.theme.palette.color.active,
  fontWeight: '600',
  color: '#FFFFFF',
  textTransform: 'initial',
  height: 52,
  width: '25%',
  padding: '15px 15px',
}));

const NotFound = () => {
  const router = useRouter()
  return (
    <Div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Img src="/images/image/notFound.png" />
        </Grid>
        <Grid item xs={6}>
          <Form>
            <Error>404</Error>
            <br />
            <Pre>The page you’re looking for couldn’t be found.</Pre>
            <br />
            <br />
            <br />
            <CustomButtonActive onClick={() => router.push('/swap')}>Go Back</CustomButtonActive>
          </Form>
        </Grid>
      </Grid>
    </Div>
  );
};

export default NotFound;
