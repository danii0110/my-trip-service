import styles from "./LocationDisplayItem.module.scss"

const LocationDisplayItem = ({label, value}) => {
    const getDisplayValue = () => {
        if (!value) return null;

        switch (label) {
            case "Heritage":
                return value === "0" ? "No" : "Yes";
            case "Baby Carriage Check":
                return value ? "Allowed" : "Not Allowed";
            case "Pet Check":
                return value ? "Allowed" : "Not Allowed";
            case "Credit Card Check":
                return value ? "Accepted" : "Not Accepted";
            default:
                return value;
        }
    };

    const displayValue = getDisplayValue();

    if (!displayValue) {
        return null;
    }

    return (
        <li className={styles.locationDetail}>
            <strong>- {label} </strong>
            <p>{displayValue
                .replace(/<br\s*\/?>\n?/g, '\n') // <br> 태그와 \n이 같이 있으면 하나의 \n으로 변환
                .replace(/<\/?[^>]+(>|$)/g, "") // 모든 HTML 태그 제거
            }</p>
        </li>
    )
};
export default LocationDisplayItem;