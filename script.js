let countdown;
const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');
const birthdaySong = document.getElementById('birthday-song');

const birthdayMessage = `
    <h2>Selamat Ulang Tahun, Sayangku Uci! 🎉❤️</h2>
    <p>Sayang awak Uci, di hari spesial ini, Tama ingin mengucapkan selamat ulang tahun yang paling indah untuk uci. Terima kasih sudah selalu ada di hidup Tama, membawa kebahagiaan dan senyuman setiap harinya. Semoga setiap langkah uci ke depan dipenuhi dengan warna, cinta, dan kebahagiaan. Tama selalu ada di sisi uci eakk, ngedukung uci dalam setiap impian dan harapan uci. Selamat bertambah usia, cinta. Tama sayang uci lebih dari kata-kata yang bisa diungkapkan.</p>
    <p>Di hari ulang tahun uci ini, Tama janji akan terus menjaga dan mencintai uci dengan sepenuh hati. Setiap detik bersama uci adalah anugerah yang tak ternilai, dan Tama tak sabar untuk melewati lebih banyak waktu bersama. Semoga semua harapan uci terwujud dan kita selalu bersama, menapaki perjalanan hidup ini berdua, saling melengkapi dan menguatkan. Selamat ulang tahun, cintaku Uci, uci alasan Tama tersenyum setiap hari.</p>
`;

function startCountdown(duration) {
    let timeLeft = duration;
    const interval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdownElement.textContent = `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(interval);
            hideCountdown();
        } else {
            timeLeft--;
        }
    }, 1000);
}

function hideCountdown() {
    countdownElement.style.opacity = '0';
    countdownElement.style.transition = 'opacity 1s ease-out';
    
    setTimeout(() => {
        countdownElement.style.display = 'none';
        console.log('Countdown selesai, menampilkan pesan ulang tahun');
        showBirthdayContent();
    }, 1000);
}

function showBirthdayContent() {
    messageElement.innerHTML = birthdayMessage;
    messageElement.style.opacity = '1';
    messageElement.style.transition = 'opacity 1s ease-in';
    playBirthdaySong();
    createHearts();
}

function playBirthdaySong() {
    birthdaySong.volume = 0.5; // Set volume to 50%
    birthdaySong.play().catch(e => console.error('Gagal memutar lagu:', e));
}

function createHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDuration = Math.random() * 5 + 3 + 's'; // Random duration between 3s and 8s
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000); // Remove after 8 seconds
    }, 300);
}

// Mulai hitung mundur saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    birthdaySong.load();
    startCountdown(10); // Mulai hitung mundur 10 detik
});
