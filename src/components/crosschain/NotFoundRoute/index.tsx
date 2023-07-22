import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const NotFoundRouteBox = styled('div')({
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  borderRadius: 24,
  maxWidth: 713,
  padding: '24px 30px',
  margin: 'auto',
});
const Bullet = styled('label')({
  background: 'linear-gradient(90deg, #BB36FF 0%, #DC7FB6 100%)',
  height: 8,
  width: 8,
  borderRadius: 20,
  display: 'inline-block',
  marginRight: 10,
});
const SimpleText = styled(Typography)({
  opacity: 0.65,
});

const NotFoundRoute = () => {
  return (
    <>
      <NotFoundRouteBox>
        <h2>Uh Oh!</h2>
        <SimpleText mt={1}>
          We could not find any routes for your desired transfer. We do have some insights on why that could be.
        </SimpleText>
        <SimpleText mt={1}>
          <Bullet />A route for this transfer simply does not exist currently. We are working hard on integrating more
          bridges, look out for updates and do try again.
        </SimpleText>
        <SimpleText mt={1}>
          <Bullet /> Moving tokens across chains costs money. This cost is deducted from the sending amount, if the
          amount is too low to cover the expenses, we may not be able to compute a route for you.
        </SimpleText>
        <SimpleText mt={1}>
          <Bullet />
          Do checkout the FAQs section for more details.
        </SimpleText>
      </NotFoundRouteBox>
    </>
  );
};
export default NotFoundRoute;
