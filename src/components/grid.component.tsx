interface GridProps {
    title?: String,
    items: { [index: string]: string[] }
}

/**
 * Grid component to display items in grid format.
 *
 * @param title - title heading of the grid if provided
 * @param items - list of items in string to be displayed rows
 */
export const Grid = ({ title, items }: GridProps) => {
    return (
        <div className="grid">
            <div className="grid-title">{title}</div>
            {
                items && Object.keys(items).map((key, index) => {
                    return <div key={index} className="grid-row">
                            <div className="grid-row--item">
                                <div className="grid-row--title">{key}</div>
                                {items[key].map((val, index) => {
                                    return <button key={index}>{val}</button>
                                })}
                            </div>
                    </div>
                })
            }
        </div>
    )
}