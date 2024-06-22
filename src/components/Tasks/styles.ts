import { css } from '@emotion/react'


export const listTasks = css({
    margin: '0',
    padding: '0',
    listStyle: 'none',
    "& li:last-child":{
        borderBottom: 'none'
    }
})

export const listTasksItem = (isDone:boolean) => css({
    position: 'relative',
    fontSize: '24px',
    borderBottom: '1px solid #ededed',

    "& input":{
        textAlign: 'center',
        width: 40,
        height: 40,
        position: 'absolute',
        top: '0',
        bottom: '0',
        margin: 'auto 0',
        border: 'none',
        WebkitAppearance: 'none',
        appearance: 'none',
        cursor:"pointer"
    },
    "& label":{
        wordBreak: 'break-all',
        padding: '15px 15px 15px 60px',
        display: 'block',
        lineHeight: '1.2',
        transition: 'color 0.4s',
        fontWeight: 400,
        textDecoration:isDone?'line-through':'none',
        color: isDone? '#949494':'#484848',
        backgroundImage: isDone?
        'url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E")'
        :'url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center left'
    }


})