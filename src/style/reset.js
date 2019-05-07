import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
@charset "utf-8";
* {
    box-sizing: border-box;
}

body {
    font: 12px Helvetica Neue, Arial, Luxi Sans, DejaVu Sans, Tahoma, Hiragino Sans GB, STHeiti, Microsoft YaHei;
    color: #666;
    margin: 0;
    padding: 0;
    width: 100%;
    background: #F2F2F2;
}

ul, li, p, h1, h2, h3, h4, h5, h6, dl, dt, dd {
    margin: 0;
    padding: 0;
    border: none;
    list-style: none;
}

a {
    text-decoration: none;
}

/* a :hover {
    text-decoration: none;
    cursor: pointer;
} */

div:after {
    content: "";
    display: block;
    clear: both;
}

img {
    vertical-align: middle;
}

`