import React from "react";
import styled from "styled-components";

const LoaderIcon = styled('img')({
  animation: 'rotation 2s linear infinite',
  display: 'initial',
  verticalAlign: 'middle',
  '@keyframes rotation' : {
  'from' :{
    transform: 'rotate(0deg)'
  },
  'to': {
    transform: 'rotate(359deg)'
  }
}
});
type LoaderProps = {
    width: number
}
const Loader = (props : LoaderProps ) => {
  return (
    <>
      <LoaderIcon width={props.width} src="images/icons/loader.png" />
    </>
  );
};
export default Loader;
