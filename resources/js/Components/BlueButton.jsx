import { Link } from '@inertiajs/react'

const BlueButton = ({ link, children }) => {
    return (
        <div>
            <Link href={route(link)} className="bg-blue-500 p-3 rounded">{children}</Link>
        </div>
    )
}

export default BlueButton