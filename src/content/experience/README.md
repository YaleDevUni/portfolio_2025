# Work Experience

This folder contains markdown files for work experiences. Each experience should be a separate `.md` file.

## Required Fields

- `company`: Company name (required)
- `position`: Job title/position (required)

## Optional Fields

- `location`: Work location (city, state/country)
- `employmentType`: Full-time, Part-time, Contract, Internship, etc.
- `dateStart`: Start date (YYYY-MM-DD format)
- `dateEnd`: End date (YYYY-MM-DD format) - leave empty for current position
- `technologies`: Technologies/tools used
- `teamSize`: Size of the team you worked with
- `department`: Department name
- `salary`: Salary range (optional, for personal tracking)
- `companyWebsite`: Company website URL
- `companyLogo`: Path to company logo image
- `companySize`: Company size range
- `industry`: Industry type
- `mentors`: Names of mentors or managers

## Custom Fields

You can add any custom key-value pairs for additional information:
- `achievements`: Major accomplishments
- `skills`: Skills developed
- `awards`: Awards received
- `certifications`: Certifications earned
- `clients`: Notable clients worked with
- etc.

## Example

```markdown
---
company: Amazing Tech Company
position: Senior Software Engineer
location: San Francisco, CA
employmentType: Full-time
dateStart: 2022-01-15
dateEnd: 2024-06-30
technologies: React, Node.js, Python, AWS
teamSize: 12
department: Engineering
companyWebsite: https://amazingtech.com
industry: SaaS
mentors: John Smith, Jane Doe
achievements: Led team of 5, Increased performance by 40%
---

# Senior Software Engineer at Amazing Tech Company

Brief description of your role and key contributions...

## Key Responsibilities
- List your main responsibilities
- Use bullet points for clarity

## Major Achievements
- **Achievement 1**: Description of what you accomplished
- **Achievement 2**: Another major accomplishment

## Skills Developed
- Technical skills gained
- Soft skills improved
```

## File Naming

Use kebab-case for file names with the format: `position-company.md` 
(e.g., `senior-developer-techcorp.md`). The filename becomes the experience's slug.

## Timeline Display

Experiences are automatically sorted by start date (newest first) and duration is calculated automatically. 