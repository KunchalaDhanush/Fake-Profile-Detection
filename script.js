// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Example: Function to update the profile preview dynamically
function updatePreview() {
    const dp = document.getElementById("dp").value;
    const username = document.getElementById("username-input").value || "user_name";
    const posts = document.getElementById("posts").value || "0";
    const followers = document.getElementById("followers").value || "0";
    const following = document.getElementById("following").value || "0";

    document.getElementById("profile-image").src = dp === "yes" ? "/api/placeholder/150/150" : "/api/placeholder/150/150?noimage";
    document.getElementById("username").textContent = username;
    document.getElementById("posts-count").textContent = posts;
    document.getElementById("followers-count").textContent = followers;
    document.getElementById("following-count").textContent = following;
}

// Profile calculation function
function calculateProfile() {
    console.log("calculateProfile invoked"); // Debugging log

    const dp = document.getElementById("dp").value;
    const username = document.getElementById("username-input").value;
    const posts = parseInt(document.getElementById("posts").value);
    const followers = parseInt(document.getElementById("followers").value);
    const following = parseInt(document.getElementById("following").value);
    const lastLogin = parseInt(document.getElementById("last-login").value);

    let score = 0;

    // Checking DP
    if (dp === "yes") score += 10;

    // Checking Posts
    if (posts >= 1) score += 10;
    if (posts >= 5) score += 15;
    if (posts >= 10) score += 20;

    // Checking Followers and Following
    if (followers > 100) score += 20;
    if (following > 100) score += 20;
    if (followers > 50) score += 15;
    if (following > 50) score += 15;
    if (followers < 10) score -= 10;
    if (following < 10) score -= 10;

    // Checking Last Login
    if (lastLogin <= 1) {
        score += 30;
    } else if (lastLogin <= 9) {
        score += 20;
    } else {
        score -= 10;
    }

    // Cap the score at 100
    if (score > 100) {
        score = 100;
    }

    // Determine high risk profile
    let highRisk = dp === "no" && posts === 0 && followers === 0 && following === 0 && lastLogin > 6;

    // Debugging log for score and highRisk
    console.log("Score:", score, "High Risk:", highRisk);

    // Return authenticity result
    if (highRisk) {
        return "fake";
    } else if (score >= 70) {
        return "real";
    } else {
        return "moderate";
    }
}

// Initialize preview on page load
window.onload = function() {
    if (document.getElementById('profile-image')) {
        updatePreview();
    }
};