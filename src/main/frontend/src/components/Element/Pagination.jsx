import styles from "./Pagination.module.scss"

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const maxButtons = 5;
    const halfButtons = Math.floor(maxButtons / 2);
    let startPage = Math.max(1, currentPage - halfButtons);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)}>이전</button>
            )}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={page === currentPage ? styles.activePage : ""}
                    onClick={() => onPageChange(page)}>
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)}>다음</button>
            )}
        </div>
    )
};

export default Pagination;