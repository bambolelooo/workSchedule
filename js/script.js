// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
    let tasks;
    if (JSON.parse(localStorage.getItem("tasks"))) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } else {
        tasks = ["", "", "", "", "", "", "", "", ""];
    }

    // add divs to html whith current hour styling
    const d = new Date();
    let hour = d.getHours();
    for (let i = 9; i <= 17; i++) {
        $(".container").append(`
    <div id="hour-${i}" class="row time-block ${
            hour > i ? `past` : hour < i ? `future` : `present`
        } mb-2">
                <div
                    class="col-2 col-md-1 hour text-center py-3 d-flex align-items-center justify-content-center"
                >
                    ${i > 12 ? `${i - 12}PM` : `${i}AM`}
                </div>
                <textarea class="col-8 col-md-10 description" rows="3">
                </textarea>
                <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                    <i class="fas fa-save" aria-hidden="true"></i>
                </button>
            </div>
    `);
    }

    setInterval(() => {
        $("#currentDay").text(`${new Date()}`);
    }, 100);

    console.log(tasks);
    for (let i = 0; i < 9; i++) {
        $("textarea").eq(i).val(tasks[i]);
    }
    $(".saveBtn").click(function () {
        let hourCount = Number($(this).parent().attr("id").slice(5)) - 9;
        tasks[hourCount] = $(this).siblings("textarea").val();
        console.log(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
});
