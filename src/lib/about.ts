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

export interface AboutData {
  name: string;
  title: string;
  location?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  profileImage?: string;
  skills?: string[];
  languages?: string[];
  interests?: string[];
  content: string;
  [key: string]: any; // For any additional custom fields
}

const aboutFilePath = path.join(process.cwd(), "src/content/about.md");

export async function getAboutData(): Promise<AboutData | null> {
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

    const fileContents = fs.readFileSync(aboutFilePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      name: data.name || "",
      title: data.title || "",
      location: data.location || undefined,
      email: data.email || undefined,
      linkedin: data.linkedin || undefined,
      github: data.github || undefined,
      website: data.website || undefined,
      profileImage: data.profileImage || undefined,
      skills: data.skills || [],
      languages: data.languages || [],
      interests: data.interests || [],
      content,
      ...data, // Include any other custom fields
    } as AboutData;
  } catch (error) {
    console.error("Error reading about data:", error);
    return null;
  }
}
