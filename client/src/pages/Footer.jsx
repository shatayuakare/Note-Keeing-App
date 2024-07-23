import React from 'react'

const Footer = () => {
    return (
        <footer className="footer footer-center bg-slate-900 text-base-content p-4">
            <aside>
                <p>Copyright © ${new Date().getFullYear()} - All right reserved by Shatayu Akare</p>
            </aside>
        </footer>
    )
}

export default Footer