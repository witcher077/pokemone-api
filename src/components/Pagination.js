const Pagination = ({ postPerPage, totalPost, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      {pageNumbers.map((num, index) => (
        <li key={index}>
          <a
            className="page-link"
            onClick={() => {
              paginate(num);
            }}
            href="!#"
          >
            {num}
          </a>
        </li>
      ))}
    </nav>
  );
};
export default Pagination;
