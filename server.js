const express = require('express');
const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 7860;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint to clone a repository
app.post('/clone', async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({ message: 'Repository URL is required.' });
  }

  const repoName = repoUrl.split('/').pop().replace('.git', '');
  const clonePath = path.join(__dirname, 'cloned-repos', repoName);

  if (fs.existsSync(clonePath)) {
    return res.status(400).json({ message: 'Repository already exists.' });
  }

  try {
    await simpleGit().clone(repoUrl, clonePath);
    res.json({ message: `Repository cloned successfully at ${clonePath}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to clone repository.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});