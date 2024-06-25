export default function Footer() {
    return (
        <footer className="flex flex-col items-center pt-10 text-[12px] text-gray-1">
            <div>Double-click to edit a todo</div>
            <div>Template by {}
                <a className="hover:underline text-black-2 text-[13px]"
                    href='https://www.linkedin.com/in/diego-celestino-9b8205207/'>
                    Diego Celestino
                </a>
            </div>
            <div>Based on {}
                <a className="hover:underline text-black-2 text-[13px]"
                    href='https://todomvc.com/examples/react/dist/'>
                    TodoMVC
                </a>
            </div>
        </footer>
    )
}
