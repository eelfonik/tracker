import { createGlobalStyle } from 'styled-components'

const GlobalFont = createGlobalStyle`
@font-face {
	font-family: "SourceSansPro";
	src: url("/fonts/SourceSansPro-Regular.ttf") format("truetype")
}
body,html {
    line-height: 1.5;
    font-family: "SourceSansPro", Avenir, Helvetica, arial, sans-serif;
}
`
export default GlobalFont