import React from 'react'

function Card() {
    return (
        <div className='col col-12 col-lg-3 col-md-6 col-sm-12 p-0 mt-2 mb-2' style={{display: "flex", justifyContent: "center"}}>
            <div class="card" style={{width: "18rem"}}>
                <img src="https://www.manufacturingtodayindia.com/cloud/2024/09/26/jt9GOfSr-Mahindra-275-DI-TU-PP-1200x900.jpg" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

export default Card
