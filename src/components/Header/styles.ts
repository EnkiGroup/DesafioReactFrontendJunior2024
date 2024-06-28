import { css } from '@emotion/react'

export const inputbox = css({
    position:"relative",

    "&::before":{
        content: '\'\'',
        position: 'absolute',
        margin:"0 auto",
        left:"2.5%",
        bottom: '-13px',
        zIndex:-10,
        width:'95%',
        backgroundColor:"var(--efect-dark-gray)",
        overflow: 'hidden',
        height: '55%',
        borderRadius:50,
        paddingBottom:20,
        opacity:0.5
    }
})

export const inputapp = css({
    padding: "16px 16px 16px 60px",
    height: 65,
    border: "none",
    background: "rgba(0, 0, 0, 0.003)",
    boxShadow: "inset 0 -2px 1px rgba(0, 0, 0, 0.03)",

    position: "relative",
    margin: 0,
    width: "100%",
    fontSize: 24,
    fontFamily: "inherit",
    fontWeight: "inherit",
    lineHeight: "1.4em",
    color: "inherit",
    boxSizing:"border-box",

    "&:focus":{
        boxShadow: '0 0 2px 2px var(--focus)',
        outline: '0'
    }
})

export const tooglebox = css({
    position:"absolute",
    top:0,
    left:0,
})
export const toogle = (active:boolean) => css({
    opacity:0,
    width:40,
    height:60,
    cursor: "pointer",
    position:"relative",
    zIndex:1,
    "&:focus , &:focus + label ":{
        boxShadow: '0 0 2px 2px var(--focus)',
        outline: '0'
    },
    "& + label":{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        height: 65,
        fontSize: 0,
        position: "absolute",
        top: 0,
        left: 5,
        color: active?"var(--main-gray)":"var(--light-gray)",
    },
    "& + label::before":{
        content: '"❯"',
        display: "inline-block",
        fontSize: 22,
        color: "inherit",
        padding: "10px 27px 10px 27px",
        transform: "rotate(90deg)",
    }
})