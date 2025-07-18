
document.addEventListener('DOMContentLoaded', () => {
    

    // Update current date for prayer times section
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        currentDateElement.textContent = today.toLocaleDateString('id-ID', options);
    }

    // --- DEMO Waktu Sholat ---
    // Note: Untuk mendapatkan waktu sholat real-time dan akurat,
    // Anda perlu menggunakan API eksternal dan backend.
    // Contoh ini hanya menampilkan data dummy atau data yang sudah ada.

    // Dynamic prayer times based on current time (simple demo)
    function updatePrayerTimes() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        // For demo, just show current time as all prayer times
        const timeStr = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
        document.getElementById('imsak-time').textContent = timeStr;
        document.getElementById('subuh-time').textContent = timeStr;
        document.getElementById('dzuhur-time').textContent = timeStr;
        document.getElementById('ashar-time').textContent = timeStr;
        document.getElementById('maghrib-time').textContent = timeStr;
        document.getElementById('isya-time').textContent = timeStr;
        document.getElementById('current-location').textContent = 'Pontianak'; // Static location for demo
    }
    updatePrayerTimes();
    setInterval(updatePrayerTimes, 60000); // Update every minute

    // Logic for sidebar navigation in Tata Cara Sholat (optional: scroll to section or show/hide)
    document.querySelectorAll('.sidebar-nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove '#'
            document.querySelectorAll('.sholat-detail').forEach(detailDiv => {
                detailDiv.style.display = 'none'; // Hide all details
            });
            const targetDetail = document.getElementById(targetId);
            if (targetDetail) {
                targetDetail.style.display = 'block'; // Show target detail
                targetDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Ensure first sholat detail is shown on page load
    const firstSholatDetail = document.querySelector('.sholat-detail');
    if (firstSholatDetail) {
        firstSholatDetail.style.display = 'block';
    }

    // Dashboard item click handling for tata-cara.html
    const dashboardItems = document.querySelectorAll('.dashboard-item');
    const sholatDetails = document.querySelectorAll('.sholat-detail');

    function showDetail(targetId) {
        sholatDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        const targetDetail = document.getElementById(targetId);
        if (targetDetail) {
            targetDetail.classList.add('active');
        }
    }

    function setActiveDashboardItem(clickedItem) {
        dashboardItems.forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');
    }

    dashboardItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.dataset.target;
            showDetail(targetId);
            setActiveDashboardItem(this);
        });
    });

    if (dashboardItems.length > 0) {
        const firstTargetId = dashboardItems[0].dataset.target;
        showDetail(firstTargetId);
        setActiveDashboardItem(dashboardItems[0]);
    }

    // Search form functionality
    const searchForm = document.querySelector('form.form-inline');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input[type="search"]').value.trim().toLowerCase();
            if (!query) {
                alert('Please enter a search term.');
                return;
            }

            // Define sections to search in
            const sectionsToSearch = ['#features', '#tata-cara', '#doa-dzikir', '#waktu-sholat', '#artikel'];
            let found = false;

            // Clear previous highlights
            document.querySelectorAll('.highlight').forEach(el => {
                el.classList.remove('highlight');
            });

            sectionsToSearch.forEach(selector => {
                const section = document.querySelector(selector);
                if (section) {
                    const textContent = section.textContent.toLowerCase();
                    if (textContent.includes(query)) {
                        found = true;
                        // Highlight matching text (simple approach)
                        highlightText(section, query);
                        // Scroll to first matching section
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });

            if (!found) {
                alert('No results found for "' + query + '".');
            }
        });
    }

    // Helper function to highlight text inside an element
    function highlightText(element, query) {
        const innerHTML = element.innerHTML;
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        const newHTML = innerHTML.replace(/<span class="highlight">|<\/span>/g, ''); // Remove existing highlights
        element.innerHTML = newHTML.replace(regex, '<span class="highlight">$1</span>');
    }

    // Escape special characters for regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Niat Sholat 5 Waktu function
    const niatSholat = {
        subuh: "Ushallii fardhash Shubhi rak'ataini mustaqbilal qiblati adaa'an lillaahi ta'aalaa.",
        dzuhur: "Ushallii fardhal dzuhri arba'a rakaatin adaa'an lillaahi ta'aalaa.",
        ashar: "Ushallii fardhal 'ashri arba'a rakaatin adaa'an lillaahi ta'aalaa.",
        maghrib: "Ushallii fardhal maghribi thalaatha rakaatin adaa'an lillaahi ta'aalaa.",
        isya: "Ushallii fardhal 'isya'i arba'a rakaatin adaa'an lillaahi ta'aalaa."
    };

    function showNiatSholat(waktu) {
        if (niatSholat[waktu]) {
            alert("Niat Sholat " + waktu.charAt(0).toUpperCase() + waktu.slice(1) + ":\n" + niatSholat[waktu]);
        } else {
            alert("Niat sholat tidak ditemukan untuk waktu: " + waktu);
        }
    }

    // Expose showNiatSholat to global scope for usage in HTML if needed
    window.showNiatSholat = showNiatSholat;
});

