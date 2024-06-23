import '../styles/todo-footer.scss'; 

const Footer = () => {
  return (
    <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Created by the TodoMVC Team</p>
      <p>
        Part of
        <span> </span> 
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  );
};

export default Footer;