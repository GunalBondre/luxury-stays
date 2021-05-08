import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
  box-sizing: border-box;
}
  body {
    box-sizing:border-box;
    margin: 0;
    padding: 0;
    font-family: 'Rubik', Helvetica, Sans-Serif;
    height:100vh;
    position:relative;
    font-size:16px;
  }

  .title1{
    font-size:32px;
    font-weight:700;
    color:${(props) => props.theme.primaryColor};
    margin-bottom:5px;
  }
  .title3{
    font-size:24px;
    font-weight:700;
    padding:10px 0;
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
  .para1{
    font-size:16px;
    font-weight:300;
  }

  .title5{
    font-size:18px;
    font-weight:300;
  }

  li{
    font-size:18px;
    font-weight:300;
  }
  .text-padding{
    padding:10px 0
  }
`;

export default GlobalStyle;
