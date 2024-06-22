interface IContainerProps{
    children: React.ReactNode;
}

const Container = ({ children }: IContainerProps) => {
    return ( 
        <section className="container p-4 flex flex-col justify-center items-center">
            {children}
        </section>
     );
}

export default Container;
 

