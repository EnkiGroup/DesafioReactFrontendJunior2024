import logoenContact from "../../assets/images/logoenContact.jpg";

export default function Footer(){
    return(
        <footer id="project_details">
                <span>Clique duas vezes para editar uma tarefa</span>
                <span>Pressione <i><strong>Enter</strong></i> para confirmar alteração de título</span>
                <span>Clique fora do campo da tarefa para sair do modo de edição</span>
                <span>Projeto desenvolvido por Henrique Santiago Pires baseado no TodoMVC da <a href="https://todomvc.com" target="_blank" rel="noopener noreferrer">TodoMVC Team</a></span>
                <span>Desafio front-end júnior - enContact </span>
                <div id="logo_container">
                    <img src={logoenContact} alt="Logo enContact" width={"150px"} />
                </div>
        </footer>
    )
}