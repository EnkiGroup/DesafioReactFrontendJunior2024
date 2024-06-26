import styled from "styled-components";

const AnimaContainer = styled.div`
  position: relative;
  top: 200px;
  pointer-events: none;

  @media screen and (max-width: 450px){
    top: 250px;
    right: -35px;
    .lottie-svg-class-bg{
      width: 400px !important;
      height: 400px !important;
    }
  }

`;

export default AnimaContainer;
