# Portfolio Projects

This folder contains markdown files for portfolio projects. Each project should be a separate `.md` file.

## Required Fields

- `title`: Project title (required)
- `description`: Project description (required)

## Optional Fields

- `dateStart`: Project start date (YYYY-MM-DD format)
- `dateEnd`: Project end date (YYYY-MM-DD format)
- `image`: Path to project image (relative to public folder)
- `sourceLink`: Link to source code repository
- `demoLink`: Link to live demo

## Custom Fields

You can add any custom key-value pairs to showcase additional information:

- `techStack`: Technologies used
- `status`: Project status (completed, in progress, etc.)
- `category`: Project category
- `platform`: Target platform
- `teamSize`: Number of team members
- `framework`: Framework used
- `database`: Database technology
- etc.

## Example

```markdown
---
title: My Awesome Project
dateStart: 2024-01-01
dateEnd: 2024-03-01
image: /images/my-project.png
description: A comprehensive description of what this project does and why it's awesome.
sourceLink: https://github.com/username/project
demoLink: https://project-demo.com
techStack: React, Node.js, MongoDB
status: completed
category: web development
---

# Project Content

You can add additional markdown content here that will be available through the project's content field.
```

## File Naming

Use kebab-case for file names (e.g., `my-awesome-project.md`). The filename becomes the project's slug. 