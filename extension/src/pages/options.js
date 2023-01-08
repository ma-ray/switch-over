const signinbtn = document.getElementById('signin-btn');
const signoutbtn = document.getElementById('signout-btn');
const signinSection = document.getElementById('signed-in');
const signoutSection = document.getElementById('signed-out');
const signinId = document.getElementById('signin-id');

// init
chrome.runtime.sendMessage({ command: 'check-signin' }, (res) => {
  if (res) {
    signinSection.style.display = 'block';
    signoutSection.style.display = 'none';
    signinId.innerHTML = `You are signed in as ${res.email}`;
  } else {
    signinSection.style.display = 'none';
    signoutSection.style.display = 'block';
  }
});

signinbtn.onclick = (e) => {
  e.preventDefault();
  chrome.identity.getAuthToken({ interactive: true }, token => {
    if (!token) throw Error('Unable to get token');
    chrome.runtime.sendMessage({ command: 'sign-in', token }, (res) => {
      if (res) {
        signinSection.style.display = 'block';
        signoutSection.style.display = 'none';
        signinId.innerHTML = `You are signed in as ${res.user.email}`;
      }
    });
  });
};

signoutbtn.onclick = (e) => {
  e.preventDefault();
  chrome.runtime.sendMessage({ command: 'sign-out' }, (res) => {
    if (res) {
      signinSection.style.display = 'none';
      signoutSection.style.display = 'block';
    }
  });
};
