// Đặt thời gian bắt đầu và kết thúc của chuyến đi chơi
const startTime = new Date("August 25, 2024 08:00:00").getTime();
const endTime = new Date("August 25, 2024 13:30:00").getTime();

// Lấy phần tử hiển thị đếm ngược
const countdownElement = document.getElementById("countdown");

// Lấy danh sách các ngày
const days = document.querySelectorAll('.day');

function updateCountdown() {
    const now = new Date().getTime();

    if (now >= startTime && now <= endTime) {
        // Hiển thị và ẩn các ngày dựa trên thời gian hiện tại
        days.forEach(day => {
            const dayNumber = parseInt(day.getAttribute('data-day'));
            if (now >= startTime + (dayNumber - 1) * 24 * 60 * 60 * 1000 && now < startTime + dayNumber * 24 * 60 * 60 * 1000) {
                day.style.display = 'block'; // Hiển thị ngày hiện tại
                day.addEventListener('click', () => {
                    day.querySelectorAll('.event').forEach(event => {
                        event.style.display = 'block'; // Hiển thị nội dung trong ngày khi click
                    });
                });
            } else {
                day.style.display = 'none'; // Ẩn các ngày còn lại
            }
        });

        // Đếm ngược thời gian còn lại đến khi bắt đầu đi chơi
        const distanceToStart = startTime - now;
        const daysToStart = Math.floor(distanceToStart / (1000 * 60 * 60 * 24));
        const hoursToStart = Math.floor((distanceToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesToStart = Math.floor((distanceToStart % (1000 * 60 * 60)) / (1000 * 60));
        const secondsToStart = Math.floor((distanceToStart % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Quẩy thôi: ${daysToStart} ngày ${hoursToStart} giờ ${minutesToStart} phút ${secondsToStart} giây`;

    } else if (now > endTime) {
        // Quá thời gian kết thúc, hiển thị thông báo
        clearInterval(interval);
        countdownElement.innerHTML = "Về thôi";

        // Ẩn tất cả các ngày trừ ngày cuối cùng và hiển thị thông báo đã hết thời gian
        days.forEach((day, index) => {
            if (index === days.length - 1) {
                day.style.display = 'block'; // Hiển thị ngày cuối cùng
                day.querySelectorAll('.event').forEach(event => {
                    event.style.display = 'block'; // Hiển thị thông báo đã hết thời gian trong ngày cuối cùng
                });
            } else {
                day.style.display = 'none'; // Ẩn các ngày còn lại
            }
        });

    } else {
        // Chưa tới thời gian bắt đầu, hiển thị thông báo đếm ngược
        const distanceToStart = startTime - now;
        const daysToStart = Math.floor(distanceToStart / (1000 * 60 * 60 * 24));
        const hoursToStart = Math.floor((distanceToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesToStart = Math.floor((distanceToStart % (1000 * 60 * 60)) / (1000 * 60));
        const secondsToStart = Math.floor((distanceToStart % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Đếm ngược thời gian còn: ${daysToStart} ngày ${hoursToStart} giờ ${minutesToStart} phút ${secondsToStart} giây`;

        // Hiển thị tất cả các ngày ban đầu và ẩn các sự kiện bên trong mỗi ngày
        days.forEach(day => {
            day.style.display = 'block'; // Hiển thị ngày
            day.querySelectorAll('.event').forEach(event => {
                event.style.display = 'none'; // Ẩn sự kiện trong ngày
            });
        });
    }
}

// Cập nhật đếm ngược mỗi giây
const interval = setInterval(updateCountdown, 1000);

// Khởi chạy lần đầu
updateCountdown();