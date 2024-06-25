$.ajax({
    type: 'GET',
    url: 'http://localhost:5000/api/board'
})
.then(boardItems => {
    for (const id in boardItems) {
        console.log(boardItems[id].name);

        $('.board_pallet').prepend(`
        <div class="col-sm-3">
            <div class="card" style="width: 18rem;">
                <div class="card-header">
                    ${boardItems[id].name}
                </div>
                <ul id=${boardItems[id].id} class=" list-group list-group-flush">
                </ul>
            </div>
        </div>
        `);
    };
});

$.ajax({
    type: 'GET',
    url: 'http://localhost:5000/api/task'
})
    .then(taskItems => {
        for (const id in taskItems) {
            console.log(taskItems[id]);
            $('ul').hasClass(''+taskItems[id].BoardId).append(`
            <li class="list-group-item">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1">
                <label class="form-check-label" for="flexCheckDefault1">
                    ${taskItems[id].content}
                </label>
            </li>
            `)
        }
    });