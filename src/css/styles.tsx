import { css } from '@emotion/react'


export const todoapp  = css({
    textAlign:"center",
    background: "var(--main-white)",
    margin: "130px 0 40px 0",
    position: "relative",
    boxShadow:" 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)",
    '& h1':{
        position: "absolute",
        top: "-180px",
        width: "100%",
        fontSize: "80px",
        fontWeight: 200,
        textAlign: "center",
        color: "var(--title-red)",
        textRendering:"optimizeLegibility",
        fontFamily:"inherit"
    },
    "&::before":{
        content: '\'\'',
        position: 'absolute',
        margin:"0 auto",
        left:-20,
        bottom: 'calc(-11%  - 20px)',
        zIndex:-10,
        width:'calc(100% + 40px)',
        backgroundColor:"var(--efect-gray)",
        overflow: 'hidden',
        height: '100%',
        borderRadius:50,
        opacity:0.5,
        paddingBottom:20
    }
})

export const text = css({
    textAlign:"center" , 
    marginTop:120,
    color: '#4d4d4d',
    fontSize:11
})


