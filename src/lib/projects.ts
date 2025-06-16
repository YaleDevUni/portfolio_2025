import path from "path";

// Dynamic import for server-side only
const getFileSystem = async () => {
  if (typeof window === "undefined") {
    const fs = await import("fs");
    return fs.default;
  }
  return null;
};

const getMatter = async () => {
  if (typeof window === "undefined") {
    const matter = await import("gray-matter");
    return matter.default;
  }
  return null;
};

export interface Project {
  slug: string;
  title: string;
  dateStart?: string;
  dateEnd?: string;
  image?: string;
  description: string;
  sourceLink?: string;
  demoLink?: string;
  content: string;
  [key: string]: any; // For custom fields like techStack, status, etc.
}

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export async function getAllProjects(): Promise<Project[]> {
  try {
    // Only run on server side
    if (typeof window !== "undefined") {
      return [];
    }

    const fs = await getFileSystem();
    const matter = await getMatter();

    if (!fs || !matter) {
      return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    const projects = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || "",
          dateStart: data.dateStart || undefined,
          dateEnd: data.dateEnd || undefined,
          image: data.image || undefined,
          description: data.description || "",
          sourceLink: data.sourceLink || undefined,
          demoLink: data.demoLink || undefined,
          content,
          ...data, // Include all other custom fields
        } as Project;
      })
      .sort((a, b) => {
        // Sort by start date (newest first)
        if (a.dateStart && b.dateStart) {
          return (
            new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()
          );
        }
        return 0;
      });

    return projects;
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    // Only run on server side
    if (typeof window !== "undefined") {
      return null;
    }

    const fs = await getFileSystem();
    const matter = await getMatter();

    if (!fs || !matter) {
      return null;
    }

    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      dateStart: data.dateStart || undefined,
      dateEnd: data.dateEnd || undefined,
      image: data.image || undefined,
      description: data.description || "",
      sourceLink: data.sourceLink || undefined,
      demoLink: data.demoLink || undefined,
      content,
      ...data,
    } as Project;
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}
