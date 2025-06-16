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

export interface Experience {
  slug: string;
  company: string;
  position: string;
  location?: string;
  employmentType?: string;
  dateStart?: string;
  dateEnd?: string;
  technologies?: string;
  teamSize?: number;
  department?: string;
  salary?: string;
  companyWebsite?: string;
  companyLogo?: string;
  companySize?: string;
  industry?: string;
  mentors?: string;
  content: string;
  [key: string]: any; // For custom fields
}

const experienceDirectory = path.join(process.cwd(), "src/content/experience");

export async function getAllExperiences(): Promise<Experience[]> {
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

    const fileNames = fs.readdirSync(experienceDirectory);
    const experiences = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(experienceDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          company: data.company || "",
          position: data.position || "",
          location: data.location || undefined,
          employmentType: data.employmentType || undefined,
          dateStart: data.dateStart || undefined,
          dateEnd: data.dateEnd || undefined,
          technologies: data.technologies || undefined,
          teamSize: data.teamSize || undefined,
          department: data.department || undefined,
          salary: data.salary || undefined,
          companyWebsite: data.companyWebsite || undefined,
          companyLogo: data.companyLogo || undefined,
          companySize: data.companySize || undefined,
          industry: data.industry || undefined,
          mentors: data.mentors || undefined,
          content,
          ...data, // Include all other custom fields
        } as Experience;
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

    return experiences;
  } catch (error) {
    console.error("Error reading experiences:", error);
    return [];
  }
}

export async function getExperienceBySlug(
  slug: string
): Promise<Experience | null> {
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

    const fullPath = path.join(experienceDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      company: data.company || "",
      position: data.position || "",
      location: data.location || undefined,
      employmentType: data.employmentType || undefined,
      dateStart: data.dateStart || undefined,
      dateEnd: data.dateEnd || undefined,
      technologies: data.technologies || undefined,
      teamSize: data.teamSize || undefined,
      department: data.department || undefined,
      salary: data.salary || undefined,
      companyWebsite: data.companyWebsite || undefined,
      companyLogo: data.companyLogo || undefined,
      companySize: data.companySize || undefined,
      industry: data.industry || undefined,
      mentors: data.mentors || undefined,
      content,
      ...data,
    } as Experience;
  } catch (error) {
    console.error(`Error reading experience ${slug}:`, error);
    return null;
  }
}

export function calculateWorkDuration(
  dateStart?: string,
  dateEnd?: string
): string {
  if (!dateStart) return "";

  const startDate = new Date(dateStart);
  const endDate = dateEnd ? new Date(dateEnd) : new Date();

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${
    remainingMonths !== 1 ? "s" : ""
  }`;
}
