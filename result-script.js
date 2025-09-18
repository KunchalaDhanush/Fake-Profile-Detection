function navigateTo(page) {
    if (page) {
        window.location.href = page;
    } else {
        console.error("Invalid page URL.");
    }
}

// Load and display profile analysis
function displayProfileAnalysis() {
    try {
        // Retrieve the latest profile from localStorage
        const latestProfile = JSON.parse(localStorage.getItem('latestProfile')) || {};
        if (!Object.keys(latestProfile).length) {
            console.warn("No profile data found in localStorage.");
            return;
        }

        // Update username
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.textContent = latestProfile.username || 'username_example';
        } else {
            console.error("Element with ID 'username' not found.");
        }

        // Update profile image
        const profileImage = document.getElementById('profile-image');
        if (profileImage) {
            profileImage.src = latestProfile.dp === 'yes'
                ? '/api/placeholder/200/200'
                : '/api/placeholder/200/200?grayscale';
        } else {
            console.error("Element with ID 'profile-image' not found.");
        }

        // Update authenticity gauge
        const authenticityIndicator = document.getElementById('authenticity-indicator');
        const authenticityPercentage = document.getElementById('authenticity-percentage');
        if (authenticityIndicator && authenticityPercentage) {
            const realChance = latestProfile.realChance || 0;
            authenticityIndicator.style.width = `${realChance}%`;
            authenticityPercentage.textContent = `${realChance}%`;

            // Adjust gauge color based on authenticity
            if (realChance < 30) {
                authenticityIndicator.style.backgroundColor = 'red';
            } else if (realChance < 60) {
                authenticityIndicator.style.backgroundColor = 'orange';
            } else {
                authenticityIndicator.style.backgroundColor = 'green';
            }
        } else {
            console.error("Authenticity gauge elements not found.");
        }

        // Update detailed factors
        const updateFactor = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            } else {
                console.error(`Element with ID '${id}' not found.`);
            }
        };

        updateFactor('dp-status', latestProfile.dp === 'yes' ? 'Profile Picture Verified' : 'No Profile Picture');
        updateFactor('posts-status', `${latestProfile.posts || 0} Posts`);
        updateFactor('followers-status', `${latestProfile.followers || 0} Followers`);
        updateFactor('following-status', `${latestProfile.following || 0} Following`);
        updateFactor('login-status', `${latestProfile.lastLogin || 'Not Analyzed'} Days Ago`);

        // Risk assessment description
        const riskDescription = document.getElementById('risk-description');
        if (riskDescription) {
            if (latestProfile.realChance === 0) {
                riskDescription.textContent = 'High risk of being a fake profile';
                riskDescription.style.color = 'red';
            } else if (latestProfile.realChance <= 30) {
                riskDescription.textContent = 'High risk of being a fake profile';
                riskDescription.style.color = 'red';
            } else if (latestProfile.realChance <= 60) {
                riskDescription.textContent = 'Moderate risk of being a fake profile';
                riskDescription.style.color = 'orange';
            } else {
                riskDescription.textContent = 'Low risk of being a fake profile';
                riskDescription.style.color = 'green';
            }
        } else {
            console.error("Element with ID 'risk-description' not found.");
        }
    } catch (error) {
        console.error("Error displaying profile analysis:", error.message);
    }
}

// Prevent duplicate data on load
let loadCount = 0;

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    const load = parseInt(localStorage.getItem("load") || "0");

    if (load === 0) {
        displayProfileAnalysis();

        // Append values to user-data's list
        const userDataList = document.getElementById('user-data');
        if (userDataList) {
            const latestProfile = JSON.parse(localStorage.getItem('latestProfile')) || {};
            const listItem = document.createElement('li');
            listItem.textContent = `Username: ${latestProfile.username || 'username_example'}`;
            userDataList.appendChild(listItem);

            // Set load to 1 to prevent duplicate entries
            localStorage.setItem("load", "1");
        } else {
            console.error("Element with ID 'user-data' not found.");
        }
    } else {
        console.warn("Data already loaded. Skipping duplicate addition.");
    }
});