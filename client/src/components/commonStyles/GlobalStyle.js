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
    padding-bottom:10px;

  }

  .title5{
    font-size:18px;
    font-weight:300;
  }

  li{
    font-size:18px;
    font-weight:300;
    padding-bottom:10px;
  }
  .text-padding{
    padding:10px 0
  }


  /* reset css */

  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}

:focus {
    outline: 0;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}




input[type=search]::-webkit-search-cancel-button,
input[type=search]::-webkit-search-decoration,
input[type=search]::-webkit-search-results-button,
input[type=search]::-webkit-search-results-decoration {
    -webkit-appearance: none;
    -moz-appearance: none;
}

input[type=search] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}

textarea {
    overflow: auto;
    vertical-align: top;
    resize: vertical;
}
html {
    font-size: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    -ms-text-size-adjust: 100%; /* 2 */
}



a:focus {
    outline: thin dotted;
}


a:active,
a:hover {
    outline: 0;
}
img {
    border: 0; /* 1 */
    -ms-interpolation-mode: bicubic; /* 2 */
}
button,
input,
select,
textarea {
    font-size: 100%; /* 1 */
    margin: 0; /* 2 */
    vertical-align: baseline; /* 3 */
    *vertical-align: middle; /* 3 */
}

`;

// reset css

export default GlobalStyle;
