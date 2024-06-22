import { css } from '@emotion/react'

export const listFootter = css({
    padding: '10px 15px',
    height: '20px',
    textAlign: 'center',
    fontSize: '15px',
    borderTop: '1px solid #e6e6e6',
    "&::before":{
        content: '\'\'',
        position: 'absolute',
        right: '0',
        bottom: '0',
        left: '0',
        height: '50px',
        overflow: 'hidden',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2),0 8px 0 -3px #f6f6f6,0 9px 1px -3px rgba(0, 0, 0, 0.2),0 16px 0 -6px #f6f6f6,0 17px 2px -6px rgba(0, 0, 0, 0.2)'
    }

})

export const filtersFooter = css({
    margin: '0',
    padding: '0',
    listStyle: 'none',
    position: 'absolute',
    right: '0',
    left: '0',
    "& li":{
        display:'inline',
    },
    "& li a":{
        color: 'inherit',
        margin: '3px',
        padding: '3px 7px',
        textDecoration: 'none',
        border: '1px solid transparent',
        borderRadius: '3px',
        fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    "& li a:hover ,& li a.selected":{
        borderColor:"var(--selected-red)"
    },
    "& li a:focus":{
        boxShadow: '0 0 2px 2px var(--focus-red)',
        outline: '0'
    }
})

export const countTasksFooter = css({
    float: 'left',
    textAlign: 'left'
})

export const clearCompletedFooter = css({
    float: 'right',
    position: 'relative',
    lineHeight: '19px',
    textDecoration: 'none',
    cursor: 'pointer',
    "&:hover":{
        textDecoration: 'underline',
    },
    margin: '0',
    padding: '0',
    border: '0',
    background: 'none',
    fontSize: '100%',
    verticalAlign: 'baseline',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit',
    WebkitAppearance: 'none',
    appearance: 'none',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
})