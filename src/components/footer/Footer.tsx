const Footer = () => {
    return (
      <footer
        className="w-[35%] flex justify-between p-[16px] border border-gray-200 "
        data-testid="footer"
      >
        <span className="grow">{0}</span>
        <ul
          className="grow flex justify-between"
          data-testid="footer-navigation"
        >
          <li>
            <a className="" href="#/">
              All
            </a>
          </li>
          <li>
            <a className="" href="#/active">
              Active
            </a>
          </li>
          <li>
            <a className="" href="#/completed">
              Completed
            </a>
          </li>
        </ul>
        <button className="grow">Clear completed</button>
      </footer>
    );
}
 
export default Footer;
