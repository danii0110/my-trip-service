import styles from "./PageInfo.module.scss";

const PageInfo = ({height, children}) => {
    return (
        <div className={styles.container} style={{ height: height }}>
            <main>{children}</main>
        </div>
    );
};
export default PageInfo;
