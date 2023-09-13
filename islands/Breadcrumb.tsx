export default function Breadcrumb() {
  
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="inline-flex items-center space-x-2 px-2 py-1 text-sm font-medium">
                    <li className="inline-flex items-center">
                    <a href="#" className="text-secondary-500 dark:text-blue-300 hover:text-secondary-600 dark:hover:text-blue-200">My Enterprise</a>
                    </li>
                    <li className="inline-flex items-center space-x-2">
                    <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <a href="#" className="text-secondary-500 dark:text-blue-300 hover:text-secondary-600 dark:hover:text-blue-200">Project AwesomeSauce</a>
                    </li>
                    <li className="inline-flex items-center space-x-2" aria-current="page">
                    <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <a className="text-secondary-700 dark:text-blue-200 hover:text-secondary-600 dark:hover:text-blue-100" href="#">AppSmooth</a>
                    </li>
                </ol>
            </nav>
        </>
    )
}