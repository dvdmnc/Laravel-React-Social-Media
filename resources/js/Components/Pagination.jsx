import React from 'react'

const Pagination = ({posts}) => {
  return (
    <div className="flex justify-between items-center mt-4">
        <div className="hidden sm:flex justify-between items-center w-full">
            {posts.first_page_url && (
                <a 
                    href={posts.first_page_url} 
                    className="px-4 py-2 border-2 border-gray-300 text-black font-semibold rounded-lg hover:bg-black hover:text-white transition"
                >
                    Première
                </a>
            )}
            {posts.prev_page_url && (
                <a 
                    href={posts.prev_page_url} 
                    className="px-4 py-2 border-2 border-gray-300 text-black font-semibold rounded-lg hover:bg-black hover:text-white transition"
                >
                    Précedente
                </a>
            )}
            <span className="px-4 py-2 border-2 border-gray-300 text-black">
                {posts.prev_page_url && posts.current_page - 1} <strong>{posts.current_page}</strong> {posts.next_page_url && posts.current_page + 1}
            </span>
            {posts.next_page_url && (
                <a 
                    href={posts.next_page_url} 
                    className="px-4 py-2 border-2 border-gray-300 text-black font-semibold rounded-lg hover:bg-black hover:text-white transition"
                >
                    Suivante
                </a>
            )}
            {posts.last_page_url && (
                <a 
                    href={posts.last_page_url} 
                    className="px-4 py-2 border-2 border-gray-300 text-black font-semibold rounded-lg hover:bg-black hover:text-white transition"
                >
                    Dernière Page
                </a>
            )}
        </div>
            {/* For small screens */}
        <div className="flex sm:hidden justify-center items-center w-full space-x-2">
            {posts.prev_page_url && (
                <a 
                    href={posts.prev_page_url} 
                    className="px-3 py-1 border-2 border-gray-300 text-black font-semibold rounded-lg hover:bg-black hover:text-white transition"
                >
                    {posts.current_page - 1}
                </a>
            )}
            <span className="px-3 py-1 border-2 border-gray-300 text-black font-bold">
                {posts.current_page}
            </span>
            {posts.next_page_url && (
                <a 
                    href={posts.next_page_url} 
                    className="px-3 py-1 border-2 border-gray-300 text-black font-semibold rounded-lg hover:bg-black hover:text-white transition"
                >
                    {posts.current_page + 1}
                </a>
            )}
        </div>
    </div>
  )
}

export default Pagination