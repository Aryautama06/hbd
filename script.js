let countdown;
const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');
const slideshowElement = document.getElementById('slideshow');
const birthdaySong = document.getElementById('birthday-song');

const birthdayMessage = `
    <h2>Selamat Ulang Tahun, Sayangku Uci! 🎉❤️</h2>
    <p>Sayangku Uci, di hari spesialmu ini, Tama ingin mengucapkan selamat ulang tahun yang paling indah untukmu. Terima kasih sudah selalu ada di hidup Tama, membawa kebahagiaan dan senyuman setiap harinya. Semoga setiap langkahmu ke depan dipenuhi dengan keberkahan, cinta, dan kebahagiaan. Tama akan selalu ada di sisimu, mendukungmu dalam setiap impian dan harapanmu. Selamat bertambah usia, cinta. Tama sayang kamu lebih dari kata-kata yang bisa diungkapkan.</p>
    <p>Di hari ulang tahunmu ini, Tama berjanji akan terus menjaga dan mencintaimu dengan sepenuh hati. Setiap detik bersama kamu adalah anugerah yang tak ternilai, dan Tama tak sabar untuk melewati lebih banyak waktu bersama. Semoga semua harapanmu terwujud dan kita selalu bersama, menapaki perjalanan hidup ini berdua, saling melengkapi dan menguatkan. Selamat ulang tahun, cintaku Uci, kamu adalah alasan Tama tersenyum setiap hari.</p>
`;

function getTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return midnight - now;
}

function updateCountdown() {
    const timeLeft = getTimeUntilMidnight();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft > 1000) {
        setTimeout(updateCountdown, 1000);
    } else {
        hideCountdown();
    }
}

function hideCountdown() {
    countdownElement.style.opacity = '0';
    countdownElement.style.transition = 'opacity 1s ease-out';
    
    setTimeout(() => {
        countdownElement.style.display = 'none';
        showBirthdayContent();
    }, 1000);
}

function showBirthdayMessage() {
    messageElement.innerHTML = birthdayMessage;
    messageElement.style.opacity = '1';
    messageElement.style.transition = 'opacity 1s ease-in';
    createHearts();
    birthdaySong.play();
}

function createHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

function playBirthdaySong() {
    birthdaySong.volume = 0.5; // Set volume to 50%
    
    // Coba putar lagu
    const playPromise = birthdaySong.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            console.log('Lagu berhasil diputar otomatis');
        }).catch(error => {
            console.error('Autoplay gagal:', error);
            // Coba putar lagi setelah sedikit penundaan
            setTimeout(() => {
                birthdaySong.play().catch(e => console.error('Gagal memutar lagu setelah penundaan:', e));
            }, 1000);
        });
    }
}

function showBirthdayContent() {
    const birthdayContent = document.getElementById('birthday-content');
    birthdayContent.classList.remove('hidden');
    messageElement.innerHTML = birthdayMessage;
    createHearts();
    playBirthdaySong();
    startSlideshow();
}

// Mulai hitung mundur saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    birthdaySong.load();
    updateCountdown();
    // Pra-muat audio dengan volume 0
    birthdaySong.volume = 0;
    birthdaySong.play().then(() => {
        birthdaySong.pause();
        birthdaySong.currentTime = 0;
        birthdaySong.volume = 0.5;
    }).catch(e => console.log('Pra-muat audio gagal:', e));
});

// Tambahkan event listener untuk interaksi pengguna
document.body.addEventListener('click', () => {
    if (birthdaySong.paused) {
        birthdaySong.play().catch(e => console.error('Gagal memutar lagu setelah klik:', e));
    }
}, { once: true });
