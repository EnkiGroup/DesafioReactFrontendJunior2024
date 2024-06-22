import { css } from '@emotion/react'


export const todoapp  = css({
    background: "var(--main-white)",
    margin: "130px 0 40px 0",
    position: "relative",
    boxShadow:" 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)",
    '& h1':{
        position: "absolute",
        top: "-140px",
        width: "100%",
        fontSize: "80px",
        fontWeight: 200,
        textAlign: "center",
        color: "var(--title-red)",
        textRendering:"optimizeLegibility",
        fontFamily:"inherit"
    }
})


