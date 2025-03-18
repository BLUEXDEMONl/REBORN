document.getElementById('clone-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const repoUrl = document.getElementById('repo-url').value;

  try {
    const response = await fetch('/clone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoUrl }),
    });

    const data = await response.json();
    document.getElementById('output').innerText = data.message || 'Repository cloned successfully!';
  } catch (error) {
    document.getElementById('output').innerText = 'Error cloning repository.';
    console.error(error);
  }
});