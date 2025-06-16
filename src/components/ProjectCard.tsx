"use client";

import { Project } from "@/lib/projects";
import {
  ExternalLink,
  Github,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getDateRange = () => {
    if (project.dateStart && project.dateEnd) {
      return `${formatDate(project.dateStart)} - ${formatDate(
        project.dateEnd
      )}`;
    } else if (project.dateStart) {
      return `${formatDate(project.dateStart)} - Present`;
    }
    return null;
  };

  const getCustomFields = () => {
    const excludeFields = [
      "slug",
      "title",
      "dateStart",
      "dateEnd",
      "image",
      "description",
      "sourceLink",
      "demoLink",
      "content",
    ];

    return Object.entries(project).filter(
      ([key]) => !excludeFields.includes(key)
    );
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image - Always present with consistent height */}
      <div className="mb-4 aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
            <ImageIcon className="w-12 h-12 mb-2" />
            <span className="text-sm">{project.title}</span>
          </div>
        )}
      </div>

      {/* Content container with flex-grow to push links to bottom */}
      <div className="flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {project.title}
        </h3>

        {/* Date Range */}
        <div className="h-6 mb-3">
          {getDateRange() && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              {getDateRange()}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Custom Fields */}
        <div className="mb-4 min-h-[60px]">
          {getCustomFields().length > 0 && (
            <div className="flex flex-wrap gap-2">
              {getCustomFields().map(([key, value]) => (
                <div
                  key={key}
                  className="text-xs bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded"
                >
                  <span className="font-medium text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </span>
                  <span className="ml-1 text-gray-800 dark:text-gray-200">
                    {Array.isArray(value) ? value.join(", ") : String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Links - Always at bottom */}
        <div className="flex gap-3 mt-auto">
          {project.sourceLink && (
            <a
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
          {!project.sourceLink && !project.demoLink && (
            <span className="text-xs text-gray-400 dark:text-gray-600">
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
