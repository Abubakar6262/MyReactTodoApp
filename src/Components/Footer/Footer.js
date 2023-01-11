import React from 'react'

export default function Footer() {
    const now = new Date().getFullYear();
  return (
    <div className="container-fluid bg-dark py-2">
        <div className="row">
            <div className="col">
                <p className='text-center mb-0 text-white'>{now} &copy; All Rights Reserved</p>
            </div>
        </div>
    </div>
    )
}
