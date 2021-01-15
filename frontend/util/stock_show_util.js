export const CustomToolTip = ({ payload, label, active }) => {
    // ;
    if (active) {
        if (label.includes(":") === false) {
            label = label.split(" ").join(":00 ")
        }
        return (
            <div>
                <p>{`${label}`}</p>
            </div>
        );

    }

    return null;
}
