import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing:border-box;
    margin: 0;
    padding: 0;
    font-family: 'Rubik', Helvetica, Sans-Serif;
    height:100vh;
    position:relative;
  }

  .title1{
    font-size:32px;
    font-weight:700;
    color:${(props) => props.theme.secondaryColor}
  }
  .title3{
    font-size:24px;
    font-weight:700
  }

  .title2{
    font-size:28px;
    font-weight:500;
  }

  .title4{
    font-size:20px;
  }
  .para{
    font-size:14px;
    color:${(props) => props.theme.secondaryColor}
  }
`;

export default GlobalStyle;
